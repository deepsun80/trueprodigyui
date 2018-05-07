import React, { Component, PropTypes } from 'react';

export default class SimpleSearchInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    onKeyUp: PropTypes.func
  };

  constructor (props) {
    super(props);
  }

  onChange (value) {
    const { input } = this.props;
    input.onChange(value ? {
      operator: '=',
      value
    } : {});
  }

  render () {
    const { className, placeholder, onKeyUp } = this.props;
    return (
        <input
          className={className}
          placeholder={placeholder}
          type='text'
          onChange={(event) => this.onChange(event.target.value)}
          onKeyUp={onKeyUp}/>
    );
  }
}
