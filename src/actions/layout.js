import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_STAGE_DIMENSIONS,
  TOGGLE_ELECTRONS,
  TOGGLE_SPECTRUM_BAR,
} from '../types';

const toggleSettings = (showSettings) => (dispatch) =>
  dispatch({
    type: TOGGLE_SETTINGS,
    payload: showSettings,
  });

const toggleLoadingScreen = (showLoadingScreen) => (dispatch) =>
  dispatch({
    type: TOGGLE_LOADING_SCREEN,
    payload: showLoadingScreen,
  });

const toggleSideMenu = (showSideMenu) => (dispatch) =>
  dispatch({
    type: TOGGLE_SIDE_MENU,
    payload: showSideMenu,
  });

const setStageDimensions = (payload) => (dispatch) => {
  dispatch({
    type: SET_STAGE_DIMENSIONS,
    payload,
  });
};

const toggleElectrons = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_ELECTRONS,
    payload,
  });
};

const toggleSpectrumBar = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_SPECTRUM_BAR,
    payload,
  });
};

export {
  toggleSettings,
  toggleLoadingScreen,
  toggleSideMenu,
  setStageDimensions,
  toggleElectrons,
  toggleSpectrumBar,
};
