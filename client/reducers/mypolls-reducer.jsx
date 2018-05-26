// @flow

import * as types from '../actions/action-types';

const mypollsReducer = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.CREATE_QUESTION:
      return Object.assign({}, state, {
        [action.id]: {
          question: action.question,
          date: action.date,
          answers: action.answers,
        },
      });
    case types.GRAB_MY_POLL:
      return Object.assign({}, state, {
        [action.id]: {
          question: action.question,
          answers: action.answers,
          date: action.date,
        },
      });
    default:
      return state;
  }
};

export default mypollsReducer;
