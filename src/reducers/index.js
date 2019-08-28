import { combineReducers } from 'redux';
import { greeting } from './greeting';
import {
  image,
  imageAuthor,
  imageAuthorLink,
  imageCache,
  imageCategory,
  imageSearch,
} from './image';
import { quote, quoteCache, quoteSource, quoteUrl } from './quote';
import { settingsIsActive } from './settings';
import { weather, weatherCache, weatherCity } from './weather';

export default combineReducers({
  greeting,
  quote,
  image,
  imageAuthor,
  imageAuthorLink,
  imageCache,
  imageCategory,
  imageSearch,
  quoteCache,
  quoteSource,
  quoteUrl,
  settingsIsActive,
  weather,
  weatherCache,
  weatherCity,
});
