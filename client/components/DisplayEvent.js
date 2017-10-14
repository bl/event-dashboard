import React, { Component } from 'react';
import './displayevent.css'

import moment from 'moment';

import Countdown from './Countdown';

const DATE_FORMAT = 'MMM Do YY';
const TIME_FORMAT = 'hh:mm A';

class DisplayEvent extends Component {
  constructor(props) {
    super(props);
    this.state = this.formattedDate(props.event);
  }

  // TODO: consolidate/perform in parent component if transformation is often performed
  formattedDate({start, end}) {
    return {
      date: moment(start.dateTime || start.date).format(DATE_FORMAT),
      startTime: start.dateTime ? moment(start.dateTime).format(TIME_FORMAT) : null,
      endTime: end.dateTime ? moment(end.dateTime).format(TIME_FORMAT) : null,
    };
  }

  render() {
    return(
      <div className="DisplayEvent">
        <h1 className="title">{this.props.event.summary}</h1>
        <p className="date">{this.state.date}</p>
        <p className="time">{this.state.startTime} - {this.state.endTime}</p>
        <Countdown
          time = {this.props.event.start.dateTime || this.props.event.start.date}
        />
      </div>
    );
  }
}

export default DisplayEvent;
