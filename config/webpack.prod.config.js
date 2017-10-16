const webpack = require('webpack');
let [client, server] = require('./webpack.common.config.js');

server.plugins = server.plugins.concat([
  // load whitelisted process.env params into prod
  new webpack.DefinePlugin({
    'process.env': {
      PORT: process.env.PORT,
      SESSION_SECRET: JSON.stringify(process.env.SESSION_SECRET),
      GAPI_CLIENT_ID: JSON.stringify(process.env.GAPI_CLIENT_ID),
      GAPI_CLIENT_SECRET: JSON.stringify(process.env.GAPI_CLIENT_SECRET),
      GAPI_REDIRECT_URIS: JSON.stringify(process.env.GAPI_REDIRECT_URIS),
      GAPI_SCOPES: JSON.stringify(process.env.GAPI_SCOPES),
    }
  }),
]);

module.exports = [client, server];
