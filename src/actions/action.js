import Qs from 'qs';
import { DEFAULT_VISIBILITY } from '../config/settings';
import { flag, getApiContext, isErrorResponse, postMessage } from './common';
import {
  FLAG_POSTING_ACTION,
  POST_ACTION,
  POST_ACTION_FAILED,
  POST_ACTION_SUCCEEDED,
  FLAG_GETTING_ACTIONS,
  GET_ACTIONS_SUCCEEDED,
  GET_ACTIONS_FAILED,
} from '../types';
import { ACTION_FORMAT } from '../config/formats';
import {
  ACTIONS_ENDPOINT,
  DEFAULT_GET_REQUEST,
  DEFAULT_POST_REQUEST,
} from '../config/api';

const flagPostingAction = flag(FLAG_POSTING_ACTION);
const flagGettingActions = flag(FLAG_GETTING_ACTIONS);

const getActions = async (
  params = {
    spaceId: [],
    userId: [],
    visibility: undefined,
  },
) => async (dispatch, getState) => {
  dispatch(flagGettingActions(true));
  try {
    const { apiHost, spaceId: currentSpaceId } = getApiContext(getState);

    // by default include current space id
    const { spaceId = [] } = params;
    if (!spaceId.length) {
      spaceId.push(currentSpaceId);
    }

    // create url from params
    const url = `//${apiHost + ACTIONS_ENDPOINT}?${Qs.stringify(params)}`;

    const response = await fetch(url, DEFAULT_GET_REQUEST);

    // throws if it is an error
    await isErrorResponse(response);

    const actions = await response.json();

    // tell redux that we have the actions
    dispatch({
      type: GET_ACTIONS_SUCCEEDED,
      payload: actions,
    });
  } catch (err) {
    // tell redux that we encountered an error
    dispatch({
      type: GET_ACTIONS_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingActions(false));
  }
};

const postAction = async ({
  data,
  verb,
  visibility = DEFAULT_VISIBILITY,
} = {}) => async (dispatch, getState) => {
  dispatch(flagPostingAction(true));
  try {
    const {
      userId,
      appInstanceId,
      apiHost,
      offline,
      spaceId,
      subSpaceId,
      standalone,
      analytics,
    } = getApiContext(getState);

    // if analytics is not turned on, abort
    // todo: post message analytics + ensure that desktop keeps analytics
    if (!analytics) {
      return false;
    }

    // if standalone, you cannot connect to api
    if (standalone) {
      return false;
    }

    // if offline send message to parent requesting to create a resource
    if (offline) {
      return postMessage({
        type: POST_ACTION,
        payload: {
          data,
          verb,
          spaceId,
          subSpaceId,
          format: ACTION_FORMAT,
          appInstanceId,
          userId,
          visibility,
        },
      });
    }

    const url = `//${apiHost + ACTIONS_ENDPOINT}`;

    const body = {
      data,
      verb,
      space: spaceId,
      format: ACTION_FORMAT,
      appInstance: appInstanceId,
      visibility,
    };

    const response = await fetch(url, {
      ...DEFAULT_POST_REQUEST,
      body: JSON.stringify(body),
    });

    // throws if it is an error
    await isErrorResponse(response);

    const action = await response.json();

    return dispatch({
      type: POST_ACTION_SUCCEEDED,
      payload: action,
    });
  } catch (err) {
    return dispatch({
      type: POST_ACTION_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagPostingAction(false));
  }
};

export { postAction, getActions };
