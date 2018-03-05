import {combineReducers} from 'redux';
import {greeting} from './greeting';
import {image, imageAuthor, imageAuthorLink, imageCache, imageCategory} from './image';
import {quote, quoteCache, quoteSource, quoteUrl} from './quote';
import {settingsIsActive} from './settings';
import {todoIsActive, addTodo, toggleTodo} from './todo';
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
  quoteUrl,
  settingsIsActive,
  todoIsActive,
  addTodo,
  toggleTodo,
  weather,
  weatherCache,
  weatherCity,
});
