import {
  DEFAULT_SHOW_MICROSCOPIC_VIEW,
  INITIAL_TEMPERATURE,
  SCALE_UNITS,
} from '../config/constants';
import {
  SET_TEMPERATURE,
  SET_IS_PAUSED,
  SET_IS_MICROSCOPIC,
  SET_SHOW_THERMOMETER_LABELS,
  SET_SHOW_EMITTED_LINES,
  SET_SHOW_GRID,
  RESET_SETTINGS,
  TOGGLE_ELECTRONS,
  TOGGLE_WAVELENGTH_DISTRIBUTION,
  SET_SCALE_UNIT,
} from '../types';

const INITIAL_STATE = {
  temperature: INITIAL_TEMPERATURE,
  scales: {
    to: 800,
    from: 200,
  },
  isPaused: true,
  isMicroscopic: DEFAULT_SHOW_MICROSCOPIC_VIEW,
  showThermometerLabels: true,
  showEmittedLines: false,
  showGrid: false,
  electrons: true,
  wavelengthDistribution: false,
  scaleUnit: SCALE_UNITS.CELSIUS,
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
    case SET_SHOW_EMITTED_LINES: {
      return { ...state, showEmittedLines: payload };
    }
    case SET_SHOW_GRID: {
      return { ...state, showGrid: payload };
    }
    case RESET_SETTINGS: {
      return INITIAL_STATE;
    }
    case TOGGLE_ELECTRONS: {
      return { ...state, electrons: payload };
    }
    case TOGGLE_WAVELENGTH_DISTRIBUTION: {
      return { ...state, wavelengthDistribution: payload };
    }
    case SET_SCALE_UNIT: {
      return { ...state, scaleUnit: payload };
    }
    default:
      return state;
  }
};
