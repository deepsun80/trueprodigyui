/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
export default class ClickableLinkRenderer extends Component {
  static propTypes = {
    node: PropTypes.any,
    value: PropTypes.any,
    onClick: PropTypes.func
  };

  render () {
    const { value, onClick, node } = this.props;
    return (
      <a style={{ color: '#3949ab' }} onClick={() => onClick(node.data.PropID)}>{value}</a>
    );
  }
}
