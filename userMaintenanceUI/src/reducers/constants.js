import * as actions from '../actions/constants';

const initialStats = {
  linkValue: 5,
  moduleID: null
};

const initialRoleState = {
  roleID: null
};

export const linkValueReducer = (state = initialStats, action) => {
  switch (action.type) {
    case actions.SET_LINK_VALUE:
      return { linkValue: action.moduleselect };

    case actions.SET_MODULE_ID:
      return { moduleID: action.moduleID };

    default:
      return state;
  }
};

export const roleValueReducer = (state = initialRoleState, action) => {
  switch (action.type) {
    case actions.SET_ROLE_ID:
      return { roleID: action.roleID };

    default:
      return state;
  }
};
