<p align="center">
	<img src='../stashQL-demo/client/images/logo1.jpg/' alt="logo" width="300">
	<br>
  	<a href="https://github.com/oslabs-beta/StashQL"><img src="https://img.shields.io/badge/license-MIT-blue"/></a>
	<br>
</p>

---
## Table of Contents
- [What is StashQL?](#what)
- [Install](#implementation)
- [Getting Started](#implementation)
	- [Queries](#queries)
	- [Mutations](#mutations)
		- [refillCache](#refillCache)
		- [clearRelatedFields](#clearRelatedFields)
- [Logging](#logging)
- [The Team ](#team )
---


## <a name="what"/> What is StashQL?

StashQL provides GraphQL users with an easy way to cache their data and customize how they want to update the cache when a mutation occurs in the database. StashQL will also log the queries and mutations sent, the data received back from the database (or errors), and the run time of each query/mutation. The logged information can be accessed directly from the logs folder created by StashQL or through StashQL’s CLI.


## <a name="install"/> Install StashQL
```
npm install stashql
```
 
 ## <a name="implementation"/> Implementation

Create a StashQL class using the stashql() method that will require the user to pass in their GraphQL schema and Redis Cache, and an optional third integer parameter to set the Time to Live of the cached data.

```
const StashQL = new stashql(schema, redisCache, 1000);
```

With the StashQL class, you can use its methods like any other middleware functions

```
app.use('/graphql', StashQL.queryHandler, (req, res) => {
	return res.status(200).json(res.locals.data);
});
```

### <a name="queries"/> Queries
When sending any GraphQL queries or mutations, you can use StashQL’s queryHandler() method. Upon running a query for the first time, the queryHandler() method will run the query as normal and then cache the query along with the returned data into your Redis cache. If the query is already stored in your cache, the queryHandler() will simply retrieve the data from the cache, avoiding any unnecessary trips to the database. If you ever need to clear your cache, StashQL also offers the clearCache() method, which will go into your cache and flush out all cached data.

### <a name="mutations"/> Mutations
StashQL provides two methods to update your cache so that you never have to worry about stale data being returned from your queries: the refillCache() method and the clearRelatedFields() method. Both of these methods can be passed in as optional arguments for your mutation types.

#### <a name="refillCache"/> refillCache
The refillCache argument will take in a string value, which will be any field you want to update after running a mutation. The queryHandler() method will see this argument, take its string value, and update any cached data relevant to the passed-in string value by re-running their corresponding queries to get the most up-to-date information from the database.
```
mutation{ 
	addAuthor ( name:"John Smith", refillCache:"authors"){
		name 
	}
}
```
You will want to use refillCache if you are running a mutation and you only have a few queries in your cache that deal with the field passed in, then you can run this refillCacheHandler function. Since this refillCacheHandler function will re-run all queries in your cache that deal with the field passed in, it will make multiple network requests at once (in order to re-run your queries and get the most up-to-date data). It is important to note that using this function could result in database failure if your cache has too many matches to the passed-in field, as the system will be overloaded with network requests

#### <a name="clearRelatedFields"/> clearRelatedFields
Similar to the refillCache argument, the clearRelatedFields argument will also take in a string value which will be any field you want to update after a mutation. Upon seeing this argument, instead of updating the cached data relevant to the passed-in string value by re-running their corresponding queries, the queryHandler() method will clear the relevant data from the cache. Now the next time the inputted query is run it will go to the database, send back the updated data, and then cache it.
```
exampleQuery = 
`
query{
	author{
		name
	}
}
`
```
```
mutation{ 
	addAuthor ( name:"John Smith", refillCache:exampleQuery){
		name 
	}
}
```
A good example of when you would want to utilize clearRelatedFields is if you know that your cache will have a ton of queries that matches the field. It will clear your cache so that the next time you run a query, it will simply re-run ONLY that query, NOT ALL queries that match the field.


## <a name="logging"/> Logging
When a query or mutation is send using StashQL it will save the query, its data(or error), and runtime in a logs file.  This file can be accessed by naviagting to the logs folder that StashQL creats for you.  You can also access the information in the logs folder using StashQL's CLI.

- View all logged data:
```
stashql all logs
```
- Clear logs
```
stashql clear logs
```


## <a name="team "/> The Team
Simon Chen    | [GitHub](https://github.com/simonchn160) | [LinkedIn](https://www.linkedin.com/in/simonchen7/)
<br>
Hakudo Ueno   | [GitHub](https://github.com/HakudoUeno) | [LinkedIn](https://www.linkedin.com/in/hakudo-ueno/)
<br>
Ian Madden    | [GitHub](https://github.com/ifmadden) | [LinkedIn](https://www.linkedin.com/in/ian-madden/)
<br>
Louie Mendez  | [GitHub](https://github.com/LouieMjr) | [LinkedIn](https://www.linkedin.com/in/louie-mendez/)
