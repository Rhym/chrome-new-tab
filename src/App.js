import React, { Component } from 'react';
import classNames from 'classnames';

import Clock from './components/Clock/Clock';
import Greeting from './components/Greeting/Greeting';
import Image from './components/Image/Image';
import Quote from './components/Quote/Quote';
import Settings from './components/Settings/Settings';
import Weather from './components/Weather/Weather';

import './App.css';

class App extends Component {
  render() {
    const classes = classNames('app', {});

    return (
      <div className={classes}>
        <Image />
        <Weather />
        <Clock />
        <Greeting />
        <Quote />
        <Settings />
      </div>
    );
  }
}

export default App;
