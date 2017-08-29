import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import _throttle from 'lodash/throttle';

import {saveState} from './localStorage';
import configureStore from './store/configureStore';

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.subscribe(_throttle(() => {
  saveState(store.getState());
}), 1000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
