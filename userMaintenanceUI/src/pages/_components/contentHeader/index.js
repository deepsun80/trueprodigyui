import React, { Component, PropTypes } from 'react';
require('./index.scss');

export default class ContentHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render () {
    const { title } = this.props;
    return (
      <div className='content-header'>
        {title}
        <div className='content-header-tools'>
          <i className='icon fa-print' />
        </div>
      </div>
    );
  }
}
