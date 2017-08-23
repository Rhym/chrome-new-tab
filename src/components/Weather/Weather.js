import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import './Weather.css';

import clear from './icons/01d.svg';
import fewClouds from './icons/02d.svg';
import scatteredClouds from './icons/03d.svg';
import brokenClouds from './icons/04d.svg';
import showerRain from './icons/09d.svg';
import rain from './icons/10d.svg';
import thunderStorm from './icons/11d.svg';
import snow from './icons/13d.svg';
import mist from './icons/50d.svg';

const WEATHER_API = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Auckland&mode=json&units=metric&cnt=7&appid=a24a174c4ceab5f6c8462cbf4b161d0e';

class Weather extends Component {
  /**
   * Return the correct icon based on the code parameter.
   *
   * @param code
   * @returns {XML}
   */
  static getIcon(code = '01d') {
    let src;
    switch (code) {
      case '02d':
      case '02n':
        src = fewClouds;
        break;
      case '03d':
      case '03n':
        src = scatteredClouds;
        break;
      case '04d':
      case '04n':
        src = brokenClouds;
        break;
      case '09d':
      case '09n':
        src = showerRain;
        break;
      case '10d':
      case '10n':
        src = rain;
        break;
      case '11d':
      case '11n':
        src = thunderStorm;
        break;
      case '13d':
      case '13n':
        src = snow;
        break;
      case '50d':
      case '50n':
        src = mist;
        break;
      default:
        src = clear;
    }

    return <img className="weather__icon" src={src} alt="Weather Icon"/>
  }

  /**
   * Return the formatted temperature.
   *
   * @param min
   * @param max
   * @returns {XML}
   */
  static formatTemperature(min = 0, max = 0) {
    return (
      <div>
        <span className="weather__temp weather__temp--low">
          {Math.floor(min)}&deg;
        </span>
        <span className="weather__temp weather__temp--high">
          {Math.floor(max)}&deg;
        </span>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      cache: localStorage.getItem('WeatherCache'),
      list: JSON.parse(localStorage.getItem('WeatherList')),
      city: localStorage.getItem('WeatherCity'),
    }
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  /**
   * Check if the cache is active (one day).
   *
   * @returns {boolean}
   */
  isCacheActive() {
    const cache = this.state.cache;

    // If there is no cache.
    if (typeof cache === 'undefined' || cache === null) {
      return false;
    }

    const now = moment().format();
    return moment(cache).isSame(now, 'hour');
  }

  fetchWeatherData() {
    if (!this.isCacheActive()) {
      axios.get(WEATHER_API)
        .then(response => {
          const now = moment().format();
          const city = response.data.city.name;
          const list = response.data.list;

          console.log(response);
          localStorage.setItem('WeatherCache', now);
          localStorage.setItem('WeatherCity', city);
          localStorage.setItem('WeatherList', JSON.stringify(list));

          this.setState({
            cache: now,
            city,
            list,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  renderList() {
    if (typeof this.state.list !== 'undefined' && this.state.list !== null && this.state.list.length) {
      return (
        <ul className="weather__list">
          {this.state.list.map((item, key) => {
            return (
              <li key={key}>
                {this.constructor.formatTemperature(item.temp.min, item.temp.max)}
                {this.constructor.getIcon(item.weather[0].icon)}
              </li>
            );
          })}
        </ul>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="weather">
        {this.state.city}
        {this.renderList()}
      </div>
    );
  }
}

export default Weather;