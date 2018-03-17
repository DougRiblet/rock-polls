// @flow

import type { Dispatch } from 'redux';
import * as types from './action-types';

export const logInUser = () => ({
  type: types.LOGIN_USER,

});

export const logOutUser = () => ({
  type: types.LOGOUT_USER,

});
