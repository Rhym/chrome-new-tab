import React, {Component} from 'react';
import moment from 'moment';

import './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.internval = null;
    this.state = {
      time: null,
      greeting: null,
    }
  }

  /**
   * Init the time, and set an interval to check
   * for a new time every second.
   */
  componentDidMount() {
    this.setTime();

    this.internval = setInterval(() => {
      this.setTime();
    }, 1000);
  }

  /**
   * Clear the interval if the component is unmounted.
   */
  componentWillUnmount() {
    clearInterval(this.internval);
  }

  /**
   * Get the current time, if different from the component time
   * update the current state.
   */
  setTime() {
    const time = moment().format('H:mm');
    if (time !== this.state.time) {
      this.setState({
        time,
      });
    }
  }

  renderGreeting() {
    if (this.state.time !== null) {
      const hour = parseInt(this.state.time.substring(0, 2), 10);

      if (hour > 0 && hour < 12) {
        return 'Good Morning';
      }
    }
    return null;
  }

  render() {
    return (
      <div className="clock">
        {this.state.time}
        {this.renderGreeting()}
      </div>
    );
  }
}

export default Clock;