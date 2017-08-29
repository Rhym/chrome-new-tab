import React, {Component} from 'react';
import {connect} from 'react-redux';

import {greeting} from '../../actions/greeting';
import {quoteCache, quoteSource} from '../../actions/quote';
import {settingsIsActive} from '../../actions/settings';
import {weatherCache, weatherCity} from '../../actions/weather';
import './Settings.css';
import settingsIcon from './icons/settings.svg';

const mapStateToProps = (state) => {
  return {
    isActive: state.settingsIsActive,
    user: state.greeting,
    quoteSource: state.quoteSource,
    weatherCity: state.weatherCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActive: (bool) => dispatch(settingsIsActive(bool)),
    setGreeting: (string) => dispatch(greeting(string)),
    clearQuoteCache: () => dispatch(quoteCache(null)),
    setQuoteSource: (string) => dispatch(quoteSource(string)),
    clearWeatherCache: () => dispatch(weatherCache(null)),
    setWeatherCity: (string) => dispatch(weatherCity(string)),
  };
};

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleToggleState = this.handleToggleState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: this.props.user,
      quoteSource: this.props.quoteSource,
      weatherCity: this.props.weatherCity,
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.clearQuoteCache();
    this.props.clearWeatherCache();

    this.props.setGreeting(this.state.user);
    this.props.setQuoteSource(this.state.quoteSource);
    this.props.setWeatherCity(this.state.weatherCity);

    event.preventDefault();
  }

  handleToggleState() {
    this.props.toggleActive(!this.props.isActive);
  }

  render() {
    return (
      <div className="settings">
        <img
          src={settingsIcon}
          alt="Settings"
          className="settings__icon"
          onClick={this.handleToggleState}
        />
        {this.renderPopup()}
      </div>
    );
  }

  renderPopup() {
    if (this.props.isActive) {
      return (
        <div className="settings__popup">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="user"
                value={this.state.user}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="quoteSource"
                value={this.state.quoteSource}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="weatherCity"
                value={this.state.weatherCity}
                onChange={this.handleInputChange}
              />
            </label>
            <input type="submit" value="Save"/>
          </form>
        </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);