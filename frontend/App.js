import React, { Component } from 'react';
import './App.css';

import {Helmet} from 'react-helmet';

import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />
        </Helmet>
        <Dashboard />
      </div>
    );
  }
}

export default App;
