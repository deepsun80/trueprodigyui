import { createStructuredSelector } from 'reselect';
import { moduleDataSelector } from '../../selectors/module';
import { roleFetchStateSelector, roleDataSelector } from '../../selectors/roles';
import {
  usersDataSelector,
  newUserDataSelector,
  newUserStateSelector,
  newUserFetchStateSelector,
  userModuleDataSelector,
  userModuleStateSelector,
  userRoleDataSelector
} from '../../selectors/users';

import {
    preferenceSelector,
    userDataSelector
} from '../../selectors/global';

export default createStructuredSelector({
  usersData: usersDataSelector,
  preference: preferenceSelector,
  userData: userDataSelector,
  newUserData: newUserDataSelector,
  newUserFetchState: newUserFetchStateSelector,
  moduleData: moduleDataSelector,
  userModuleData: userModuleDataSelector,
  userModuleState: userModuleStateSelector,
  newUserState: newUserStateSelector,
  roleFetchState: roleFetchStateSelector,
  roleData: roleDataSelector,
  userRoleData: userRoleDataSelector
});
