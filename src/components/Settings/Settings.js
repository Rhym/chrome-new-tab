import React, { Component } from 'react';
import { connect } from 'react-redux';

import { imageCategory } from '../../actions/image';
import { greeting } from '../../actions/greeting';
import { quoteCache, quoteSource } from '../../actions/quote';
import { settingsIsActive } from '../../actions/settings';
import { weatherCache, weatherCity } from '../../actions/weather';
import './Settings.css';
import settingsIcon from './icons/settings.svg';

const imageCategories = [
  {
    title: 'categories',
    items: [
      'adventure',
      'animals',
      'art',
      'beach',
      'building',
      'city',
      'cloud',
      'coast',
      'desktop-background',
      'flowers',
      'fog',
      'food',
      'galaxy',
      'hiking',
      'landscape',
      'mountain',
      'nature',
      'night',
      'rain',
      'shore',
      'sky',
      'space',
      'sunset',
      'stars',
      'storm',
      'texture',
      'thunderstorm',
      'travel',
      'tree',
      'wallpaper',
    ],
  },
  {
    title: 'palettes',
    items: [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'indigo',
      'violet',
      'white',
      'black',
    ],
  },
  {
    title: 'misc',
    items: [
      'random',
    ],
  },
];

const mapStateToProps = (state) => {
  return {
    isActive: state.settingsIsActive,
    imageCategory: state.imageCategory,
    user: state.greeting,
    quoteSource: state.quoteSource,
    weatherCity: state.weatherCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActive: (bool) => dispatch(settingsIsActive(bool)),
    setImageCategory: (string) => dispatch(imageCategory(string)),
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
      changed: false,
      user: this.props.user,
      quoteSource: this.props.quoteSource,
      weatherCity: this.props.weatherCity,
      imageCategory: this.props.imageCategory,
    };
  }

  /**
   * @desc Update the state to match the form values
   * @param event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      changed: true,
    });
  }

  /**
   * @desc Submit the form
   * @param event
   */
  handleSubmit(event) {
    this.props.clearQuoteCache();
    this.props.clearWeatherCache();

    this.props.setGreeting(this.state.user);
    this.props.setQuoteSource(this.state.quoteSource);
    this.props.setWeatherCity(this.state.weatherCity);
    this.props.setImageCategory(this.state.imageCategory);

    // Close the settings form
    this.handleToggleState();

    event.preventDefault(!this.props.isActive);

    // Reset the form state to default.
    this.setState({
      changed: false,
    })
  }

  /**
   * @desc Open and close the settings popup
   */
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
        <div>
          <div
            className="settings__overlay"
            onClick={() => {
              this.handleToggleState(false);
            }}
          />
          <div className="settings__popup">
            <form onSubmit={this.handleSubmit}>
              <h4 className="settings__heading">Settings</h4>
              <p className="settings__description">Leave an input blank to disable it.</p>
              <div className="form__group">
                <label>Name</label>
                <input
                  type="text"
                  name="user"
                  placeholder="Enter your name..."
                  value={this.state.user || ''}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form__group">
                <label>Background Category</label>
                <select
                  name="imageCategory"
                  value={this.state.imageCategory || ''}
                  onChange={this.handleInputChange}
                >
                  <option value="" disabled>-- Select --</option>
                  {
                    imageCategories.map((item, itemIndex) => {
                      return (
                        <optgroup
                          key={itemIndex}
                          label={item.title}
                        >
                          {
                            item.items.map((option, optionIndex) => <option key={optionIndex} value={option}>{option}</option>)
                          }
                        </optgroup>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form__group">
                <label>Subreddit</label>
                <input
                  type="text"
                  name="quoteSource"
                  placeholder="Enter subreddit name..."
                  value={this.state.quoteSource || ''}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form__group">
                <label>City (Weather)</label>
                <input
                  type="text"
                  name="weatherCity"
                  placeholder="Enter your city..."
                  value={this.state.weatherCity || ''}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form__group">
                <input
                  type="submit"
                  value="Save"
                  disabled={!this.state.changed}
                />
              </div>
            </form>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
