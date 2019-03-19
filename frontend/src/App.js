import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

import networkChangeListener from './services/networkChangeListener'

import {
  Header,
  Home,
} from './components';

networkChangeListener(store);

export default () => {
  return (
    <Provider store={store}>
      <Header />
      <Home />
    </Provider>
  )
}