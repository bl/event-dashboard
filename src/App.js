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
var api = require('./routes/apiRoute');

// services
var oauth = require('./oauthService');
var calendarService = require('./calendarService');

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
// TODO: refresh token when past expiration point
app.use((req, res, next) => {
  if (!req.session.tokenSaved) {
    return next();
  }
  db.getOauthCredentials({id: req.session.id})
    .then((accessTokens) => {
      oauth.setCredentialsGlobally(accessTokens);
      next();
    });
});

// register API endpoints
app.use('/auth', auth);
app.use('/api', api);

app.get('/', (req, res) => {
  // retrieve calendar list
  calendarService.calendarList()
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
  // finally render
    .then((args) => {
      renderIndex(res, args);
    });
});

// error handler
app.use(function(err, req, res, next) {
  // only provide error in development
  let errorParams = {
    error: {
      message: err.message,
      error: app.get('env') === 'development' ? err.stack : null,
    }
  };

  // render the error page
  res.status(err.status || 500);

  // print error locally
  console.log(err);

  if (req.accepts('json')) {
    res.send(errorParams);
  } else {
    renderIndex(res, errorParams);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running on 3000');
});

const renderIndex = (res, params) => {
  var markup = ReactDOMServer.renderToString(ReactApp(params));

  // TODO: remove duplicate render somehow
  res.render('index', {
    initParams: JSON.stringify(params),
    markup: markup,
  });
}
