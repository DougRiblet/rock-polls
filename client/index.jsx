import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import App from './components/App';
import reducer from './reducers/root-reducer';
import { LOGIN_SUCCESS } from './actions/action-types';

const store = createStore(reducer, {}, applyMiddleware(logger, thunk));

const token = localStorage.getItem('token');
const userid = localStorage.getItem('userid');
const username = localStorage.getItem('username');
if (token && userid && username) {
  store.dispatch({
    type: LOGIN_SUCCESS,
    id: userid,
    username,
  });
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
