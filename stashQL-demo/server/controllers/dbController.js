const db = require('../models/db');

const dbController = {};

dbController.getRows = (req, res, next) => {
  const sqlQuery = 'SELECT * FROM Authors';
  db.query(sqlQuery)
    .then((results) => {
      // const newResults = JSON.parse(results);
      res.locals.authors = results;
      // console.log('in controller', res.locals.authors);
      return next();
    }).catch((e) => console.error(e.stack));
};

module.exports = dbController;
