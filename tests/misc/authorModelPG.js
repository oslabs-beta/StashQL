const { Pool } = require('pg');
//IF NOT IMPORTING PG_URI FROM A SEPARATE FILE, REMOVE THE BELOW LINE
// const import_PG_URI = require('./pgenv')
require('dotenv').config();

// UPDATE YOUR CREATED 'pgenv.js' FILE WITH YOUR PG_URI FOR TESTING PURPOSES, OR PUT IN YOUR PG_URI STRING
// const PG_URI = import_PG_URI.PG_URI;
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env.TEST_URI
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
