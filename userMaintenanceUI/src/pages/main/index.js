/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Sidebar from '../_components/sidebar';
import Header from '../_components/header';
import Toast from '../_components/toast';

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.any
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { children, location } = this.props;
    return (
      <div>
        <Sidebar currentPath={location.pathname} prevPath={location.state ? location.state.returnTo.pathname : ''}/>
        <div className='page' style={{ position: 'relative', zIndex: '0' }}>
        <Header />
            {children}
        </div>
        <Toast />
      </div>
    );
  }
}
