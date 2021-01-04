import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_STAGE_DIMENSIONS,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  lab: { stageDimensions: { width: 0, height: 0 } },
  showLoader: true,
  showSideMenu: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          open: payload,
        },
      };
    case TOGGLE_LOADING_SCREEN:
      return {
        ...state,
        showLoader: payload,
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        showSideMenu: payload,
      };
    case SET_STAGE_DIMENSIONS: {
      return { ...state, lab: { ...state.lab, stageDimensions: payload } };
    }
    default:
      return state;
  }
};
