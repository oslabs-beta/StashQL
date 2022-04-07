const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://ieywzzsr:ZmQLNaO6jeKwON_LhS0sfl649xLDKzkP@ruby.db.elephantsql.com/ieywzzsr';

const pool = new Pool({
  connectionString: myURI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
