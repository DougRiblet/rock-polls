// @flow

import * as types from '../actions/action-types';

const mypollsReducer = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.CREATE_QUESTION:
      return Object.assign({}, state, {
        [action.id]: {
          question: action.question,
          answers: action.answers,
        },
      });
    default:
      return state;
  }
};

export default mypollsReducer;
