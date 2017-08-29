import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import './Greeting.css';

const mapStateToProps = (state) => {
  return {
    user: state.greeting,
  };
};

class Greeting extends Component {
  renderTime() {
    const hour = moment().get('hour');

    if (hour < 12) {
      return `Good morning, ${this.props.user}`;
    } else if (hour < 18) {
      return `Good afternoon, ${this.props.user}`;
    } else {
      return `Good evening, ${this.props.user}`;
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

export default connect(mapStateToProps, null)(Greeting);