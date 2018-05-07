import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './pages/app/';
import RoleMaintenance from './pages/roleMaintenance';
import UserMaintenance from './pages/userMaintenance';
import Main from './pages/main';
import Login from './pages/login';
import { authenticationTokenSelector, urlsSelector, playingStatusSelector } from './selectors/global';
import { redirectToLaunchPad } from './client';

export const getRoutes = ({ dispatch, getState }) => { // eslint-disable-line react/prop-types
  function checkLogin () {
    return () => {
      const state = getState();
      if (!authenticationTokenSelector(state)) {
        return redirectToLaunchPad(urlsSelector(state).get('launchPad'), playingStatusSelector(state));
      }
    };
  }
  return (
    <Route component={App}>
      <Route component={Main} exact path='/' onEnter={checkLogin()}>
        <IndexRedirect to='role-maintenance/equityfinder' />
        <Route component={() => <RoleMaintenance moduleId={5}/>} path='role-maintenance/equityfinder'/>
        <Route component={() => <RoleMaintenance moduleId={13}/>} path='role-maintenance/appraisal'/>
        <Route component={() => <RoleMaintenance moduleId={3}/>} path='role-maintenance/analytics'/>
        <Route component={() => <RoleMaintenance moduleId={4}/>} path='role-maintenance/mra'/>
        <Route component={() => <RoleMaintenance moduleId={2}/>} path='role-maintenance/bi'/>
        <Route component={UserMaintenance} path='user-maintenance' />
      </Route>
      <Route component={Login} path='login'/>
    </Route>
  );
};
