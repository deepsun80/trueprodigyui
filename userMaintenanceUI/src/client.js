/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { init, routerPushWithReturnTo, updateVideoStatus } from './actions/global';
import { urlsSelector, playingStatusSelector } from './selectors/global';
import { checkToken } from './actions/user';
import thunkMiddleware from 'redux-thunk';
import { fromJS } from 'immutable';
import { AsyncRouterContext } from 'redux-async-props';
import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable';
import reducer from './reducers';
import { getRoutes } from './routes';
import { LicenseManager } from 'ag-grid-enterprise/main';
LicenseManager.setLicenseKey('ag-Grid_Evaluation_License_Key_Not_for_Production_1Devs10_January_2018__MTUxNTU0MjQwMDAwMA==8830dbe7d628f87ebb04ff34328f72eb');

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  app: reducer,
  form,
  routing: routerReducer
});

/**
 * Creates a Redux store that holds the complete state tree of this app.
 * @param {object} theHistory The history used during redux store synchronization.
 * @param {function(state, action: object)} reducers A reducing function that returns the next state tree, given the current state tree and an action to handle.
 * @param {any} initialState
 * @return A redux store.
 */
export function createOurStore (theHistory, reducers, initialState) {
  const middleware = [];
  // Install thunk middleware
  middleware.push(thunkMiddleware);
  // Install react-router-redux's router middleware
  middleware.push(routerMiddleware(theHistory));
  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  if (__DEVELOPMENT__) {
    return newCreateStore(
      reducers,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return newCreateStore(
    reducers,
    initialState
  );
}

export function redirectToLaunchPad (url, isPlaying) {
  window.open(`${url}?isPlaying=${isPlaying ? 1 : 0}`, '_self');
}

async function boot () {
  // Create redux store
  const initialState = fromJS({});
  const store = createOurStore(browserHistory, rootReducer, initialState);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(browserHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Clear state on start
  ourHistory.replace(ourHistory.createLocation({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null // Remove state
  }));
  // Load session from local storage.

  await store.dispatch(init());
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const isPlaying = params.get('isPlaying');
  if (isPlaying) {
    if (isPlaying === 'true') {
      await store.dispatch(updateVideoStatus(true));
    }
    store.dispatch(routerPushWithReturnTo(window.location.pathname));
  }

  if (token) {
    try {
      await store.dispatch(checkToken({ token }));
      store.dispatch(routerPushWithReturnTo(window.location.pathname));
    } catch (error) {
      console.log('invalid token');
    }
  } else if (localStorage) {
    const session = localStorage.getItem('session');
    if (session) {
      const userData = JSON.parse(session);
      try {
        await store.dispatch(checkToken({ token: userData.user.token }));
      } catch (error) {
        console.log('token is invalid');
      }
    } else {
      redirectToLaunchPad(urlsSelector(store.getState()), playingStatusSelector(store.getState()));
    }
  } else {
    redirectToLaunchPad(urlsSelector(store.getState()), playingStatusSelector(store.getState()));
  }
  //
  // Render application
  ReactDOM.render(
    <StyleRoot>
      <Provider store={store}>
        <Router history={ourHistory} render={(props) => <AsyncRouterContext {...props} asyncProps={initialState.get('asyncProps')} />}>
          {getRoutes(store)}
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('root'));
}

boot();
