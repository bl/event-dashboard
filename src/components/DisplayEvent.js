import React, { Component } from 'react';
import './displayevent.css'

import moment from 'moment';

import Countdown from './Countdown';

const DATE_FORMAT = 'MMM Do YY';
const TIME_FORMAT = 'hh:mm A';

class DisplayEvent extends Component {
  constructor(props) {
    super(props);
    // TODO: consolidate/perform in parent component if transformation is often performed
    this.state = {
      date: moment(this.props.event.start.dateTime).format(DATE_FORMAT),
      startTime: moment(this.props.event.start.dateTime).format(TIME_FORMAT),
      endTime: moment(this.props.event.end.dateTime).format(TIME_FORMAT),
    };
  }

  render() {
    return(
      <div className="DisplayEvent">
        <h1 className="title">{this.props.event.summary}</h1>
        <p className="date">{this.state.date}</p>
        <p className="time">{this.state.startTime} - {this.state.endTime}</p>
        <Countdown
          time = {this.props.event.start.dateTime}
        />
      </div>
    );
  }
}

export default DisplayEvent;
