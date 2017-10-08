var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var ReactApp = React.createFactory(require('../client/App.js').default);

// db based modules
const db = require('../db/db');
const pgSession = require('connect-pg-simple')(session);

// routes
var auth = require('./routes/auth');

// services
var oauth = require('./oauthService');
var calendar = require('./calendarService');

// configure view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// configure sessions
var sess = {
  store: new pgSession({
    pool: db.pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  // don't save session & sessionId until changes have been applied
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days 
  }
}

if (app.get('env') === 'production') {
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

// use public as static assets directory
app.use(express.static('public'));

// set gapi access tokens from DB (if present)
app.use(function(req, res, next) {
  console.log(req.session.id);
  if (!req.session.tokenSaved) {
    return next();
  }
  db.getOauthCredentials({id: req.session.id})
    .then((accessTokens) => {
      oauth.setCredentialsGlobally(accessTokens);
      next();
    });
});

// auth API endpoint
app.use('/auth', auth);

app.get('/', (req, res) => {
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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  let args = {
    error: err
  };
  var markup = ReactDOMServer.renderToString(ReactApp(args));

  // TODO: remove duplicate render somehow
  res.render('index', {
    initParams: JSON.stringify(args),
    markup: markup,
  });
});


app.listen(3000, () => {
  console.log('App is running on 3000');
});
