// @flow

import * as types from '../actions/action-types';

// eslint-disable-next-line no-undef
const reducer = (state: Object, action: Object): Object => {
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

export default reducer;
