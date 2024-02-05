const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const associationsRouter = require('./associations.router');
const registerRouter = require('./register.router');
const eventsRouter = require('./events.router');
const communicationsRouter = require('./communications.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/associations',associationsRouter);
  router.use('/register',registerRouter);
  router.use('/events',eventsRouter);
  router.use('/communications',communicationsRouter);


}

module.exports=routerApi;
