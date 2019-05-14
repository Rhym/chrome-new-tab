import React, { Component } from 'react';
import { connect } from 'react-redux';

import { imageCategory, imageSearch } from '../../actions/image';
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
    imageSearch: state.imageSearch,
    user: state.greeting,
    quoteSource: state.quoteSource,
    weatherCity: state.weatherCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActive: (bool) => dispatch(settingsIsActive(bool)),
    setImageCategory: (string) => dispatch(imageCategory(string)),
    setImageSearch: (string) => dispatch(imageSearch(string)),
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
      imageSearch: this.props.imageSearch,
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
    this.props.setImageSearch(this.state.imageSearch);

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
              <h2 className="settings__heading">Settings</h2>
              <p className="settings__description">Leave an input blank to disable it.</p>
              <div className="form__group">
                <h4>Details</h4>
                <p>Enter your name to be greeted based on the time of day.</p>
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
                <h4>Background</h4>
                <p>Select from one of our preset items, or enter your own search parameters for your background image.</p>
                <div className="input__group">
                  <label>Category</label>
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
                <div className="input__group">
                  <label>Search</label>
                  <input
                    type="text"
                    name="imageSearch"
                    placeholder="Enter your search term..."
                    value={this.state.imageSearch || ''}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form__group">
                <h4>Subreddit</h4>
                <p>enter the name of your favorite subreddit to display the hottest post of the last hour in the bottom of the screen.</p>
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
                <h4>Weather</h4>
                <p>Enter your city to display today's and tomorrow's weather in the top right-hand of the screen.</p>
                <label>City</label>
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
