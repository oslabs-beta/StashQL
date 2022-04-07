# StashQL


How to Use:

The stashql() method is used to create a StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.

Syntax:

const StashQL = new stashql(schema, redisCache, 1000);
Parameters:
schema: your GraphQL schema

cache: your Redis cache

ttl: an integer value that specifies the number of seconds until the key expires in the Redis cache

Example:
const StashQL = new stashql(schema, redisCache, 1000);

When sending any query to ‘/graphql’ use queryHander method is used to create a StashQL class that will require the user to pass their GraphQL schema and Redis Cache, and an optional third parameter for cache time to live.

app.use ( '/graphql', StashQL.queryHandler, ( req, res ) => {
        return res.status(200).json( res.locals.data );
    });

When using StashQL, you must also add additional argumnet to your GraphQL mutations with either refillCache or clearRelatedFields

When to use refillCache and clearRelatedFields
refillCache:if you are running a mutation and you only have a few queries in your cache that deal with the field passed in, then you can run this refillCacheHandler function. Since this refillCacheHandler function will re-run all queries in your cache that deals with the field passed in, it will make multiple network requests at once (in order to re-run your queries and get the most up-to-date data) so, you want to avoid using this function if you know you are going to have a ton of stuff in your cache that matches the passed-in field in order to avoid making a ton of network requests and possibly causing your database to fail

clearRelatedFields:if you know that your cache will have a ton of queries that matches the field, you can run this function. It will clear your cache so that the next time you run a query, it will simply re-run ONLY that query, NOT ALL queries that matches the field.