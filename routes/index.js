const express = require('express');
const usersRouter = require('./users.router');
const associationsRouter = require('./associations.router');
const registerRouter = require('./register.router');
const eventsRouter = require('./events.router');
const communicationsRouter = require('./communications.router');
const uploadsRouter = require('./uploads.router');
const lettersRouter = require('./letters.router')
const streamingRouter = require('./streaming.router')
const managmentRouter = require('./managment.router')
const authRouter = require('./auth.router')
const galleryRouter = require('./gallery.router')
const examsRouter = require('./exams.router')
const configurationsRouter = require('./configurations.router')

function routerApi(app,io){
  const router = express.Router();
  app.use('/api/v1',router);
  // router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/associations',associationsRouter);
  router.use('/register',registerRouter);
  router.use('/events',eventsRouter);
  router.use('/communications',communicationsRouter);
  router.use('/upload',uploadsRouter);
  router.use('/letters',lettersRouter);
  router.use('/streaming',streamingRouter);
  router.use('/managment',managmentRouter);//TERMINADO
  router.use('/auth',authRouter);
  router.use('/gallery',galleryRouter);
  router.use('/exams',examsRouter(io));
  router.use('/configurations',configurationsRouter);

}

module.exports=routerApi;
