const { Pool } = require('pg');
// db.js
// import postgres from 'postgres'

const PG_URI = 'postgres://tkqniwuc:k0nfCsvem7yAZYEGREAoHwRUpibxBN9o@ruby.db.elephantsql.com/tkqniwuc';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
