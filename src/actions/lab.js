import {
  SET_TEMPERATURE,
  SET_IS_PAUSED,
  SET_IS_MICROSCOPIC,
  SET_SHOW_THERMOMETER_LABELS,
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

export {
  setTemperature,
  setIsPaused,
  setIsMicroscopic,
  setShowThermometerLabels,
};
