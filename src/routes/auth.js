const express = require('express');
const router = express.Router();
const db = require('../../db/db');

var oauth = require('../oauthService');

router.get('/callback',(req, res, next) => {
  // add credentials to DB
  storeAccessCredentials(req.query.code, req.session.id)
    .catch((err) => {
      return next(err);
    })
    .then((tokens) => {
      // attribute set to save session on client-side
      req.session.tokenSaved = true;
      //  set tokens for current session
      oauth.setCredentialsGlobally(tokens);
    })
  // return to root page on successful auth
    .then(() => res.redirect('/'));
});

// TODO: test extensively
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
    .then((tokenObject) => {
      // store access token in db
      let {expiry_date, token_type, ...tokens} = tokenObject;
      let params = {
        id: sessionId,
        expiry_date: new Date(expiry_date),
        token_type: token_type,
        tokens: tokens,
      };
      db.setOauthCredentials(params);
      return tokens;
    });
}

module.exports = router;
