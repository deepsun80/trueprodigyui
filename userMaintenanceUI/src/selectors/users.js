export const usersDataSelector = (state) => state.getIn([ 'app', 'users', 'usersData' ]);

export const newUserDataSelector = (state) => state.getIn([ 'app', 'users', 'newUserData' ]);

export const newUserStateSelector = (state) => state.getIn([ 'app', 'users', 'newUserState' ]);

export const newUserFetchStateSelector = (state) => state.getIn([ 'app', 'users', 'newUserState' ]);

export const userModuleDataSelector = (state) => state.getIn([ 'app', 'users', 'userModuleData' ]);

export const userModuleStateSelector = (state) => state.getIn([ 'app', 'users', 'userModuleState' ]);

export const userRoleDataSelector = (state) => state.getIn([ 'app', 'users', 'userRoleData' ]);
