var express = require('express');
var router = express.Router();

var oauth = require('../oauthService');

router.get('/callback',(req, res, next) => {
  // add credentials to DB
  storeAccessCredentials(req.query.code, req.session.id)
  // return to root page on successful auth
    .catch((err) => {
      return next(err);
    })
    .then(() => res.redirect('/'));
});

function storeAccessCredentials(code, sessionId) {
  if (!code) {
    // TODO: verify that this gets caught in error handler, and raises 500
    throw 'No code found';
  }

  return new Promise((resolve, reject) => {
    oauth.client.getToken(code, (err, tokens) => {
      if (err != null) {
        return reject(err);
      }

      resolve(tokens);
    });
  })
    .then((tokens) => {
      oauth.client.setCredentials(tokens);

      // set oauthClient above as global auth
      oauth.google.options({
        auth: oauth.client,
      });
    });
}

module.exports = router;
