import { SET_TEMPERATURE } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const setTemperature = (payload) => (dispatch) => {
  dispatch({
    type: SET_TEMPERATURE,
    payload,
  });
};
