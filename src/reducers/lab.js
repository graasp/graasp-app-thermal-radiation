import { SET_TEMPERATURE, SET_IS_PAUSED } from '../types';

const INITIAL_STATE = {
  temperature: 300,
  scales: {
    to: 800,
    from: 200,
  },
  isPaused: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_TEMPERATURE:
      return {
        ...state,
        temperature: payload,
      };
    case SET_IS_PAUSED:
      return { ...state, isPaused: payload };
    default:
      return state;
  }
};
