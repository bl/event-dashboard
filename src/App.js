var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var ReactApp = React.createFactory(require('../client/App.js').default);

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// configure view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// use public as static assets directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  var args = {};

  args.oauth = {};
  // retrieve OAuth creds
  var oauthClient = new OAuth2(
    process.env.GAPI_CLIENT_ID,
    process.env.GAPI_CLIENT_SECRET,
    process.env.GAPI_REDIRECT_URIS,
  );
  const scopes = process.env.GAPI_SCOPES.split(',');

  const oauthUrl = oauthClient.generateAuthUrl({
    scope: scopes
    // optional
    // state: { foo: 'bar' } params to be passed back on callback
  });
  args.oauth.authUrl = oauthUrl;
  // if present, exec CalendarService and send to ReactApp
  // if not present, pass oauth url to ReactApp

  var markup = ReactDOMServer.renderToString(ReactApp(args));

  res.render('index', {
    markup: markup,
  });
});

app.listen(3000, () => {
  console.log('App is running on 3000');
});
