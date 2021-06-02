import _ from 'lodash';
import {
  APP_INSTANCES_ENDPOINT,
  DEFAULT_GET_REQUEST,
  DEFAULT_PATCH_REQUEST,
} from '../config/api';
import {
  flag,
  getApiContext,
  getSettings,
  isErrorResponse,
  postMessage,
} from './common';
import {
  FLAG_GETTING_APP_INSTANCE,
  FLAG_PATCHING_APP_INSTANCE,
  GET_APP_INSTANCE_FAILED,
  GET_APP_INSTANCE_SUCCEEDED,
  PATCH_APP_INSTANCE_FAILED,
  PATCH_APP_INSTANCE_SUCCEEDED,
  GET_APP_INSTANCE,
  PATCH_APP_INSTANCE,
  SET_IS_MICROSCOPIC,
} from '../types';
import { setIsMicroscopic } from './lab';

const flagGettingAppInstance = flag(FLAG_GETTING_APP_INSTANCE);
const flagPatchingAppInstance = flag(FLAG_PATCHING_APP_INSTANCE);

const getAppInstance = async () => async (dispatch, getState) => {
  dispatch(flagGettingAppInstance(true));
  try {
    const {
      appInstanceId,
      apiHost,
      offline,
      spaceId,
      subSpaceId,
      standalone,
    } = getApiContext(getState);

    // if standalone, you cannot connect to api
    if (standalone) {
      return false;
    }

    // if offline send message to parent requesting resources
    if (offline) {
      return postMessage({
        type: GET_APP_INSTANCE,
        payload: {
          id: appInstanceId,
          spaceId,
          subSpaceId,
        },
      });
    }

    const url = `//${apiHost + APP_INSTANCES_ENDPOINT}/${appInstanceId}`;

    const response = await fetch(url, DEFAULT_GET_REQUEST);

    // throws if it is an error
    await isErrorResponse(response);

    const appInstance = await response.json();

    // set default microscopic view value
    const payload = appInstance?.settings?.showMicroscopicView;
    if (_.isBoolean(payload)) {
      dispatch({
        type: SET_IS_MICROSCOPIC,
        payload,
      });
    }

    // send the app instance to the reducer
    return dispatch({
      type: GET_APP_INSTANCE_SUCCEEDED,
      payload: appInstance,
    });
  } catch (err) {
    return dispatch({
      type: GET_APP_INSTANCE_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingAppInstance(false));
  }
};

const patchAppInstance = async ({ data } = {}) => async (
  dispatch,
  getState,
) => {
  dispatch(flagPatchingAppInstance(true));
  try {
    const { appInstanceId, apiHost, offline, standalone } = getApiContext(
      getState,
    );

    // if standalone, you cannot connect to api
    if (standalone) {
      return false;
    }

    // if offline send message to parent requesting resources
    if (offline) {
      return postMessage({
        type: PATCH_APP_INSTANCE,
      });
    }

    const url = `//${apiHost + APP_INSTANCES_ENDPOINT}/${appInstanceId}`;
    const body = {
      settings: data,
    };

    const response = await fetch(url, {
      ...DEFAULT_PATCH_REQUEST,
      body: JSON.stringify(body),
    });

    // throws if it is an error
    await isErrorResponse(response);

    const appInstance = await response.json();

    return dispatch({
      type: PATCH_APP_INSTANCE_SUCCEEDED,
      payload: appInstance,
    });
  } catch (err) {
    return dispatch({
      type: PATCH_APP_INSTANCE_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagPatchingAppInstance(false));
  }
};

const setShowMicroscopicView = (showMicroscopicView) => (
  dispatch,
  getState,
) => {
  const currentSettings = getSettings(getState);
  const newSettings = {
    ...currentSettings,
    showMicroscopicView,
  };
  // first save the settings in the app instance
  dispatch(patchAppInstance({ data: newSettings }));

  // toggle view in sidemenu
  dispatch(setIsMicroscopic(showMicroscopicView));
};

const setShowThermometerLabels = (showThermometerLabels) => (
  dispatch,
  getState,
) => {
  const currentSettings = getSettings(getState);
  const newSettings = {
    ...currentSettings,
    showThermometerLabels,
  };
  // first save the settings in the app instance
  dispatch(patchAppInstance({ data: newSettings }));
};

export {
  patchAppInstance,
  getAppInstance,
  setShowMicroscopicView,
  setShowThermometerLabels,
};
