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

  render() {
    return (
      <div className="clock">
        {this.state.time}
      </div>
    );
  }
}

export default Clock;