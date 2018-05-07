import { fromJS } from 'immutable';
import * as actions from '../actions/module';
import { fetchingState } from '../constants';

const initialStats = {
  moduleData: [],
  moduleState: ''
};

export default (state = fromJS(initialStats), action) => {
  switch (action.type) {

    case actions.MODULE_FETCH_DATA_START:
      return state.setIn([ 'moduleState' ], fetchingState.FETCHING);
    case actions.MODULE_FETCH_DATA_SUCCESS:
      const newState = state.setIn([ 'moduleState' ], fetchingState.LOADED);
      return newState.setIn([ 'moduleData' ], fromJS(action.data.results));
    case actions.MODULE_FETCH_DATA_ERROR:
      return state.setIn([ 'moduleState' ], fetchingState.ERROR);

    default:
      return state;
  }
};
