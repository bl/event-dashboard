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
          {...this.props}
        />
      </div>
    );
  }
}

export default App;
