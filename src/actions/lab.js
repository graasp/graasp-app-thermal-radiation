import { SET_TEMPERATURE, SET_IS_PAUSED } from '../types';

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

export { setTemperature, setIsPaused };
