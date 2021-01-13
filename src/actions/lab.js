import { SET_TEMPERATURE } from '../types';

const setTemperature = (temperature) => (dispatch) =>
  dispatch({
    type: SET_TEMPERATURE,
    payload: temperature,
  });

// eslint-disable-next-line import/prefer-default-export
export { setTemperature };
