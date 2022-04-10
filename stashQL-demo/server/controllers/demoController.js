const db = require("../models/DemoModel");

module.exports = {
  removeAuthor: async (req, res, next) => {
    const sqlQuery = "DELETE FROM authors WHERE name = $1;";
    const params = ['John Smith'];

    try {
      const response = await db.query(sqlQuery, params);
      return next();
    } catch (error) {
      console.log('Error in deleting demo author: ', error);
      return next({
        log: "Error in demoController.removeAuthor",
        status: 500,
        message: {
          err: `An error occurred in demoController.removeAuthor: ${error}`,
        },
      });
    }
  }
};
