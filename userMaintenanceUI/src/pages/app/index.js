import React, { Component, PropTypes } from 'react';
require('../../main.scss');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}
