export const SET_LINK_VALUE = 'SET_LINK_VALUE';
export const SET_MODULE_ID = 'SET_MODULE_ID';
export const SET_ROLE_ID = 'SET_ROLE_ID/SET_ROLE_ID';

export function setLinkValue (moduleselect) {
  return {
    type: SET_LINK_VALUE,
    moduleselect
  };
}

export function setModuleID (moduleID) {
  return {
    type: SET_MODULE_ID,
    moduleID
  };
}

export function setRoleID (roleID) {
  return {
    type: SET_ROLE_ID,
    roleID
  };
}
