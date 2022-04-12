const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const redis = require('redis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { schema } = require('../stashQL-demo/server/schema');
const stashql = require('../src/index.js');

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
const query1 = `query {
  authors {
    id
    name
  }
}`;
const expectedResult1 = '{"authors": [{"id": 1, "name": "J. K. Rowling"}, {"id": 2, "name": "J. R. R. Tolkien"}, {"id": 3, "name": "Brent Weeks"}]}';

//-------------------------------------------------------------------------------------
const graphTest = async () => {
  let dataReceived = '';
  const method = 'POST';
  await fetch('http://localhost:3000/graphql', {
    method,
    body: JSON.stringify({ query: query1 }),
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
    await graphTest().then((data) => {
      firstResult.runTime = data.runTime;
      firstResult.data = data.data;
    });
    expect(firstResult.data.data).toEqual(JSON.parse(expectedResult1));
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
    const redisExistResult = await redisCache.exists(query1);
    expect(redisExistResult).toEqual(1);
  });
  // Check to see if the query key within Redis is the same as the expected result.
  test('The Redis query key\'s value is the same as the expected result.', async () => {
    const redisQueryResult = await redisCache.get(query1);
    expect(JSON.parse(redisQueryResult).data).toEqual(JSON.parse(expectedResult1));
  });
  // Send test query again and check if cached data is the same as when querying the database. Save second runtime for future test.
  test('The data within the Redis cache is the same as data in database.', async () => {
    const secondResult = await graphTest().then((data) => data.data);
    expect(secondResult.data).toEqual(firstResult.data.data);
  });

  // 5. Send same query from test 1. and compare run times (CHECK 50% Less)
  test('StashQL retrieves data from the cache, resulting in faster retrieval speeds.', async () => {
    const secondRunTime = await graphTest().then((data) => runTime2 = data.runTime);
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
//
describe('StashQL Mutation Tests', () => {
  // const firstResult = {};
  // // 1. Send test query and check if data received from stashql.queryHandler method is equal. Save first runtime for future test.
  // test('GraphQL query returns appropriate data', async () => {
  //   await graphTest().then(data => {
  //     firstResult.runTime= data.runTime;
  //     firstResult.data = data.data;
  //   });
  //   expect(firstResult.data.data).toEqual(JSON.parse(expectedResult1));
  // })
});
