import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routers'; 
import {Provider} from 'react-redux'; 
import store from './store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);