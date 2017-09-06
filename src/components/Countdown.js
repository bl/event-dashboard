import React, { Component } from 'react';
import './countdown.css';

import moment from 'moment';

const COUNTDOWN_FORMAT = 'YYYY MM DD hh:mm:ss A';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.updateTimer = this.updateTimer.bind(this);
    this.formattedTime = this.formattedTime.bind(this);

    //moment.updateLocale('en', {
      //relativeTime: {
        //future: "In %s seconds",
      //}
    //});

    this.state = {
      countdown: moment.duration(moment(),moment(this.props.time)).asSeconds(),
    }
    setInterval(this.updateTimer, 1000);
  }

  updateTimer() {
    this.setState({
      countdown: this.state.countdown - 1,
      //countdown: moment.duration(this.state.countdown - 1000).milliseconds(),
    });
  }

  formattedTime(countdown) {
    return countdown;
    //return moment(countdown).format(COUNTDOWN_FORMAT);
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
