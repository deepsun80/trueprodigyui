import { Map, List } from 'immutable';
import * as moduleActions from '../actions/module';
import * as rolesActions from '../actions/roles';
import * as usersActions from '../actions/users';
import * as toastActions from '../actions/toast';

function pushError (state, error, entity) {
  return state.push(Map({ type: 'error', error, entity }));
}

function pushSuccess (state, message) {
  return state.push(Map({ type: 'success', message }));
}

function pop (state) {
  return state.shift();
}

export default (state = List(), action) => {
  switch (action.type) {

// error
    case moduleActions.MODULE_FETCH_DATA_ERROR:
      return pushError(state, action.error, 'Fetching Modules');

    case rolesActions.ROLE_FETCH_DATA_ERROR:
      return pushError(state, action.error, 'Fetching Roles');
    case rolesActions.ROLE_ADD_DATA_ERROR:
      return pushError(state, action.error, 'Adding Role');
    case rolesActions.ROLE_EDIT_DATA_ERROR:
      return pushError(state, action.error, 'Changing Role');
    case rolesActions.ROLE_REMOVE_ERROR:
      return pushError(state, action.error, 'Removing Role');

    case rolesActions.RIGHTS_FETCH_DATA_ERROR:
      return pushError(state, action.error, 'Fetching Rights');
    case rolesActions.RIGHTS_OPTIONS_FETCH_DATA_ERROR:
      return pushError(state, action.error, 'Fetching Rights');
    case rolesActions.RIGHTS_ADD_ERROR:
      return pushError(state, action.error, 'Adding Right');
    case rolesActions.RIGHTS_REMOVE_ERROR:
      return pushError(state, action.error, 'Removing Right');

    case usersActions.USERS_FETCH_DATA_ERROR:
      return pushError(state, action.error, 'Fetching Users');
    case usersActions.USER_REMOVE_ERROR:
      return pushError(state, action.error, 'Removing User');
    case usersActions.USER_ADD_ERROR:
      return pushError(state, action.error, 'Adding User');
    case usersActions.USER_EDIT_NAME_ERROR:
      return pushError(state, action.error, 'Changing User Full Name');
    case usersActions.USER_ADD_MODULE_ERROR:
      return pushError(state, action.error, 'Adding Module');
    case usersActions.USER_ADD_ROLE_ERROR:
      return pushError(state, action.error, 'Adding Role');
    case usersActions.USER_DELETE_MODULE_ERROR:
      return pushError(state, action.error, 'Removing Module');
    case usersActions.USER_DELETE_ROLE_ERROR:
      return pushError(state, action.error, 'Removing Role');
    case usersActions.USER_MODULES_FETCH_DATA_ERROR:
      return pushError(state, action.error, 'Fetching Modules');

// success
    case rolesActions.ROLE_ADD_SUCCESS:
      return pushSuccess(state, 'Adding Role');
    case rolesActions.ROLE_EDIT_SUCCESS:
      return pushSuccess(state, 'Changing Role');
    case rolesActions.ROLE_REMOVE_SUCCESS:
      return pushSuccess(state, 'Removing Role');

    case rolesActions.RIGHTS_ADD_SUCCESS:
      return pushSuccess(state, 'Adding Right');
    case rolesActions.RIGHTS_REMOVE_SUCCESS:
      return pushSuccess(state, 'Removing Right');

    case usersActions.USER_REMOVE_SUCCESS:
      return pushSuccess(state, 'Removing User');
    case usersActions.USER_ADD_SUCCESS:
      return pushSuccess(state, 'Adding User');
    case usersActions.USER_EDIT_NAME_SUCCESS:
      return pushSuccess(state, 'Changing User Full Name');
    case usersActions.USER_ADD_MODULE_SUCCESS:
      return pushSuccess(state, 'Adding Module');
    case usersActions.USER_ADD_ROLE_SUCCESS:
      return pushSuccess(state, 'Adding Role');
    case usersActions.USER_DELETE_MODULE_SUCCESS:
      return pushSuccess(state, 'Removing Module');
    case usersActions.USER_DELETE_ROLE_SUCCESS:
      return pushSuccess(state, 'Removing Role');

    case toastActions.TOAST_POP:
      return pop(state);
    default:
      return state;
  }
};
