import { createStructuredSelector } from 'reselect';
import { roleDataSelector, rightsDataSelector, rightsOptionsDataSelector, rightsFetchStateSelector } from '../../selectors/roles';
import { moduleSelector, moduleStateSelector } from '../../selectors/module';
import { setRoleID, setModuleID } from '../../selectors/constants';
import {
    preferenceSelector,
    userDataSelector
  } from '../../selectors/global';

export default createStructuredSelector({
  module: moduleSelector,
  roleData: roleDataSelector,
  preference: preferenceSelector,
  userData: userDataSelector,
  rightsData: rightsDataSelector,
  rightsOptionsData: rightsOptionsDataSelector,
  setRoleIdData: setRoleID,
  moduleIdData: setModuleID,
  rightsFetchState: rightsFetchStateSelector,
  moduleState: moduleStateSelector
});
