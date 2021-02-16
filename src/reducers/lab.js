import { INITIAL_TEMPERATURE } from '../config/constants';
import {
  SET_TEMPERATURE,
  SET_IS_PAUSED,
  SET_IS_MICROSCOPIC,
  SET_SHOW_THERMOMETER_LABELS,
} from '../types';

const INITIAL_STATE = {
  temperature: INITIAL_TEMPERATURE,
  scales: {
    to: 800,
    from: 200,
  },
  isPaused: true,
  isMicroscopic: false,
  showThermometerLabels: true,
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
    case SET_SHOW_THERMOMETER_LABELS:
      return { ...state, showThermometerLabels: payload };
    default:
      return state;
  }
};
