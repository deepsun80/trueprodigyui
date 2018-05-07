/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../../../actions/global';
import selector from './selector';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
@connect(selector, (dispatch) => ({
  fetchPreference: bindActionCreators(globalActions.fetchPreference, dispatch),
  persistPreference: bindActionCreators(globalActions.persistPreference, dispatch)
}))
export default class CustomAGGrid extends Component {
  static propTypes = {
    fetchPreference: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    persistPreference: PropTypes.func.isRequired,
    preference: ImmutablePropTypes.map,
    userData: ImmutablePropTypes.map
  };

  componentDidMount () {
    const { fetchPreference, userData } = this.props;
    fetchPreference({
      userId: userData.get('id')
    });
  }

  onSavePreference (params) {
    const { persistPreference, preference, userData, name } = this.props;
    const columnsWidth = {};
    params.columnApi.getColumnState().forEach((column) => {
      columnsWidth[column.colId] = column.width;
    });
    const movedColumns = params.columnApi.getColumnState().map((column) => column.colId);
    const visibleColumns = params.columnApi.getAllDisplayedColumns().map((column) => column.colId);
    const preferenceToPersist = preference.get('data').toJS();

    preferenceToPersist[name] = {
      ...preferenceToPersist[name],
      columnsWidth,
      movedColumns,
      visibleColumns
    };
    persistPreference({
      userId: userData.get('id'),
      data: {
        preference: preferenceToPersist
      }
    });
  }

  onGridReady (params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  render () {
    const { fetchPreference, name, persistPreference, preference, userData, ...otherProps } = this.props;
    if (!preference.get('data')) {
      return null;
    }
    return (
      <AgGridReact
        onColumnResized={(value) => this.onSavePreference(value)}
        onColumnVisible={(value) => this.onSavePreference(value)}
        onDragStopped={(value) => this.onSavePreference(value)}
        onGridReady={(value) => this.onGridReady(value)}
        {...otherProps}/>
    );
  }
}
