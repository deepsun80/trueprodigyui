/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import NumberFormat from 'react-number-format';

export default class NumberRenderer extends Component {
  static propTypes = {
    value: PropTypes.any
  };

  render () {
    const { value } = this.props;
    return (
      <NumberFormat displayType={'text'} thousandSeparator value={parseInt(value, 10)} />
    );
  }
}
