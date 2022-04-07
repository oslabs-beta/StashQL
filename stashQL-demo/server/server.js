const path = require('path');
const express = require('express');
const cors = require('cors');
const dbController = require('./controllers/dbController');

const app = express();
const PORT = 3000;
app.use(cors());

// app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', dbController.getRows, (req, res) => res.status(200).json(res.locals.authors));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(express.static('client'));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.html'));
// })

app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`);
});

// npm install stashql
// create query/mutation types and define author and book types
// create a schema
// create a redis cache
// create new instance of stashql , takes in schema and redis cache
// set up graphql endpoint
// middleware func = stashql.queryhandler
