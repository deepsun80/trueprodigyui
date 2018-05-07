import { authenticationTokenSelector, apiBaseUrlSelector } from '../selectors/global';

export function makeApiActionCreator (_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      const authenticationToken = authenticationTokenSelector(state);
      dispatch({ ...params, type: startActionType });
      try {
        const data = await _apiCall(apiBaseUrl, authenticationToken, params);
        dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        dispatch({ ...params, error, type: errorActionType });
        throw error;
      }
    };
  };
}
