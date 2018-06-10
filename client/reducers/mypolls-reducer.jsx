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
    case types.DELETE_SINGLE:
      let { [action.id]: varval, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

export default mypollsReducer;
