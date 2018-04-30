// @flow

import * as types from '../actions/action-types';

// eslint-disable-next-line no-undef
const reducer = (state: Object, action: Object): Object => {
  switch (action.type) {
    case types.LOGIN_USER:
      return Object.assign({}, state, {
        authenticated: true,
        user: action.user,
      });
    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        authenticated: false,
        user: {},
      });
    default:
      return state;
  }
};

export default reducer;
