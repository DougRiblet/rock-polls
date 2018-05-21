// @flow

import * as types from '../actions/action-types';

const answersReducer = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.CREATE_ANSWER:
      return Object.assign({}, state, {
        [action.id]: {
          answer: action.answer,
          count: action.count,
        },
      });
    default:
      return state;
  }
};

export default answersReducer;
