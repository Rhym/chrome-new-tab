import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {loadState} from '../localStorage';

const persistedState = loadState();

export default function configureStore() {
  return createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
  );
}