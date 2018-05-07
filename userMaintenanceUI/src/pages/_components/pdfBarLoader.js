/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { BarLoader } from 'react-spinners';
import './pdfBarLoader.scss';

export default class PDFBarLoader extends Component {
  static propTypes = {
    color: PropTypes.string,
    loading: PropTypes.bool,
    message: PropTypes.string,
    style: PropTypes.object
  };

  render () {
    const { color, loading, message } = this.props;
    return (
      <div className='pdf-bar-loader'>
        <BarLoader
          color={color ? color : '#069dd8'}
          loading={loading}/>
        {loading && <span className='pdf-bar-message'>{message}</span>}
      </div>
    );
  }
}
