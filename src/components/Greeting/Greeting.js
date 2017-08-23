import React, {Component} from 'react';
import moment from 'moment';

import './Greeting.css';

class Greeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'Ryan',
    }
  }

  renderTime() {
    const hour = moment().get('hour');

    if (hour < 12) {
      return `Good morning, ${this.state.user}`;
    } else if (hour < 18) {
      return `Good afternoon, ${this.state.user}`;
    } else {
      return `Good evening, ${this.state.user}`;
    }
  }

  render() {
    return (
      <span className="greeting">
        {this.renderTime()}
      </span>
    )
  }
}

export default Greeting;