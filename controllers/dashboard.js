import React from 'react';
import ReactDOM from 'react-dom';
import App from './frontend/App';
// TODO: uncomment once certain what this does
//import registerServiceWorker from './frontend/registerServiceWorker';

//registerServiceWorker();
module.exports = {
  get: (ctx) => {
    ctx.body = "This is a test";
  }
};
