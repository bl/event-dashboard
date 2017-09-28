var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauthClient = new OAuth2(
  process.env.GAPI_CLIENT_ID,
  process.env.GAPI_CLIENT_SECRET,
  process.env.GAPI_REDIRECT_URIS,
);

function getAuthUrl() {
  const scopes = process.env.GAPI_SCOPES.split(',');

  return oauthClient.generateAuthUrl({
    scope: scopes
    // optional
    // state: { foo: 'bar' } params to be passed back on callback
  });
}

module.exports = {
  google: google,
  client: oauthClient,
  getAuthUrl: getAuthUrl,
};
