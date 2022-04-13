const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const redis = require('redis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {schema, allAuthorsQuery} = require('../misc/schema');
const stashql = require('../src/index.js');
const db = require('../misc/authorModelPG');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const redisCache = redis.createClient();
redisCache.connect();
redisCache.on('connect', () => {
  console.log('The Redis cache is connected');
});

const StashQL = new stashql(schema, redisCache, 5);

app.use('/graphql', StashQL.queryHandler, (req, res) => res.status(200).json(res.locals));

const server = app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

//-------------------------------------------------------------------------------------

const authorNameIDQuery = `query {
  authors {
    id
    name
  }
}`;

const authorNameQuery = `query {
  authors {
    name
  }
}`;

const authorIDQuery = `query {
  authors {
    id
  }
}`;

const authorIDQuery5 = `query {
  authors {
    id
  }
}`;

const bookNameQuery = `query {
  book {
    name
  }
}`;

const addAuthorMutation = 
`mutation {
  addAuthor(name: "Cal Ripken"){
    name
    id
  }
}`;

const addAuthorMutationRefill = 
`mutation {
  addAuthor( name: "Wayne Brady",  refillCache: "authors" ){
    id
  }
}`;

const addAuthorMutationClearRelated = `mutation {
  addAuthor(
    (
     name: "Mike", 
     clearRelatedFields: "authors"
     )
    {
      id
      }
}`;

const clearCacheQuery = `query {
  clearRealtedFields: "authors"
}`;

//-------------------------------------------------------------------------------------
const graphTest = async (queryInput) => {
  let dataReceived = '';
  const method = 'POST';
  await fetch('http://localhost:3000/graphql', {
    method,
    body: JSON.stringify({ query: queryInput }),
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    mode: 'no-cors',
  })
    .then((res) => res.json())
    .then((data) => {
      dataReceived = data;
    })
    .catch((err) => console.log('Error: ', err));
  return dataReceived;
};
//-------------------------------------------------------------------------------------

// When we call queryHandler()

// Query ---------------
describe('StashQL Query Tests', () => {
  const firstResult = {};

  if (fs.existsSync(path.join(process.cwd(), 'logs'))) {
    fs.rmSync(path.join(process.cwd(), 'logs'), { recursive: true, force: true });
  }
  // Send test query and check if data received from stashql.queryHandler method is equal. Save first runtime for future test.
  test('StashQL\'s query handler returns appropriate data', async () => {
    const expectedAuthorList = await db.query(allAuthorsQuery).then((results) => results.rows);
    await graphTest(authorNameIDQuery).then((data) => {
      firstResult.runTime = data.runTime;
      firstResult.data = data.data;
    });
    expect(firstResult.data.data.authors).toEqual(expectedAuthorList);
  });
  // check if logs folder was made
  test('StashQL creates a logs folder if it doesn\'t currently exist', async () => {
    expect(fs.existsSync(path.join(process.cwd(), 'logs'))).toEqual(true);
  });
  // check if logs file in logs folder was made
  test('StashQL creates a logs.txt file within the logs folder', async () => {
    expect(fs.existsSync(path.resolve(__dirname, '../logs/logs.txt'))).toEqual(true);
  });

  // check if logs file has new line
  test('Check if after first query that the logs.txt file contains one line', async () => {
    const logPath = path.resolve(__dirname, '../logs/logs.txt');
    const rl = readline.createInterface({
      input: fs.createReadStream(logPath),
      output: process.stdout,
      terminal: false,
    });
    const lineCountFunc = async () => {
      let lineCount = 0;
      for await (const line of rl) {
        lineCount += 1;
      }
      return lineCount;
    };
    const lineCount = await lineCountFunc();
    expect(lineCount).toBe(1);
  });
  // Check to see if the previous query is a key within the Redis cache.
  test('Check the Redis cache to confirm a key with the value of the submitted query exists', async () => {
    const redisExistResult = await redisCache.exists(authorNameIDQuery);
    expect(redisExistResult).toEqual(1);
  });
  // Check to see if the query key within Redis is the same as the expected result.
  test('The Redis query key\'s value is the same as the expected result.', async () => {
    const expectedAuthorList = await db.query(allAuthorsQuery).then((results) => results.rows);
    const redisQueryResult = await redisCache.get(authorNameIDQuery);
    expect(JSON.parse(redisQueryResult).data.authors).toEqual(expectedAuthorList);
  });
  // Send test query again and check if cached data is the same as when querying the database. Save second runtime for future test.
  test('The data within the Redis cache is the same as data in database.', async () => {
    const secondResult = await graphTest(authorNameIDQuery).then((data) => data.data);
    expect(secondResult.data).toEqual(firstResult.data.data);
  });

  // 5. Send same query from test 1. and compare run times (CHECK 50% Less)
  test('StashQL retrieves data from the cache, resulting in faster retrieval speeds.', async () => {
    const secondRunTime = await graphTest(authorNameIDQuery).then((data) => runTime2 = data.runTime);
    // console.log("TIME 1: ", firstResult.runTime)
    // console.log("TIME 2: ", secondRunTime)
    // console.log("TIME 1 * .5: ", firstResult.runTime * .5)
    expect(secondRunTime).toBeLessThanOrEqual((firstResult.runTime * 0.5));
  });

  test('StashQL accurately updates the existing logs.txt file with new data on subsequent invocations.', async () => {
    const logPath = path.resolve(__dirname, '../logs/logs.txt');
    const rl = readline.createInterface({
      input: fs.createReadStream(logPath),
      output: process.stdout,
      terminal: false,
    });
    const lineCountFunc = async () => {
      let lineCount = 0;
      for await (const line of rl) {
        lineCount += 1;
      }
      return lineCount;
    };
    const lineCount = await lineCountFunc();
    if (fs.existsSync(path.join(process.cwd(), 'logs'))) {
      fs.rmSync(path.join(process.cwd(), 'logs'), { recursive: true, force: true });
    }
    expect(lineCount).toBe(3);
  });
});

// TEST Mutation -----------


/// queryHandler
// ---------------------------
describe('StashQL Mutation Tests', () => {
  // const startingCache = await redisCache.get();
  const initialObj = {};
  let beforeCacheRefill;

  afterAll(async () => {
    await redisCache.quit();
    server.close();
  });

  beforeAll(async () => {
    try {
      // CLEAR CACHE
      await redisCache.flushAll();
      // send query for author name - will be cached
      await graphTest(authorNameQuery)
      // send query for author id - will be cached
      await graphTest(authorIDQuery)
      // send query for book name - will be cached
      await graphTest(bookNameQuery)

      const queryKeys = await redisCache.keys("*");
      for (let queryKey of queryKeys) {
        initialObj[queryKey] = redisCache.get(queryKey)
      }
    }catch (error) {
      console.log('error in clearCacheHandler: ', error);
    }
  });

  // Testing mutation queries without 'refillCache' method 
  test('StashQL successfully adds an author to the database from a mutation query (without refillCache method).', async () => {
    const authorLength = await db.query(allAuthorsQuery).then((results) => {
      return results.rows.length
    });
    const newAuthorID = await graphTest(addAuthorMutation).then(data => {
      return data.data.data.addAuthor.id
    });
    expect(newAuthorID).toEqual(authorLength + 1);
  });
  

  test(`StashQL does not update the Redis cache if user doesn't specify the 'refillCache/clearRelatedFields' method.`, async () => {
    const currentObj = {};
    const queryKeys = await redisCache.keys("*");
    for (let queryKey of queryKeys) {
      currentObj[queryKey] = redisCache.get(queryKey)
    }
    expect(initialObj).toEqual(currentObj);
  });
  
  // We ran four previous loggable queries/mutations. Checking the log length to confirm that it has four lines for each query/mutation
  test('StashQL updates the logs based on the previous mutation query sent (without refillCache method).', async () => {
    const logPath = path.resolve(__dirname, '../logs/logs.txt');
    const rl = readline.createInterface({
      input: fs.createReadStream(logPath),
      output: process.stdout,
      terminal: false,
    });
    const lineCountFunc = async () => {
      let lineCount = 0;
      for await (const line of rl) {
        lineCount += 1;
      }
      return lineCount;
    };
    const lineCount = await lineCountFunc();

    expect(lineCount).toBe(4);
  });
  
  // Testing mutation queries with 'refillCache' method 
  test('StashQL successfully adds an author to the database from a mutation query (with refillCache method).', async () => {
    const authorLength = await db.query(allAuthorsQuery).then((results) => {
      return results.rows.length
    });
    beforeCacheRefill = await redisCache.get(authorNameQuery);
    console.log("BEFORE", beforeCacheRefill, "BEFORE")
    beforeCacheRefill = JSON.parse(beforeCacheRefill).data.authors.length;

    const newAuthorID = await graphTest(addAuthorMutationRefill).then(data => data.data.data.addAuthor.id);

    expect(newAuthorID).toEqual(authorLength + 1);
  });
  
  test(`StashQL successfully updates the key/value pairs in the Redis cache based on the string passed into 'refillCache'`, async () => {
    let afterCacheRefill = await redisCache.get(authorNameQuery);
    console.log("AFTERCACHEREFILL", afterCacheRefill, "AFTERCACHEREFILL")
    console.log(await redisCache.keys("*"))
    afterCacheRefill = JSON.parse(afterCacheRefill).data.authors.length;
    expect(afterCacheRefill).toEqual(beforeCacheRefill + 1);
  });

  xtest(`StashQL updates the logs based on the previous mutation query sent (with refillCache method).`, async () => {
    expect(3).toBe(3);
  });

  // Testing mutation queries with 'clearRelatedFields' method 
  xtest('StashQL successfully adds an author to the database from a mutation query (with clearRelatedFields method).', async () => {
    expect(3).toBe(3);
  });

  // Initial test included one books query. Refilling cache based on queries that contain author should leave the redis cache with only one query
  xtest(`The Redis cache does not include queries with the passed in argument to the clearRelatedFields method`, async () => {
    expect(lineCount).toBe(3);
  });

  xtest(`StashQL updates the logs based on the previous mutation query sent (with clearRelatedFields method).`, async () => {
    expect(lineCount).toBe(3);
  });
  
  // Testing mutation queries with 'clearCacheHandler' method
  xtest(`The 'clearCacheHandler' method deletes all key/value pairs in the Redis cache.`, async () => {
    expect(lineCount).toBe(3);
  });


  
});
// queryHandler
// ---------------------------
// CLEAR CACHE
// send query for author name - will be cached
// send query for author id - will be cached
// send query for book name - will be cached
// ---------------------------
// 1. Send Mutation: Add author and confirm that DB has been updated with new author
// 2. Check that the cache was not updated
// 3. Check that the mutation has been logged

// refillCache
// 1. Send Mutation w/ refillCache: Add author and confirm that DB has been updated with new author
// 2. Check cache to see if specific key value pairs have been changed
// 3. Check that the mutation has been logged

// clearRelatedFields
// 1. Send Mutation w/ clearRelatedFields: Add author and confirm that DB has been updated with new author
// 2. Check cache to see if specific key value pair have been changed
// 3. Check that the mutation has been logged


//clearCacheHandler
// ---------------------------
// call clearCacheHandler function and check if cache has been flushed