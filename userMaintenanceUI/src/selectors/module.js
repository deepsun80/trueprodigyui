export const moduleSelector = (state) => state.getIn([ 'app', 'module' ]);

export const moduleDataSelector = (state) => state.getIn([ 'app', 'module', 'moduleData' ]);

export const moduleStateSelector = (state) => state.getIn([ 'app', 'module', 'moduleState' ]);
