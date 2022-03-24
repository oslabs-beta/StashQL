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
  constructor(clientSchema) {
    this.queryHandler = this.queryHandler.bind(this);
    this.schema = clientSchema;
    this.query = '';
  }

  async queryHandler(req, res, next) {
    this.query = req.body.query;
    //checks the cache to see if it has a key that matches the query
    redis.get(this.query, async(error, data) => {
      //if there's any errors running this, console log the error
      if (error) console.log(error);
      //if there is no data returned (this means there were no keys that matched the query),
      //then werun the query as usual and then set the query as a key in the cache and its 
      //corresponding value to the data
      if (data === null) {
        const result = await graphql({schema: this.schema, source: this.query});
        redis.set(this.query, result)
        res.locals.data = result;
        return next()
      }
      //if there was data returned (meaning there was a key that matched the query),
      //then we just take that data and assign it to res.locals.data so the client can
      //access it
      res.locals.data = data;
      return next()
    })

    // //otherwise:
    // this.query = req.body.query;
    // console.log('line 38 queryHandler being invoked...');
    // console.log('line 39 the schema: ', this.schema);
    // console.log('line 40 the query: ', this.query);
    // res.locals.data = await graphql({schema: this.schema, source: this.query});
    // // console.log(res.locals.data);
    // console.log('line 43 above is done running');
    // return next();
  }
}


module.exports = stashql;