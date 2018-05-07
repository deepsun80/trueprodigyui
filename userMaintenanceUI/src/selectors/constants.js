export const setLinkValue = (state) => state.getIn([ 'app', 'setLinkValue' ]);

export const linkValueSelector = (state) => state.getIn([ 'app', 'setLinkValue', 'linkValue' ]);

export const setModuleID = (state) => state.getIn([ 'app', 'setModuleID' ]);

export const setRoleID = (state) => state.getIn([ 'app', 'setRoleID' ]);
