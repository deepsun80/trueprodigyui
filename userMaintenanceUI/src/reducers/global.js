import { fromJS } from 'immutable';
import * as actions from '../actions/global';
import * as userActions from '../actions/user';
import { fetchingState } from '../constants';

const initialStats = {
  user: {},
  configuration: {},
  preference: {},
  form: {},
  isPlaying: false
};

export default (state = fromJS(initialStats), action) => {
  switch (action.type) {
    // User actions
    // ////////////
    case userActions.LOGIN_SUCCESS:
      return state.set('user', fromJS(action.data.user));
    case userActions.LOGOUT_SUCCESS:
      return state.set('user', null);

    case actions.PREFERENCE_FETCH_START:
      return state.setIn([ 'preference', 'state' ], fetchingState.FETCHING);
    case actions.PREFERENCE_FETCH_SUCCESS:
      const newState = state.setIn([ 'preference', 'state' ], fetchingState.LOADED);
      return newState.setIn([ 'preference', 'data' ], fromJS(action.data.results.length > 0 ? action.data.results[0].preference : {}));
    case actions.PREFERENCE_FETCH_ERROR:
      return state.setIn([ 'preference', 'state' ], fetchingState.ERROR);

    // Global actions
    // //////////////
    case actions.UPDATE_VIDEO_STATUS:
      return state.set('isPlaying', action.isPlaying);
    case actions.CONFIGURE:
      return state.mergeIn([ 'configuration' ], fromJS(action.configuration));
    default:
      return state;
  }
};
