import {
  FLAG_GETTING_ACTIONS,
  FLAG_POSTING_ACTION,
  GET_ACTIONS_FAILED,
  GET_ACTIONS_SUCCEEDED,
  POST_ACTION_FAILED,
} from '../types';
import { showErrorToast } from '../utils/toasts';

const INITIAL_STATE = {
  ready: false,
  activity: [],
  content: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FLAG_GETTING_ACTIONS:
    case FLAG_POSTING_ACTION:
      return {
        ...state,
        // when true append to array, when false, pop from it
        activity: payload
          ? [...state.activity, payload]
          : [...state.activity.slice(1)],
      };
    case GET_ACTIONS_SUCCEEDED:
      return {
        ...state,
        content: payload,
        ready: true,
      };
    case GET_ACTIONS_FAILED:
    case POST_ACTION_FAILED:
      showErrorToast(payload);
      return state;
    default:
      return state;
  }
};
