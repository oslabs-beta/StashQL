import * as express from "express";
import { ExecutionResult, graphql, GraphQLSchema } from "graphql";
import { RedisClientType } from "redis";
import fs from "fs";
import path from "path";

class stashql {
  query: string;
  startTime: number;
  endTime: number;
  schema: GraphQLSchema;
  cache: RedisClientType;
  ttl: number;

  constructor(
    clientSchema: GraphQLSchema,
    redisCache: RedisClientType,
    life: number
  
  ) {
    
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
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    if (!fs.existsSync(path.join(process.cwd(), "logs"))) {
      try {
        fs.mkdirSync(path.join(process.cwd(), "logs"));
      } catch (error: any) {
        console.error("Error in running query: ", error);
        return next(error);
      }
    }
    this.startTime = performance.now();
    this.query = req.body.query;
    const query: string = req.body.query;

    //if the client did not submit a mutation (just a normal query)
    if (query.slice(0, 8) !== "mutation") {
      try {
        //if that query exists in our cache
        if (await this.cache.exists(this.query)) {
          console.log("cache hit!");
          //we get the corresponding data and send it back
          const data: string = await this.cache.get(this.query) || "";
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
            console.error("Error in running query: ", error);
            return next(error);
          }
          return next();
          //if the query does not exists in our cache
        } else {
          console.log("database hit!");
          //we run the query
          await graphql({ schema: this.schema, source: this.query })
            .then((data: ExecutionResult<any>) => JSON.stringify(data))
            .then((data: string) => {
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
          const startingIdx: number = query.indexOf("refillCache");
          const parenIdx: number = query.indexOf(")", startingIdx);
          const therefillCacheArg: string = query.slice(
            startingIdx,
            parenIdx - 1
          );
          const colonIdx: number = therefillCacheArg.indexOf(":");
          const theField: string = therefillCacheArg.slice(colonIdx + 1);
          const quoteIdx: number = theField.indexOf('"');
          const theRealField: string = theField.slice(quoteIdx + 1);
          //we then call refillCacheHandler and pass in the field
          await this.refillCacheHandler(theRealField);
        } else if (query.includes("clearRelatedFields")) {
          const startingIdx: number = query.indexOf("clearRelatedField");
          const parenIdx: number = query.indexOf(")", startingIdx);
          const theClearRelatedFieldsArg: string = query.slice(
            startingIdx,
            parenIdx - 1
          );
          const colonIdx: number = theClearRelatedFieldsArg.indexOf(":");
          const theField: string = theClearRelatedFieldsArg.slice(colonIdx + 1);
          const quoteIdx: number = theField.indexOf('"');
          const theRealField: string = theField.slice(quoteIdx + 1);
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
        } catch (error: any) {
          console.log(error);
          return error;
        }
        return next();
      } catch (error: any) {
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
  async refillCacheHandler(field: string) {
    //we get all the keys and assign it to queryKeys (it is an array of keys)
    const queryKeys: string[] = await this.cache.keys("*");
    //iterate through the array of query keys
    for (let queryKey of queryKeys) {
      const secondCurly: number = queryKey.indexOf("{", 1);
      const currQueryField: string = queryKey.slice(1, secondCurly).trim();
      //for each query key, we check to see if the field in that query matches the field passed in
      //if so, that means we want to re-run that query, therefore updating its value in the cache
      if (currQueryField === field) {
        await graphql({ schema: this.schema, source: queryKey })
          .then((data: ExecutionResult<any>) => JSON.stringify(data))
          .then((data: string) => {
            // console.log(data);
            this.cache.set(queryKey, data);
            if (this.ttl !== undefined) {
              this.cache.expire(queryKey, this.ttl);
            }
          })
          .catch((error: any) => {
            console.error("error in refillCacheHandler: ", error);
          });
      }
    }
  }

  // if you know that your cache will have a ton of queries that matches the field, you can run this function. It will clear your cache so that the next time
  // you run a query, it will simply re-run ONLY that query, NOT ALL queries that matches the field.
  async clearRelatedFieldsHandler(field: string) {
    const queryKeys: string[] = await this.cache.keys("*");

    for (let queryKey of queryKeys) {
      const secondCurly: number = queryKey.indexOf("{", 1);
      const currQueryField: string = queryKey.slice(1, secondCurly).trim();
      if (currQueryField === field) {
        await this.cache.del(queryKey);
      }
    }
  }

  //clears all keys from the cache
  async clearCacheHandler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      await this.cache.flushAll();
      return next();
    } catch (error) {
      console.error("error in clearCacheHandler: ", error);
      return next();
    }
  }

}

module.exports = stashql;
