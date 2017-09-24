import React, { Component } from 'react';
import './App.css';

import {Helmet} from 'react-helmet';

import Dashboard from './components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" />
        </Helmet>
        <Dashboard
          oauth = {this.props.oauth}
        />
      </div>
    );
  }
}

export default App;
