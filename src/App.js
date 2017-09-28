var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var ReactApp = React.createFactory(require('../client/App.js').default);

// db based modules
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);
//var db = require('../db/db');

// routes
var auth = require('./routes/auth');

// services
var oauth = require('./oauthService');
var calendar = require('./calendarService');

// configure view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

var pgPool = pg.Pool({
  database: 'eventdb'
});

// configure sessions
var sess = {
  store: new pgSession({
    pool: pgPool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days 
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

// use public as static assets directory
app.use(express.static('public'));

// auth API endpoint
app.use('/auth', auth);

app.get('/', (req, res) => {
  //var args = {};

  // retrieve calendar list
  calendar.calendarList()
    .then((res) => {
      return { calendarList: res.items };
    })
  // initialize app with oauth when no calendar provided
    .catch((err) => {
      return {
        oauth: {
          authUrl: oauth.getAuthUrl()
        }
      };
    })
  // render
    .then((args) => {
      let markup = ReactDOMServer.renderToString(ReactApp(args));

      res.render('index', {
        initParams: JSON.stringify(args),
        markup: markup,
      });
    });
});

// error handler
//app.use(function(err, req, res, next) {
  //console.log('error hit');
  //// set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  //// render the error page
  //res.status(err.status || 500);

  //let args = {
    //error: err
  //};
  //var markup = ReactDOMServer.renderToString(ReactApp(args));

  //// TODO: remove duplicate render somehow
  //res.render('index', {
    //initParams: JSON.stringify(args),
    //markup: markup,
  //});
//});


app.listen(3000, () => {
  console.log('App is running on 3000');
});
