import { SET_TEMPERATURE, SET_IS_PAUSED, SET_IS_MICROSCOPIC } from '../types';

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

export { setTemperature, setIsPaused, setIsMicroscopic };
