import React, { Component } from 'react';
import './Event.css';

import moment from 'moment';

const DATE_FORMAT = 'MMM Do YY';
const TIME_FORMAT = 'hh:mm A';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = this.formattedDate(props.event);
  }

  formattedDate({start, end}) {
    return {
      date: moment(start.dateTime || start.date).format(DATE_FORMAT),
      startTime: start.dateTime ? moment(start.dateTime).format(TIME_FORMAT) : null,
      endTime: end.dateTime ? moment(end.dateTime).format(TIME_FORMAT) : null,
    };
  }

  render() {
    let eventOnClick = () => {
      this.props.onClick(this.props.event.id);
    };

    return(
      <div className="Event" onClick={eventOnClick}>
        <h4 className="title text-white">{this.props.event.summary}</h4>
        <p className="date text-white">{this.state.date}</p>
        { this.state.startTime && this.state.endTime &&
          <p className="time text-white">{this.state.startTime} - {this.state.endTime}</p>
        }
      </div>
    );
  }
}

export default Event;
