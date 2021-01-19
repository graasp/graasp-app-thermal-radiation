import { SET_TEMPERATURE } from '../types';

const INITIAL_STATE = {
  temperature: 400,
  thermometer: {
    to: 800,
    from: 200,
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_TEMPERATURE:
      return {
        ...state,
        temperature: payload,
      };
    default:
      return state;
  }
};
