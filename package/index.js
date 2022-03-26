const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const express = require('express');
const app = express();
const redis = require('redis');

//a schema is basically a set of instructions that tell you what you need to return to their queries
//client will pass in their schema into our function so we know what to return
// function stashql(clientSchema) {
//   this.schema = clientSchema;
//   this.query = '';
//   // console.log('the clientSchema: ', clientSchema);
//   console.log('this.schema: ', this.schema);
// }

// //creates a function called queryHandler on stashql's prototype chain in order to resolve queries
// stashql.prototype.queryHandler = async function(req, res, next) {
//   console.log('the wonky schema: ', this.schema);

//   this.query = req.body.query;
//   console.log('the query: ', this.query);
//   res.locals.data = await graphql({schema: this.schema, source: this.query});
//   // const result = graphql({
//   //   schema: this.schema
//   // })
//   return next();
// }

class stashql {
  constructor(clientSchema, redisCache, life) {
    this.queryHandler = this.queryHandler.bind(this);
    this.schema = clientSchema;
    this.query = '';
    this.cache = redisCache;
    this.ttl = life;
  }

  async queryHandler(req, res, next) {
    this.query = req.body.query;

    // if (await this.cache.exists(this.query)) {
    //   const data = await this.cache.get(this.query);
    //   console.log('cache hit!');
    //   res.locals.data = JSON.parse(data);
    //   return next();
    // } else {
    //   //const result = await 
    //   console.log('database hit!');
    //   await graphql({schema: this.schema, source: this.query})
    //   .then((data) => JSON.stringify(data))
    //   .then((data) => {
    //     this.cache.set(this.query, data);
    //     res.locals.data = JSON.parse(data);
    //     return next(); 
    //   })
    // }
    if (await this.cache.exists(this.query)) {
      const data = await this.cache.get(this.query);
      console.log('cache hit!');
      res.locals.data = JSON.parse(data);
      return next();
    } else {
      //const result = await 
      console.log('database hit!');
      await graphql({schema: this.schema, source: this.query})
      .then((data) => JSON.stringify(data))
      .then((data) => {
        this.cache.set(this.query, data);
        this.cache.expire(this.query, this.ttl);
        res.locals.data = JSON.parse(data);
        return next();
      })
    }
  }
}


module.exports = stashql;



    // //otherwise:
    // this.query = req.body.query;
    // console.log('line 38 queryHandler being invoked...');
    // console.log('line 39 the schema: ', this.schema);
    // console.log('line 40 the query: ', this.query);
    // res.locals.data = await graphql({schema: this.schema, source: this.query});
    // // console.log(res.locals.data);
    // console.log('line 43 above is done running');
    // return next();