// @flow

import * as types from '../actions/action-types';

const initState = {
  authenticated: false,
  user_id: '',
  username: '',
};

const authReducer = (state: Object = initState, action: Object): Object => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        user_id: action.id,
        username: action.username,
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        user_id: action.id,
        username: action.username,
      });
    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        authenticated: false,
        user_id: '',
        username: '',
      });
    default:
      return state;
  }
};

export default authReducer;
