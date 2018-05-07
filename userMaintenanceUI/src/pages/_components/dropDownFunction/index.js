import React, { Component, PropTypes } from 'react';
import ReactDropdown from 'react-dropdown';
require('./index.scss');

export default class DropdownFunction extends Component {
  static propTypes = {
    initValue: PropTypes.any,
    input: PropTypes.object,
    options: PropTypes.array,
    onSelectFunction: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      value: {
        value: props.initValue,
        label: props.initValue
      }
    };
  }

  componentWillMount () {
    const { initValue, input } = this.props;
    if (initValue !== undefined || initValue !== null) {
      input.onChange(initValue);
    }
  }

  onChange (value) {
    const { input } = this.props;
    this.setState({ value });
    input.onChange(value.value);
  }

  render () {
    const { options, onSelectFunction } = this.props;
    const { value } = this.state;
    return (
        <ReactDropdown
          options={options}
          value={value}
          onChange={(val) => {
            onSelectFunction(val.value);
            this.onChange(val);
          }}/>
    );
  }
}
