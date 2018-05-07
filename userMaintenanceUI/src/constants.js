  export const defaultMenuItems = [
    'Prodigy App Launcher',
    'Role Maintenance'
  ];

  export const navMenuItems = [
    {
      title: 'Prodigy App Launcher',
      link: 'launchPad',
      iconClassName: 'fa-rocket'
    },
    {
      title: 'Role Maintenance',
      link: '/role-maintenance/equityfinder'
    },
    {
      title: 'User Maintenance',
      link: '/user-maintenance'
    }
  ];

  export const routesOpenState = {
    propertyList: 'Prodigy Equityfinder',
    subject: 'Prodigy Equityfinder_Subject',
    masterList: 'Prodigy Equityfinder_Subject'
  };

  export const fetchingState = {
    FETCHING: 'fetching',
    LOADED: 'loaded',
    ERROR: 'error'
  };

  export const simpleInputOperators = [ '=', '>', '<', '>=', '<=', 'like' ];
  export const textOperators = [ '=', 'in', 'like' ];
  export const defaultPageSize = 50;

  export const MAX_PRESENTATION_SLOTS = 8;
