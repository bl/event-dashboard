const Router = require('koa-router');

const dashboard = require('./controllers/dashboard');
const calendar = require('./controllers/callendar');

const api = new Router();
const router = new Router();

module.exports = (app) => {
  router.get('/', dashboard.get);

  api.get('/calendar/:id', calendar);
  router.use('/api', api.routes());

  app.use(router.routes());
};
