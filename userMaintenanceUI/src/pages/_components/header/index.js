import React, { Component } from 'react';
import Body from 'react-body-classname';
require('./index.scss');

const userMaintenanceLogo = require('../../../assets/images/true-prodigy-logo-User-Maintenance.png');

export default class Header extends Component {
  static propTypes = {
  };

  render () {
    return (
      <Body className='site-menubar-unfold'>
        <nav className='site-navbar navbar navbar-default navbar-fixed-top navbar-mega' role='navigation' style={{ backgroundColor: '#333333' }}>
          <div className='navbar-header' style={{ textAlign: 'center' }}>
            <img src={userMaintenanceLogo} style={{ width: '50%' }}/>
          </div>
          <div className='navbar-container container-fluid'>
            <div className='collapse navbar-collapse navbar-collapse-toolbar'>
              <ul className='nav navbar-toolbar'>
                <li className='nav-item hidden-float'>
                  <a className='nav-link' href='#' role='button'>
                    <i className='icon fa-bars' />
                  </a>
                </li>
                <li className='nav-item hidden-float'>
                  <a className='nav-link icon wb-search' href='#' role='button'>
                    <span className='sr-only'>Toggle Search</span>
                  </a>
                </li>
              </ul>
              <ul className='nav navbar-toolbar navbar-right navbar-toolbar-right'>
                <li className='nav-item dropdown'>
                  <a className='nav-link' title='Notifications'>
                    <i className='icon fa-bell'/>
                    <span className='badge badge-pill badge-danger up'>5</span>
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a className='nav-link' title='Messages'>
                    <i className='icon fa-envelope'/>
                    <span className='badge badge-pill badge-info up'>3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Body>
    );
  }
}
