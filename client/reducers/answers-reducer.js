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
    case types.ADD_VOTE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          count: state[action.id].count + 1,
        },
      };
    default:
      return state;
  }
};

export default answersReducer;
