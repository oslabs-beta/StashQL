const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const express = require('express');
const app = express();
const redis = require('redis');
const { RedisSearchLanguages } = require('@node-redis/search/dist/commands');
const fs = require('fs');
const path = require('path');

class stashql {
  constructor(clientSchema, redisCache, life) {
    this.queryHandler = this.queryHandler.bind(this);
    this.refillCacheHandler = this.refillCacheHandler.bind(this);
    this.clearRelatedFieldsHandler = this.clearRelatedFieldsHandler.bind(this);
    this.schema = clientSchema;
    this.query = '';
    this.cache = redisCache;
    this.ttl = life;
    this.startTime = 0;
    this.endTime = 0;
  }


  async queryHandler(req, res, next) {      
    console.log("cwd: ", process.cwd()); // -> "/Users/Simon/dirname-example/StashQL package
    if (!fs.existsSync(path.join(process.cwd(), "logs"))){
      fs.mkdirSync(path.join(process.cwd(), "logs"), (err) => {
        if (err) {
          console.log('could not make directory');
        }
      });
    }
    this.startTime = performance.now();
    console.log('request:');
    console.log(req.body.query);
    this.query = req.body.query;
    const query = req.body.query;
    if (query.slice(0, 8) === 'mutation') console.log('is a mutation');

    //if the client did not submit a mutation (just a normal query)
    if (query.slice(0, 8) !== 'mutation') {
      try {
        //if that query exists in our cache
        if (await this.cache.exists(this.query)) {
          console.log('cache hit!');
          //we get the corresponding data and send it back
          const data = await this.cache.get(this.query);
          res.locals.data = JSON.parse(data);
          this.endTime = performance.now();
          console.log('performance: ', this.endTime - this.startTime);
          fs.appendFileSync(
            path.join(process.cwd(), "/logs/logs.txt"), 
            `${JSON.stringify({type:"cache", query: this.query, data: JSON.parse(data), performance : this.endTime - this.startTime})}}\n`, 
            err => { if (err) {console.error(err)}}
          );
          return next();
        //if the query does not exists in our cache
        } else {
          console.log('database hit!');
          //we run the query
          await graphql({schema: this.schema, source: this.query})
            .then((data) => JSON.stringify(data))
            .then((data) => {
              //then we set the query as a key in our cache and its value as the data we get back from running the query
              this.cache.set(this.query, data);
              //we also have it expire at a certain time
              if (this.ttl !== undefined) {
                this.cache.expire(this.query, this.ttl);
              } 
              //we send back the data
              res.locals.data = JSON.parse(data);
              this.endTime = performance.now();
              console.log('performance: ', this.endTime - this.startTime);
              fs.appendFileSync(
                path.join(process.cwd(), "/logs/logs.txt"), 
                `${JSON.stringify({type:"query", query: this.query, data: JSON.parse(data), performance : this.endTime - this.startTime})}\n`, 
                err => { if (err) {console.error(err)}}
              );
              return next();
            })
            .catch((error) => {
              console.log('error in else block of queryHandler not mutation: ', error);
            });
        }
      } catch (error) {
        return next(error);
      }
    } 

    //if the client submitted a mutation
    else if (query.slice(0, 8) === 'mutation') {
      try {
        //we run the mutation and get the data back
        const data = JSON.stringify(await graphql({schema: this.schema, source: this.query}));
        console.log('the result data: ', data);

        //we then check to see if the client use the refillCache argument - this means that the client wants to re-run all the queries in our cache
        //that matches the field the client passed in and update their corresponding values (data) in the cache
        if (query.includes('refillCache')) {
          //this is to check what the field passed in was
          const startingIdx = query.indexOf('refillCache');
          const parenIdx = query.indexOf(')', startingIdx);
          const therefillCacheArg = query.slice(startingIdx, parenIdx - 1);
          const colonIdx = therefillCacheArg.indexOf(':');
          const theField = therefillCacheArg.slice(colonIdx + 1);
          const quoteIdx = theField.indexOf('"');
          const theRealField = theField.slice(quoteIdx + 1);
          //we then call refillCacheHandler and pass in the field
          await this.refillCacheHandler(theRealField);
        } 
        else if (query.includes('clearRelatedFields')) {

          const startingIdx = query.indexOf('clearRelatedField');
          const parenIdx = query.indexOf(')', startingIdx);
          const theClearRelatedFieldsArg = query.slice(startingIdx, parenIdx - 1);
          const colonIdx = theClearRelatedFieldsArg.indexOf(':');
          const theField = theClearRelatedFieldsArg.slice(colonIdx + 1);
          const quoteIdx = theField.indexOf('"');
          const theRealField = theField.slice(quoteIdx + 1);
          await this.clearRelatedFieldsHandler(theRealField);
        }
        res.locals.data = JSON.parse(data);
        this.endTime = performance.now();
        console.log('performance: ', this.endTime - this.startTime);
        fs.appendFileSync(
          path.join(process.cwd(), "/logs/logs.txt"), 
          `${JSON.stringify({type:"mutation", mutation: this.query, data: JSON.parse(data), performance : this.endTime - this.startTime})}}\n`, 
          err => { if (err) {console.error(err)}});
        return next();
      } catch (error) {
        return next(error);
      }
    } 
  }

  // if you are running a mutation and you only have a few queries in your cache that deal with the field passed in,
  // then you can run this refillCacheHandler function. Since this refillCacheHandler function will re-run all queries in  your
  // cache that deals with the field passed in, it will make multiple network requests at once (in order to re-run your queries and get the most up-to-date data)
  // so, you want to avoid using this function if you know you are going to have a ton of stuff in your cache that matches the passed-in field 
  // in order to avoid making a ton of network requests and possibly causing your database to fail

  //updating/deleting - updates all queries whose fields matches the field passed in
  async refillCacheHandler(field) {
    console.log('refillCacheHandler invoked');
    console.log('the field: ', field);
    //we get all the keys and assign it to queryKeys (it is an array of keys)
    const queryKeys = await this.cache.keys('*');
    //iterate through the array of query keys 
    for (let queryKey of queryKeys) {
      console.log('current queryKey in refillCacheHandler: ', queryKey);
      const secondCurly = queryKey.indexOf('{', 1);
      const currQueryField =  queryKey.slice(1, secondCurly).trim();
      //for each query key, we check to see if the field in that query matches the field passed in
      //if so, that means we want to re-run that query, therefore updating its value in the cache
      if (currQueryField === field) {
        await graphql({schema: this.schema, source: queryKey})
          .then((data) => JSON.stringify(data))
          .then((data) => {
            console.log(data);
            this.cache.set(queryKey, data);
            if (this.ttl !== undefined) {
              this.cache.expire(queryKey, this.ttl);
            }
          })
          .catch((error) => {
            console.log('error in refillCacheHandler: ', error);
          });
      }
    }
  }

  // if you know that your cache will have a ton of queries that matches the field, you can run this function. It will clear your cache so that the next time
  // you run a query, it will simply re-run ONLY that query, NOT ALL queries that matches the field. 
  async clearRelatedFieldsHandler(field) {
    const queryKeys = await this.cache.keys('*');

    for (let queryKey of queryKeys) {
      const secondCurly = queryKey.indexOf('{', 1);
      const currQueryField =  queryKey.slice(1, secondCurly).trim();
      if (currQueryField === field) {
        await this.cache.del(queryKey);
      }
    }
  }

  //creating/adding - only updates 1 query that they specify
  // async updateSingleQuery(query, newData) {
  //   //find the matching key in the cache
  //   //take its value
  //   const oldData = this.cache.get(query).data
  //   const updatedData = [...oldData, newData.name]
  // }
  //add a book called "New Book"
  //query: {
      //     authors {
      //       name
      //       books {
      //         id
      //         name
      //       }
      //     }
      //   }

  // newData: { authorId: 1, name: "New Book" }
  // oldData: {
    // "data": {
    //   "authors": [
    //       {
    //           "name": "J. K. Bowling",
    //           "books": [
    //               {
    //                   "id": 1,
    //                   "name": "Harry Potter and the Chamber of Secrets"
    //               },
    //               {
    //                   "id": 2,
    //                   "name": "Harry Potter and the Prisoner of Azkaban"
    //               },
    //               {
    //                   "id": 3,
    //                   "name": "Harry Potter and the Goblet of Fire"
    //               }
    //           ]
    //       }, {
                
    //}
    //   ]
    // }

}

module.exports = stashql;

  //we get the query
  //first check to see if it is a mutation
    //if so, run the mutation and get the data back
    //then check the arguments passed in the mutation for an updateQueries or updateSingleQuery property - this will be the field whose data you want to update
    //if there is an updateQueries property
      //iterate through each key in the cache and for each key, if it includes the field passed in, re-run that query
    //if there is an updateSingleQuery property:
      //then find that query in the cache, get its corresponding value (old data), and append the new data returned from the mutation to it
      //and set this as the query's new value
  
  //if NOT a mutation:
  //we check if it is in the cache
    //if so, just return the cached data back to client
    //if not, run the query as normal and store the query in cache along with the returned data



              // const startingIdx = query.indexOf('updateSingleQuery');
          // const leftHalf = query.slice(0, startingIdx);
          // const parenIdx = leftHalf.indexOf('(');
          // const properties = leftHalf.slice(parenIdx + 1, startingIdx - 2);
          // console.log('LOOK HERE: ', properties);

          // function looseJsonParse(data) {
          //   return Function('"use strict";return (' + data + ')')();
          // }
          
          // const data = `{${properties}}`;
          // const newData = JSON.stringify(looseJsonParse(data));
          // const json = JSON.parse(newData);
          // console.log("JSON: ", json)
          // console.log('TYPE OF JSON: ', typeof json);


//create function that creates file(maybe folder) to log queries and stuff (user enters file path or we make our own) - DONE



//first create a cli 
//when user types in command "logs *", it would display all logs
//can try to implement some kind of command that would filter out logs by date/time/query
//allow users to enter log db