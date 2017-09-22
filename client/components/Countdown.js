import React, { Component } from 'react';
import './countdown.css';

import moment from 'moment';

const COUNTDOWN_FORMAT = 'YYYY MM DD hh:mm:ss A';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.updateTimer = this.updateTimer.bind(this);
    this.formattedTime = this.formattedTime.bind(this);
    this.secondsUntilTime = this.secondsUntilTime.bind(this);

    this.state = {
      countdown: this.secondsUntilTime(this.props.time),
    }
  }

  componentDidMount() {
    setInterval(this.updateTimer, 1000);
  }

  updateTimer() {
    this.setState({
      countdown: this.secondsUntilTime(this.props.time),
    });
  }

  secondsUntilTime(endTime) {
    return moment(endTime).unix() - moment().unix();
  }

  formattedTime(countdown) {
    var duration = moment.duration(countdown, 'seconds');
    return `${duration.days()} Days, ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
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
