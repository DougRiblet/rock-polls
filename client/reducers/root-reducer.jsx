// @flow

import { combineReducers } from 'redux';
import * as types from '../actions/action-types';
import authReducer from './auth-reducer';
import mypollsReducer from './mypolls-reducer';
import allpollsReducer from './allpolls-reducer';
import answersReducer from './answers-reducer';

export default combineReducers({
  auth: authReducer,
  mypolls: mypollsReducer,
  allpolls: allpollsReducer,
  answers: answersReducer,
});
