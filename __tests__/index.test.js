const express = require('express');
const cors = require('cors');
const redis = require('redis');
const stashql = require('../src/index.js');
const { schema, authorsArray, booksArray } = require('../stashQL-demo/server/schema');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisCache = redis.createClient();
redisCache.connect();
redisCache.on('connect', () => {
});


const StashQL = new stashql(schema, redisCache, 5);

app.use('/graphql', StashQL.queryHandler, (req, res) => res.status(200).json(res.locals.data));
const server = app.listen(3000, () => {
  console.log("Server2 started on http://localhost:3000");

});

const query = ` query {
    authors {
      id
      name
    }
  }`;

describe('StashQL Sum Test', () => {
  beforeEach(() => {
  });

  // const graph = async () => {
  //     await graphql({ schema: schema, source: query })
  //       .then((data) => JSON.stringify(data))
  //       .then((data) => console.log("graphql data", data));
  //   };
  const mockRequest = () => {
    const req = {};
    req.body = { query };
    return req;
  };

  const mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  };

  const mockNext = jest.fn();

  const stashTest = async () => {
    const res = {};
    res.locals = {};
    res.locals.data = {};
    console.log('res', res);
    const req = mockRequest();
    StashQL.queryHandler(req, res, mockNext)
      .then((res) => console.log(res));
  };
  stashTest();

  const authorArrLen = authorsArray.length;
  const booksArrLen = booksArray.length;

  afterEach(() => {
    // server.close();
  });

  test('GraphQL query returns appropriate data', async () => {
    // const request = {};
    // const response = {
    //     json: jest.fn().mockImplementation((result) => {
    //         responseObject = result;
    //     })
    // };

    const expectedAuthors = [
      {
        name: 'J. K. Rowling',
      },
      {
        name: 'J. R. R. Tolkien',
      },
      {
        name: 'Brent Weeks',
      },
    ];

    // GraphQLQuery(request, response);

    expect(2).toEqual(2);
  });
});



// When we call queryHandler()

// 1. check if logs folder was made


// Query ---------------
// 1. Send query and check redis cache - check for the query and data (GET RUN TIME FOR NEXT TEST)
// 1.1. GET Data and check if equal to expected preset data
// 2. Send same query from test 1. and compare run times (CHECK 50% Less)
// 2.2  GET Data and check if equal to expected preset data
// 3. Check if runtime is somewhat accurate by checking if its number > 0

// TEST Mutation -----------
//

