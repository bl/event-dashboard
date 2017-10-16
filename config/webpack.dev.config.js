var Dotenv = require('dotenv-webpack');
let [client, server] = require('./webpack.common.config.js');

server.plugins = server.plugins.concat([
  new Dotenv(),
]);

module.exports = [client, server];
