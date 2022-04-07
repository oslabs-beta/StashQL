const db = require('../models/SubscribeModel');

module.exports = {
  subscribe: async (req, res, next) => {
    const {email} = req.body;
    
    console.log('the email: ', email);

    const sqlQuery = 'INSERT INTO Email (name) VALUES ($1) RETURNING *;'
    const params = [email];

    try {
      const response = await db.query(sqlQuery, params);
      res.locals.data = true;
      return next();
    }
    catch (error) {
      console.log(error);
      res.locals.data = false;
      return next({
        log: 'Error in subscribeController.subscribe',
        status: 500,
        message: { err: `An error occurred in subscribeController.subscribe ${error}`  },
      });
    }
  }    
};
  