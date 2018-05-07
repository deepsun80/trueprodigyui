/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
export default class ValueRenderer extends Component {
  static propTypes = {
    renderValue: PropTypes.func.isRequired,
    value: PropTypes.any
  };

  render () {
    const { renderValue, value } = this.props;
    return (
      <span>{renderValue(value)}</span>
    );
  }
}
