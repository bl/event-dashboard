const Router = require('koa-router');

const DashboardController = require('./controllers/dashboard').default;
const CalendarController = require('./controllers/calendar').default;

const api = new Router();
const router = new Router();

module.exports = (app) => {
  router.get('/', new DashboardController().get);

  //api.get('/calendar/:id', new CalendarController());
  router.use('/api', api.routes());

  app.use(router.routes());
};
