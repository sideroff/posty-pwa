import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

import networkChangeListener from './services/networkChangeListener'

import { Home } from './components';

networkChangeListener(store);

export default () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}