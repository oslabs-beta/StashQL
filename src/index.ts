const {
  Request: New_Request,
  Response: New_Response,
  NextFunction,
} = require("express");
import { WriteFileOptions, MakeDirectoryOptions } from "fs";
import { graphql } from "graphql";
import fs from "fs";
import path from "path";

class stashql {
  query: string;
  startTime: number;
  endTime: number;
  schema: any;
  cache: any;
  ttl: number;

  constructor(clientSchema: any, redisCache: any, life: any) {
    this.queryHandler = this.queryHandler.bind(this);
    this.refillCacheHandler = this.refillCacheHandler.bind(this);
    this.clearRelatedFieldsHandler = this.clearRelatedFieldsHandler.bind(this);
    this.clearCacheHandler = this.clearCacheHandler.bind(this);
    this.schema = clientSchema;
    this.query = "";
    this.cache = redisCache;
    this.ttl = life;
    this.startTime = 0;
    this.endTime = 0;
  }

  async queryHandler(
    req: typeof New_Request,
    res: typeof New_Response,
    next: typeof NextFunction
  ) {
    // console.log("cwd: ", process.cwd()); // -> "/Users/Simon/dirname-example/StashQL package
    if (!fs.existsSync(path.join(process.cwd(), "logs"))) {
      try {
        fs.mkdirSync(path.join(process.cwd(), "logs"));
      } catch (error: any) {
        console.log("Error in running query: ", error);
        return next(error);
      }
    }
    this.startTime = performance.now();
    this.query = req.body.query;
    const query = req.body.query;
    // if (query.slice(0, 8) === 'mutation') console.log('is a mutation');

    //if the client did not submit a mutation (just a normal query)
    if (query.slice(0, 8) !== "mutation") {
      try {
        //if that query exists in our cache
        if (await this.cache.exists(this.query)) {
          console.log("cache hit!");
          //we get the corresponding data and send it back
          const data = await this.cache.get(this.query);
          res.locals.data = JSON.parse(data);
          this.endTime = performance.now();
          res.locals.runTime = this.endTime - this.startTime;
          console.log("performance: ", this.endTime - this.startTime);
          try {
            fs.appendFileSync(
              path.join(process.cwd(), "/logs/logs.txt"),
              `${JSON.stringify({
                type: "cache",
                query: this.query,
                data: JSON.parse(data),
                performance: this.endTime - this.startTime,
              })}}\n`
            );
          } catch (error: any) {
            console.log("Error in running query: ", error);
            return next(error);
          }
          return next();
          //if the query does not exists in our cache
        } else {
          console.log("database hit!");
          //we run the query
          await graphql({ schema: this.schema, source: this.query })
            .then((data: any) => JSON.stringify(data))
            .then((data: any) => {
              //then we set the query as a key in our cache and its value as the data we get back from running the query
              this.cache.set(this.query, data);
              //we also have it expire at a certain time
              if (this.ttl !== undefined) {
                this.cache.expire(this.query, this.ttl);
              }
              //we send back the data
              res.locals.data = JSON.parse(data);
              this.endTime = performance.now();
              res.locals.runTime = this.endTime - this.startTime;
              console.log("performance: ", this.endTime - this.startTime);
              try {
                fs.appendFileSync(
                  path.join(process.cwd(), "/logs/logs.txt"),
                  `${JSON.stringify({
                    type: "query",
                    query: this.query,
                    data: JSON.parse(data),
                    performance: this.endTime - this.startTime,
                  })}\n`
                );
              } catch (error) {
                console.log(error);
                return next(error);
              }
              return next();
            })
            .catch((error: any) => {
              console.log(
                "Error in else block of queryHandler for mutations: ",
                error
              );
            });
        }
      } catch (error: any) {
        console.log("Error in running query: ", error);
        return next(error);
      }
    }

    //if the client submitted a mutation
    else if (query.slice(0, 8) === "mutation") {
      try {
        //we run the mutation and get the data back
        const data = JSON.stringify(
          await graphql({ schema: this.schema, source: this.query })
        );
        // console.log('the result data: ', data);

        //we then check to see if the client use the refillCache argument - this means that the client wants to re-run all the queries in our cache
        //that matches the field the client passed in and update their corresponding values (data) in the cache
        if (query.includes("refillCache")) {
          //this is to check what the field passed in was
          const startingIdx = query.indexOf("refillCache");
          const parenIdx = query.indexOf(")", startingIdx);
          const therefillCacheArg = query.slice(startingIdx, parenIdx - 1);
          const colonIdx = therefillCacheArg.indexOf(":");
          const theField = therefillCacheArg.slice(colonIdx + 1);
          const quoteIdx = theField.indexOf('"');
          const theRealField = theField.slice(quoteIdx + 1);
          //we then call refillCacheHandler and pass in the field
          await this.refillCacheHandler(theRealField);
        } else if (query.includes("clearRelatedFields")) {
          const startingIdx = query.indexOf("clearRelatedField");
          const parenIdx = query.indexOf(")", startingIdx);
          const theClearRelatedFieldsArg = query.slice(
            startingIdx,
            parenIdx - 1
          );
          const colonIdx = theClearRelatedFieldsArg.indexOf(":");
          const theField = theClearRelatedFieldsArg.slice(colonIdx + 1);
          const quoteIdx = theField.indexOf('"');
          const theRealField = theField.slice(quoteIdx + 1);
          await this.clearRelatedFieldsHandler(theRealField);
        }
        res.locals.data = JSON.parse(data);
        this.endTime = performance.now();
        res.locals.runTime = this.endTime - this.startTime;
        console.log("performance: ", this.endTime - this.startTime);
        try {
          fs.appendFileSync(
            path.join(process.cwd(), "/logs/logs.txt"),
            `${JSON.stringify({
              type: "mutation",
              mutation: this.query,
              data: JSON.parse(data),
              performance: this.endTime - this.startTime,
            })}}\n`
          );
        } catch (error) {
          console.log(error);
          return error;
        }
        return next();
      } catch (error: any | undefined) {
        console.log("Error in running mutation: ", error);
        return next();
      }
    }
  }

  // if you are running a mutation and you only have a few queries in your cache that deal with the field passed in,
  // then you can run this refillCacheHandler function. Since this refillCacheHandler function will re-run all queries in  your
  // cache that deals with the field passed in, it will make multiple network requests at once (in order to re-run your queries and get the most up-to-date data)
  // so, you want to avoid using this function if you know you are going to have a ton of stuff in your cache that matches the passed-in field
  // in order to avoid making a ton of network requests and possibly causing your database to fail

  //updating/deleting - updates all queries whose fields matches the field passed in
  async refillCacheHandler(field: any) {
    //we get all the keys and assign it to queryKeys (it is an array of keys)
    const queryKeys = await this.cache.keys("*");
    //iterate through the array of query keys
    for (let queryKey of queryKeys) {
      const secondCurly = queryKey.indexOf("{", 1);
      const currQueryField = queryKey.slice(1, secondCurly).trim();
      //for each query key, we check to see if the field in that query matches the field passed in
      //if so, that means we want to re-run that query, therefore updating its value in the cache
      if (currQueryField === field) {
        await graphql({ schema: this.schema, source: queryKey })
          .then((data: any) => JSON.stringify(data))
          .then((data: any) => {
            // console.log(data);
            this.cache.set(queryKey, data);
            if (this.ttl !== undefined) {
              this.cache.expire(queryKey, this.ttl);
            }
          })
          .catch((error: any) => {
            console.log("error in refillCacheHandler: ", error);
          });
      }
    }
  }

  // if you know that your cache will have a ton of queries that matches the field, you can run this function. It will clear your cache so that the next time
  // you run a query, it will simply re-run ONLY that query, NOT ALL queries that matches the field.
  async clearRelatedFieldsHandler(field: any) {
    const queryKeys = await this.cache.keys("*");

    for (let queryKey of queryKeys) {
      const secondCurly = queryKey.indexOf("{", 1);
      const currQueryField = queryKey.slice(1, secondCurly).trim();
      if (currQueryField === field) {
        await this.cache.del(queryKey);
      }
    }
  }

  //clears all keys from the cache
  async clearCacheHandler(
    req: typeof New_Request,
    res: typeof New_Response,
    next: typeof NextFunction
  ) {
    try {
      await this.cache.flushAll();
      return next();
    } catch (error) {
      console.log("error in clearCacheHandler: ", error);
      return next();
    }
  }
}

module.exports = stashql;
