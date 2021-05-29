import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppBasket from './components/AppleBasket';
import store from './store/appleStore';

ReactDOM.render(
  <Provider store={store}>
    <AppBasket />
  </Provider>,
  document.getElementById('root')
);
