import React, { Component } from 'react';
import './displayevent.css'

class DisplayEvent extends Component {
  render() {
    return(
      <div className="DisplayEvent">
        <h1 className="title">{this.props.event.summary}</h1>
      </div>
    );
  }
}

export default DisplayEvent;
