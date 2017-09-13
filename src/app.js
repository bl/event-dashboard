const routes = require('./routes');
const Koa = require('koa');

const app = new Koa();

// load routes
routes(app);

//app.on('error', (err, ctx) => {
  //log.error('server error', err, ctx);
//});

app.listen(3000);
