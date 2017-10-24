import {combineReducers} from 'redux';
import {greeting} from './greeting';
import {image, imageAuthor, imageAuthorLink, imageCache, imageCategory} from './image';
import {quote, quoteCache, quoteSource} from './quote';
import {settingsIsActive} from './settings';
import {weather, weatherCache, weatherCity} from './weather';

export default combineReducers({
  greeting,
  quote,
  image,
  imageAuthor,
  imageAuthorLink,
  imageCache,
  imageCategory,
  quoteCache,
  quoteSource,
  settingsIsActive,
  weather,
  weatherCache,
  weatherCity,
});
