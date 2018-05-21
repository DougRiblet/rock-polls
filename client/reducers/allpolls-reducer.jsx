// @flow

import * as types from '../actions/action-types';

const allpollsReducer = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.GRAB_POLL:
      return Object.assign({}, state, {
        [action.id]: {
          question: action.question,
          date: action.date,
        },
      });
    case types.GRAB_SINGLE:
      return Object.assign({}, state, {
        [action.id]: {
          question: action.question,
          date: action.date,
          answers: action.answers,
        },
      });
    default:
      return state;
  }
};

export default allpollsReducer;
