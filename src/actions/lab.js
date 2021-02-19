import {
  SET_TEMPERATURE,
  SET_IS_PAUSED,
  SET_IS_MICROSCOPIC,
  SET_SHOW_THERMOMETER_LABELS,
  SET_SHOW_EMITTED_LINES,
  SET_SHOW_GRID,
  RESET_SETTINGS,
  TOGGLE_ELECTRONS,
  TOGGLE_SPECTRUM_BAR,
} from '../types';

const setTemperature = (temperature) => (dispatch) =>
  dispatch({
    type: SET_TEMPERATURE,
    payload: temperature,
  });

const setIsPaused = (isPaused) => (dispatch) =>
  dispatch({
    type: SET_IS_PAUSED,
    payload: isPaused,
  });

const setIsMicroscopic = (isMicroscopic) => (dispatch) =>
  dispatch({
    type: SET_IS_MICROSCOPIC,
    payload: isMicroscopic,
  });

const setShowThermometerLabels = (showThermometerLabels) => (dispatch) =>
  dispatch({
    type: SET_SHOW_THERMOMETER_LABELS,
    payload: showThermometerLabels,
  });

const setShowGrid = (showGrid) => (dispatch) =>
  dispatch({
    type: SET_SHOW_GRID,
    payload: showGrid,
  });

const setShowEmittedLines = (showThermometerLabels) => (dispatch) =>
  dispatch({
    type: SET_SHOW_EMITTED_LINES,
    payload: showThermometerLabels,
  });

const toggleElectrons = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_ELECTRONS,
    payload,
  });
};

const toggleWavelengthDistribution = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_SPECTRUM_BAR,
    payload,
  });
};

const resetSettings = () => (dispatch) =>
  dispatch({
    type: RESET_SETTINGS,
  });

export {
  setTemperature,
  setIsPaused,
  setIsMicroscopic,
  setShowThermometerLabels,
  setShowGrid,
  resetSettings,
  setShowEmittedLines,
  toggleElectrons,
  toggleWavelengthDistribution,
};
