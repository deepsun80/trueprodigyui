/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
export default class SimpleLinkRenderer extends Component {
  static propTypes = {
    data: PropTypes.any,
    value: PropTypes.any,
    onClick: PropTypes.func
  };

  render () {
    const { value, onClick } = this.props;
    return (
      <a style={{ color: '#3949ab' }} onClick={() => onClick(value, this.props.data)}>{value}</a>
    );
  }
}
