import { fromJS } from 'immutable';
import * as actions from '../actions/roles';
import { fetchingState } from '../constants';

const initialStats = {
  roleData: [],
  roleFetchState: '',
  rightsData: [],
  rightsOptionsData: [],
  rightsFetchState: '',
  rightsOptionsFetchState: ''
};

export default (state = fromJS(initialStats), action) => {
  switch (action.type) {
    // Roles
    case actions.ROLE_FETCH_DATA_START:
      return state.setIn([ 'roleFetchState' ], fetchingState.FETCHING);
    case actions.ROLE_FETCH_DATA_SUCCESS:
      let newState = state.setIn([ 'roleFetchState' ], fetchingState.LOADED);
      return newState.setIn([ 'roleData' ], fromJS(action.data.results));
    case actions.ROLE_FETCH_DATA_ERROR:
      return state.setIn([ 'roleFetchState' ], fetchingState.ERROR);

    case actions.ROLE_ADD_SUCCESS:
      newState = state.setIn([ 'roleFetchState' ], fetchingState.LOADED);
      return newState.setIn([ 'roleData' ], fromJS(action.data.results));

    case actions.ROLE_EDIT_SUCCESS:
      let newRoleData = state.getIn([ 'roleData' ]).toJS();
      newRoleData = newRoleData.filter((role) => role.roleID !== action.roleID);
      newRoleData = newRoleData.concat(action.data.results);
      return state.setIn([ 'roleData' ], fromJS(newRoleData));

    case actions.ROLE_REMOVE_SUCCESS:
      newRoleData = state.getIn([ 'roleData' ]).toJS();
      newRoleData = newRoleData.filter((role) => role.roleID !== action.roleID);
      return state.setIn([ 'roleData' ], fromJS(newRoleData));

    // Rights
    case actions.RIGHTS_FETCH_DATA_START:
      return state.setIn([ 'rightsFetchState' ], fetchingState.FETCHING);
    case actions.RIGHTS_FETCH_DATA_SUCCESS:
      newState = state.setIn([ 'rightsFetchState' ], fetchingState.LOADED);
      return newState.setIn([ 'rightsData' ], fromJS(action.data.results));
    case actions.RIGHTS_FETCH_DATA_ERROR:
      return state.setIn([ 'rightsFetchState' ], fetchingState.ERROR);

    case actions.RIGHTS_OPTIONS_FETCH_DATA_START:
      return state.setIn([ 'rightsOptionsFetchState' ], fetchingState.FETCHING);
    case actions.RIGHTS_OPTIONS_FETCH_DATA_SUCCESS:
      newState = state.setIn([ 'rightsOptionsFetchState' ], fetchingState.LOADED);
      return newState.setIn([ 'rightsOptionsData' ], fromJS(action.data.results));
    case actions.RIGHTS_OPTIONS_FETCH_DATA_ERROR:
      return state.setIn([ 'rightsOptionsFetchState' ], fetchingState.ERROR);

    case actions.RIGHTS_ADD_SUCCESS:
      newState = state.setIn([ 'rightsFetchState' ], fetchingState.LOADED);
      return newState.setIn([ 'rightsData' ], fromJS(action.data.results));

    case actions.RIGHTS_REMOVE_SUCCESS:
      let newRightsData = state.getIn([ 'rightsData' ]).toJS();
      newRightsData = newRightsData.filter((rights) => rights.userRightiD !== action.userRightIDList);
      return state.setIn([ 'rightsData' ], fromJS(newRightsData));

    default:
      return state;
  }
};
