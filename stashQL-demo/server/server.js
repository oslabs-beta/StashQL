const express = require('express');
const path = require('path');
const stashql = require('stashql');
const cors = require('cors');
const redis = require('redis');
const schema = require('./schema');
const subscribeController = require('./controllers/subscribeController');


const app = express();

const redisCache = redis.createClient();
redisCache.connect();
redisCache.on('connect', () => {
  console.log('The Redis cache is connected');
});
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const StashQL = new stashql(schema, redisCache);


if (process.env.NODE_ENV === 'production') {

  app.use('/build', express.static(path.join(__dirname, '../build')));


  app.get('/', (req, res) => {
     return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
  });
}

app.post('/api/subscribe', subscribeController.subscribe, (req, res) => {
  return res.status(200).json(res.locals.data);
});

// app.use("/api/graphql", StashQL.queryHandler, (req, res) => {
//   return res.status(200).json(res.locals.data);
// })

app.use("/api/graphql", StashQL.queryHandler, (req, res) => {
  return res.status(200).json({data: res.locals.data, runTime: res.locals.runTime});
});

app.use("/api/clearCache", StashQL.clearCacheHandler, (req, res) => {
  res.sendStatus(200);
});

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('Server listening on port: 3000');
});

module.exports = app;