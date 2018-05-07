import { combineReducers } from 'redux-immutablejs';
import globalReducer from './global';
import moduleReducer from './module';
import { linkValueReducer, roleValueReducer } from './constants';
import toastReducer from './toast';
import modalReducer from './modal';
import roleReducer from './roles';
import usersReducer from './users';
/**
 * The application's main reducer
 */
export default combineReducers({
  global: globalReducer,
  modal: modalReducer,
  toast: toastReducer,
  module: moduleReducer,
  roles: roleReducer,
  setLinkValue: linkValueReducer,
  setRoleID: roleValueReducer,
  setModuleID: linkValueReducer,
  users: usersReducer
});
