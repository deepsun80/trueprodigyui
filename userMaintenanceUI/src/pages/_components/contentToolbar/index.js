import React, { Component, PropTypes } from 'react';
require('./index.scss');

export default class ContentToolbar extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render () {
    const { children } = this.props;
    return (
      <div className='content-toolbar'>
        {children}
      </div>
    );
  }
}
