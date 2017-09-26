import React, { Component } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Dashboard
          oauth = {this.props.oauth}
        />
      </div>
    );
  }
}

export default App;
