// @flow

import axios from 'axios';
import type { Dispatch } from 'redux';
import * as types from './action-types';

const logInSuccess = (id, username) => ({
  type: types.LOGIN_SUCCESS,
  id,
  username,
});

const signUpSuccess = (id, username) => ({
  type: types.SIGNUP_SUCCESS,
  id,
  username,
});

export const logOutUser = () => {
  sessionStorage.removeItem('token');
  return { type: types.LOGOUT_USER };
};

/* eslint-disable func-names, no-console */

export const signUpUser = (username, password) => {
  return function (dispatch: Dispatch<*>) {
    axios.post('http://localhost:8357/auth/signup', {
        username,
        password,
      })
      .then((response) => {
        dispatch(signUpSuccess(response.data.id, response.data.username));
        sessionStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.log('### ERROR: ', error);
      })
  };
}

export const logInUser = (username, password) => {
  return function (dispatch: Dispatch<*>) {
    axios.post('http://localhost:8357/auth/signin', {
        username,
        password,
      })
      .then((response) => {
        dispatch(logInSuccess(response.data.id, response.data.username));
        sessionStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.log('### ERROR: ', error);
      })
  };
}

/* eslint-enable func-names, no-console */
