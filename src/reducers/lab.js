import { SET_TEMPERATURE, SET_IS_PAUSED, SET_IS_MICROSCOPIC } from '../types';

const INITIAL_STATE = {
  temperature: 300,
  scales: {
    to: 800,
    from: 200,
  },
  isPaused: true,
  isMicroscopic: false,
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
    case SET_IS_MICROSCOPIC:
      return { ...state, isMicroscopic: payload };
    default:
      return state;
  }
};
