import { getConfiguration } from '../api/config';
import { push as routerPush } from 'react-router-redux';
import * as api from '../api/global';
import { makeApiActionCreator } from './utils';

export const CONFIGURE = 'CONFIGURE';

export const PREFERENCE_FETCH_START = 'GLOBAL/PREFERENCE_FETCH_START';
export const PREFERENCE_FETCH_SUCCESS = 'GLOBAL/PREFERENCE_FETCH_SUCCESS';
export const PREFERENCE_FETCH_ERROR = 'GLOBAL/PREFERENCE_FETCH_ERROR';

export const PREFERENCE_PERSIST_START = 'GLOBAL/PREFERENCE_PERSIST_START';
export const PREFERENCE_PERSIST_SUCCESS = 'GLOBAL/PREFERENCE_PERSIST_SUCCESS';
export const PREFERENCE_PERSIST_ERROR = 'GLOBAL/PREFERENCE_PERSIST_ERROR';

export const UPDATE_VIDEO_STATUS = 'UPDATE_VIDEO_STATUS';

export const fetchPreference = makeApiActionCreator(api.fetchPreference, PREFERENCE_FETCH_START, PREFERENCE_FETCH_SUCCESS, PREFERENCE_FETCH_ERROR);
export const persistPreference = makeApiActionCreator(api.persistPreference, PREFERENCE_PERSIST_START, PREFERENCE_PERSIST_SUCCESS, PREFERENCE_PERSIST_ERROR);

export function init () {
  return async (dispatch) => {
    const configuration = await getConfiguration();
    dispatch({ type: CONFIGURE, configuration });
  };
}

export function updateVideoStatus (isPlaying) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_VIDEO_STATUS, isPlaying });
  };
}

export function routerPushWithReturnTo (newUrlOrLocationObject, goBack) {
  return async (dispatch, getState) => {
    // Current location
    const location = getState().get('routing').locationBeforeTransitions;
    // In case newUrlOrLocationObject is an location object, use this object.
    if (typeof newUrlOrLocationObject === 'object') {
      // Set returnTo, but there is still a posability to overwrite this by passing this object
      // to newUrlOrLocationObject
      return dispatch(routerPush({ state: { returnTo: location }, ...newUrlOrLocationObject }));
    }
    // When we want to go to the previous page, we check if there is a returnTo object.
    if (goBack && location && location.state && typeof location.state.returnTo === 'object') {
      return dispatch(routerPush(location.state.returnTo));
    }
    // If there is no object or we didn't want to the previous page, go to newUrlOrLocationObject.
    return dispatch(routerPush({ pathname: newUrlOrLocationObject, state: { returnTo: location } }));
  };
}
