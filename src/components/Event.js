import React, { Component } from 'react';
import './Event.css';

import moment from 'moment';

const DATE_FORMAT = 'MMM Do YY';
const TIME_FORMAT = 'hh:mm A';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.event.start.dateTime).format(DATE_FORMAT),
      startTime: moment(this.props.event.start.dateTime).format(TIME_FORMAT),
      endTime: moment(this.props.event.end.dateTime).format(TIME_FORMAT),
    };
  }

  render() {
    return(
      <div className="Event">
        <h4 className="title text-white">{this.props.event.summary}</h4>
        <p className="date text-white">{this.state.date}</p>
        <p className="time text-white">{this.state.startTime} - {this.state.endTime}</p>
      </div>
    );
  }
}

export default Event;
