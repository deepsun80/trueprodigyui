export const roleSelector = (state) => state.getIn([ 'app', 'roles' ]);

export const roleDataSelector = (state) => state.getIn([ 'app', 'roles', 'roleData' ]);

export const roleFetchStateSelector = (state) => state.getIn([ 'app', 'roles', 'roleFetchState' ]);

export const rightsDataSelector = (state) => state.getIn([ 'app', 'roles', 'rightsData' ]);

export const rightsOptionsDataSelector = (state) => state.getIn([ 'app', 'roles', 'rightsOptionsData' ]);

export const rightsFetchStateSelector = (state) => state.getIn([ 'app', 'roles', 'rightsFetchState' ]);

