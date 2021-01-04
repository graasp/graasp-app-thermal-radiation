import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_STAGE_DIMENSIONS,
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

export {
  toggleSettings,
  toggleLoadingScreen,
  toggleSideMenu,
  setStageDimensions,
};
