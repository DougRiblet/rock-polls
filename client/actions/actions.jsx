// @flow

import axios from 'axios';
import type { Dispatch } from 'redux';
import * as types from './action-types';

export const logInUser = () => ({
  type: types.LOGIN_USER,

});

const signUpSuccess = () => ({
  type: types.SIGNUP_USER,

});

export const logOutUser = () => ({
  type: types.LOGOUT_USER,

});


export const signUpUser = (username, password) => {
  axios.post('http://localhost:8357/auth/signup', {
      username,
      password,
    })
    .then((response) => {
      
    })

}
