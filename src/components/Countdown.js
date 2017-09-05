import React, { Component } from 'react';
import './countdown.css';

import moment from 'moment';

const COUNTDOWN_FORMAT = 'hh:mm A';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.updateTimer = this.updateTimer.bind(this);
    this.formattedTime = this.formattedTime.bind(this);

    this.state = {
      countdown: this.props.time,
    }
    setInterval(this.updateTimer, 1000);
  }

  updateTimer() {
    this.setState({
      countdown: this.state.countdown,
    });
  }

  formattedTime(timeString) {
    return moment(timeString).format(COUNTDOWN_FORMAT);
  }

  render() {
    return(
      <div className="Countdown">
        <p>{this.formattedTime(this.state.countdown)}</p>
      </div>
    );
  }
}

export default Countdown;
