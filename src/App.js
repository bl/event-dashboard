var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var ReactApp = React.createFactory(require('../client/App.js').default);

// configure view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// use public as static assets directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  var markup = ReactDOMServer.renderToString(ReactApp());

  res.render('index', {
    markup: markup,
  });
});

app.listen(3000, () => {
  console.log('App is running on 3000');
});
