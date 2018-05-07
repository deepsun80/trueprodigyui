import { fromJS } from 'immutable';
import * as actions from '../actions/users';
import { fetchingState } from '../constants';

const initialStats = {
  usersData: [],
  newUserData: [],
  userModuleData: [],
  userRoleData: [],
  usersState: '',
  newUserState: '',
  userModuleState: ''
};

export default (state = fromJS(initialStats), action) => {
  switch (action.type) {

    case actions.USERS_FETCH_DATA_START:
      return state.setIn([ 'usersState' ], fetchingState.FETCHING);
    case actions.USERS_FETCH_DATA_SUCCESS:
      let newState = state.setIn([ 'usersState' ], fetchingState.LOADED);
      return newState.setIn([ 'usersData' ], fromJS(action.data.results));
    case actions.USERS_FETCH_DATA_ERROR:
      return state.setIn([ 'usersState' ], fetchingState.ERROR);

    case actions.USER_REMOVE_SUCCESS:
      let newUsersData = state.getIn([ 'usersData' ]).toJS();
      newUsersData = newUsersData.filter((user) => user.id !== action.id);
      return state.setIn([ 'usersData' ], fromJS(newUsersData));

    case actions.USER_ADD_START:
      return state.setIn([ 'newUserState' ], fetchingState.FETCHING);
    case actions.USER_ADD_SUCCESS:
      newState = state.setIn([ 'newUserState' ], fetchingState.LOADED);
      return newState.setIn([ 'newUserData' ], fromJS(action.data.results));
    case actions.USER_ADD_ERROR:
      return state.setIn([ 'newUserState' ], fetchingState.ERROR);

    case actions.USER_EDIT_SUCCESS:
      const editUserModule = state.getIn([ 'userModuleData' ]).toJS();
      let setModuleID = 0;
      action.user.modules.forEach((module) => {
        if (module === 'Prodigy BI Dashboard') {
          setModuleID = 2;
        }
        if (module === 'Prodigy Analytics') {
          setModuleID = 3;
        }
        if (module === 'Prodigy MRA') {
          setModuleID = 4;
        }
        if (module === 'Prodigy Equityfinder') {
          setModuleID = 5;
        }
        if (module === 'Prodigy Appraisal') {
          setModuleID = 13;
        }
        editUserModule.push({
          inserted: action.user.inserted,
          createdBy: action.user.createdBy,
          moduleID: setModuleID,
          userID: action.user.id
        });
      });
      const editUserName = state.getIn([ 'newUserData' ]).toJS();
      editUserName.push(action.user);
      return state.setIn([ 'newUserData' ], fromJS(editUserName))
                  .setIn([ 'newUserState' ], fetchingState.LOADED)
                  .setIn([ 'userModuleData' ], fromJS(editUserModule))
                  .setIn([ 'userModuleState' ], fetchingState.LOADED);

    case actions.USER_EDIT_NAME_SUCCESS:
      newState = state.setIn([ 'newUserState' ], fetchingState.LOADED);
      return newState.setIn([ 'newUserData' ], fromJS(action.data.results));

    case actions.USER_ADD_MODULE_SUCCESS:
      newState = state.setIn([ 'userModuleState' ], fetchingState.LOADED);
      return newState.setIn([ 'userModuleData' ], fromJS(action.data.results));

    case actions.USER_DELETE_MODULE_START:
      newState = state.setIn([ 'userModuleState' ], fetchingState.FETCHING);
      return state.setIn([ 'userModuleState' ], fetchingState.LOADED);
    case actions.USER_DELETE_MODULE_SUCCESS:
      newState = state.getIn([ 'userModuleData' ]).toJS();
      newState = newState.filter((module) => module.moduleID !== action.moduleID);
      let newRoleState = state.getIn([ 'userRoleData' ]).toJS();
      newRoleState = newRoleState.filter((module) => module.moduleID !== action.moduleID);
      return state.setIn([ 'userRoleData' ], fromJS(newRoleState)).setIn([ 'userModuleData' ], fromJS(newState));

    case actions.USER_ADD_ROLE_SUCCESS:
      newState = state.getIn([ 'userRoleData' ]).toJS();
      newState = newState.concat(action.data.results);
      return state.setIn([ 'userRoleData' ], fromJS(newState));

    case actions.USER_MODULES_FETCH_DATA_START:
      return state.setIn([ 'userModuleState' ], fetchingState.FETCHING);
    case actions.USER_MODULES_FETCH_DATA_SUCCESS:
      newState = state.setIn([ 'userModuleState' ], fetchingState.LOADED);
      return newState.setIn([ 'userModuleData' ], fromJS(action.data.results));
    case actions.USER_MODULES_FETCH_DATA_ERROR:
      return state.setIn([ 'userModuleState' ], fetchingState.ERROR);

    case actions.USER_ROLES_FETCH_DATA_SUCCESS:
      return state.setIn([ 'userRoleData' ], fromJS(action.data.results));

    case actions.USER_DELETE_ROLE_SUCCESS:
      newState = state.getIn([ 'userRoleData' ]).toJS();
      newState = newState.filter((role) => role.roleID !== action.roleID);
      return state.setIn([ 'userRoleData' ], fromJS(newState));

    default:
      return state;
  }
};
