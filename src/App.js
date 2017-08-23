import React, {Component} from 'react';

import Clock from './components/Clock/Clock';
import Greeting from './components/Greeting/Greeting';
import Image from './components/Image/Image';
import Quote from './components/Quote/Quote';
import Weather from './components/Weather/Weather';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Image/>
        <Weather/>
        <Clock/>
        <Greeting/>
        <Quote/>
      </div>
    );
  }
}

export default App;
