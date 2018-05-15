// @flow

import { combineReducers } from 'redux';
import * as types from '../actions/action-types';
import authReducer from './auth-reducer';

export default combineReducers({
  auth: authReducer,
});
