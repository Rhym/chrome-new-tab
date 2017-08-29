import {combineReducers} from 'redux';
import {greeting} from './greeting';
import {quote, quoteCache, quoteSource} from './quote';
import {settingsIsActive} from './settings';
import {weather, weatherCache, weatherCity} from './weather';

export default combineReducers({
  greeting,
  quote,
  quoteCache,
  quoteSource,
  settingsIsActive,
  weather,
  weatherCache,
  weatherCity,
});