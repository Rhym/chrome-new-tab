import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { weather, weatherCache, weatherCity } from '../../actions/weather';
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

const mapStateToProps = state => {
  return {
    weather: state.weather,
    weatherCache: state.weatherCache,
    weatherCity: state.weatherCity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearWeatherCache: () => dispatch(weatherCache(null)),
    setWeather: list => dispatch(weather(list)),
    setWeatherCache: string => dispatch(weatherCache(string)),
    setWeatherCity: string => dispatch(weatherCity(string)),
  };
};

class Weather extends Component {
  /**
   * @desc Return the correct icon based on the code parameter.
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

    return <img className="weather__icon" src={src} alt="Weather Icon" />;
  }

  /**
   * @desc Return the formatted temperature.
   * @param min
   * @param max
   * @returns {XML}
   */
  static formatTemperature(min = 0, max = 0) {
    return (
      <div>
        <span className="weather__temp weather__temp--low">L: {Math.floor(min)}&deg;</span>
        <span className="weather__temp weather__temp--high">H: {Math.floor(max)}&deg;</span>
      </div>
    );
  }

  componentDidMount() {
    if (
      typeof this.props.weatherCity !== 'undefined' &&
      this.props.weatherCity !== null &&
      this.props.weatherCity !== ''
    ) {
      this.fetchWeatherData();
    }
  }

  /**
   * @desc Invalidate the cache if there is a new setting.
   * @param nextProps
   */
  componentWillUpdate(nextProps) {
    if (this.props.weatherCity !== nextProps.weatherCity) {
      console.log('invalidating weather cache');
      this.props.clearWeatherCache();
    }
  }

  /**
   * @desc Retrieve quote if the source has changed.
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.weatherCity !== prevProps.weatherCity) {
      this.fetchWeatherData();
    }
  }

  /**
   * @desc Check if the cache is active (one day).
   * @returns {boolean}
   */
  isCacheActive() {
    const cache = this.props.weatherCache;

    // If there is no cache.
    if (typeof cache === 'undefined' || cache === null) {
      return false;
    }

    const now = moment().format();
    return moment(cache).isSame(now, 'hour');
  }

  /**
   * @desc Retrieve the weather data from the API
   */
  fetchWeatherData() {
    if (
      !this.isCacheActive() &&
      typeof this.props.weatherCity !== 'undefined' &&
      this.props.weatherCity !== null &&
      this.props.weatherCity !== ''
    ) {
      const WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.props.weatherCity}&mode=json&units=metric&cnt=2&appid=a24a174c4ceab5f6c8462cbf4b161d0e`;
      console.log('Retrieving weather from: %s', WEATHER_API);
      axios
        .get(WEATHER_API)
        .then(response => {
          const now = moment().format();
          const city = response.data.city.name;
          const list = response.data.list;

          this.props.setWeatherCache(now);
          this.props.setWeatherCity(city);
          this.props.setWeather(list);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  /**
   * @desc Return the list node
   * @returns {*}
   */
  renderList() {
    if (
      typeof this.props.weather !== 'undefined' &&
      this.props.weather !== null &&
      this.props.weather.length
    ) {
      return (
        <ul className="weather__list">
          {this.props.weather.map((item, key) => {
            return (
              <li key={key}>
                {this.constructor.getIcon(item.weather[0].icon)}
                <p>{key === 0 ? 'Today' : 'Tomorrow'}</p>
                {this.constructor.formatTemperature(item.temp.min, item.temp.max)}
              </li>
            );
          })}
        </ul>
      );
    }

    return null;
  }

  render() {
    if (
      typeof this.props.weatherCity !== 'undefined' &&
      this.props.weatherCity !== null &&
      this.props.weatherCity !== ''
    ) {
      return <div className="weather">{this.renderList()}</div>;
    }

    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);
