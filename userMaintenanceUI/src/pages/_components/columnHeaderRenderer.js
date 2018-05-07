/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ModalDropDown from './modalDropDown';
export default class ColumnHeaderRenderer extends Component {
  static propTypes = {
    value: PropTypes.any,
    years: PropTypes.array,
    onAddVersion: PropTypes.func.isRequired,
    onCopyVersion: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onOpenCompSelector: PropTypes.func.isRequired
  };

  render () {
    const { value, years, onAddVersion, onCopyVersion, onImport, onLoad, onOpenCompSelector } = this.props;
    return (
      <div className='ag-grid-action-header'>
        <ModalDropDown
          actionTitle='Actions'
          label={<i className='icon fa-bars' />}
          years={years}
          onAdd={(propertyId) => onAddVersion(value.id, propertyId)}
          onCopy={(propertyId, year) => onCopyVersion(value.id, propertyId, year)}
          onImport={(propertyId) => onImport(value.id, propertyId)}
          onLoad={(propertyId) => onLoad(value.id, propertyId)}
          onOpenCompSelector={() => onOpenCompSelector(value.id)}/>
      </div>
    );
  }
}
