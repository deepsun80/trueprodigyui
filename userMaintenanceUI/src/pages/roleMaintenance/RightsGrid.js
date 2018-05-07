import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import CustomAgGrid from '../_components/customAgGrid';
import IconsRenderer from '../_components/iconsRenderer';
import ContentToolbar from '../_components/contentToolbar';
import Dropdown from '../_components/dropDown';
import confirm from '../_components/askConfirmation';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import * as rightsActions from '../../actions/roles';
import * as globalActions from '../../actions/global';
import selector from './selector';

require('./index.scss');

@connect(selector, (dispatch) => ({
  fetchRightsData: bindActionCreators(rightsActions.fetchRightsData, dispatch),
  fetchPreference: bindActionCreators(globalActions.fetchPreference, dispatch),
  addRights: bindActionCreators(rightsActions.addRights, dispatch),
  deleteRights: bindActionCreators(rightsActions.deleteRights, dispatch)
}))

@reduxForm({
  form: 'addRights',
  destroyOnUnmount: true
})

export default class extends Component {
  static propTypes = {
    addRights: PropTypes.func.isRequired,
    deleteRights: PropTypes.func.isRequired,
    fetchPreference: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    moduleId: PropTypes.number.isRequired,
    preference: ImmutablePropTypes.map,
    rightsData: ImmutablePropTypes.list,
    rightsOptionsData: ImmutablePropTypes.list,
    roleData: ImmutablePropTypes.list,
    setLinkValue: PropTypes.any,
    setRoleIdData: PropTypes.any,
    userData: ImmutablePropTypes.map
  };

  constructor (props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async componentDidMount () {
    const { fetchPreference, userData } = this.props;
    await fetchPreference({
      userId: userData.get('id')
    });
  }

  createColumnDefs (rightsData) {
    return [
      {
        headerName: 'Action',
        field: 'userRightiD',
        width: 85,
        cellRendererFramework: IconsRenderer,
        cellRendererParams: {
          icons: [
            {
              icon: 'fa-trash',
              onClick: async (value) => {
                const result = await confirm('right');
                if (result) {
                  this.props.deleteRights({ moduleID: this.props.moduleId, roleID: this.props.setRoleIdData.roleID, userRightIDList: value });
                }
              }
            }
          ]
        }
      },
            { headerName: 'Rights', field: 'userRightDesc', width: 1216 }
    ];
  }

  createRowData (rights) {
    return rights.map((right) => ({
      userRightDesc: right.userRightDesc,
      userRightiD: right.userRightiD
    }));
  }

  async submit (values) {
    let newValue = 0;
    this.props.rightsOptionsData.toJS().forEach((object) => {
      if (values.toJS().Rights === object.userRightDesc) {
        newValue = object.userRightiD;
      }
    });
    await this.props.addRights({ moduleID: this.props.moduleId, roleID: this.props.setRoleIdData.roleID, userRightIDList: newValue });
  }

  onGridReady (params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  render () {
    const rightsData = this.props.rightsData.toJS();

    const rightsOptionsData = this.props.rightsOptionsData.toJS();

    const rightsOptionsArray = [];
    rightsOptionsData.forEach((object) => {
      rightsOptionsArray.push(object.userRightDesc);
    });

    let rightsHeader = '';
    if (rightsData.length !== 0) {
      rightsHeader = rightsData[0].role;
    }

    return (
            <div style={{ marginTop: 30 }}>
                <ContentToolbar>
                    <div>
                        <div className='header'>USER RIGHTS</div>
                        <div className='field-style' style={{ marginLeft: -10 }}>
                            <Field
                              component={Dropdown}
                              initValue={'Select User Rights to Add'}
                              name='Rights'
                              options={rightsOptionsArray}/>
                        </div>
                    </div>
                    <button className='btn btn-success button' onClick={this.props.handleSubmit(this.submit)}>
                        <i className='icon fa-plus' />
                    </button>
                </ContentToolbar>
                <div className='ag-fresh'>
                    <h5 className='headerStyle'>Role: { rightsHeader } | User Rights</h5>
                    {this.props.preference.get('data') &&
                        <CustomAgGrid
                          columnDefs={this.createColumnDefs(rightsData)}
                          enableColResize
                          enableFilter
                          enableSorting
                          name='rightsData'
                          rowData={this.createRowData(rightsData)}
                          onGridReady={this.onGridReady} />
                    }
                </div>
            </div>
        );
  }
}
