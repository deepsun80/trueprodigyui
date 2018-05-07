export const apiBaseUrlSelector = (state) => state.getIn([ 'app', 'global', 'configuration', 'urls', 'api' ]);
export const authenticationTokenSelector = (state) => state.getIn([ 'app', 'global', 'user', 'token' ]);
export const userDataSelector = (state) => state.getIn([ 'app', 'global', 'user' ]);
export const userModuleSelector = (state) => state.getIn([ 'app', 'global', 'user', 'modules' ]);
export const preferenceSelector = (state) => state.getIn([ 'app', 'global', 'preference' ]);
export const urlsSelector = (state) => state.getIn([ 'app', 'global', 'configuration', 'urls' ]);
export const playingStatusSelector = (state) => state.getIn([ 'app', 'global', 'isPlaying' ]);
export const globalFormSelector = (state) => state.getIn([ 'app', 'global', 'form' ]);
