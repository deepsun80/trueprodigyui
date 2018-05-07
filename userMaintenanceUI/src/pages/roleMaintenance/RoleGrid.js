import React, { Component, PropTypes } from 'react';
import CustomAgGrid from '../_components/customAgGrid';
import IconsRenderer from '../_components/iconsRenderer';
import confirm from '../_components/askConfirmation';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/roles';
import * as globalActions from '../../actions/global';
import * as roleIDActions from '../../actions/constants';
import RightsGrid from './RightsGrid';
import selector from './selector';

import Modal from 'react-modal';

require('./index.scss');

@connect(selector, (dispatch) => ({
  deleteRole: bindActionCreators(roleActions.deleteRole, dispatch),
  editRole: bindActionCreators(roleActions.editRole, dispatch),
  fetchRightsData: bindActionCreators(roleActions.fetchRightsData, dispatch),
  fetchRightsOptionsData: bindActionCreators(roleActions.fetchRightsOptionsData, dispatch),
  fetchPreference: bindActionCreators(globalActions.fetchPreference, dispatch),
  setRoleID: bindActionCreators(roleIDActions.setRoleID, dispatch)
}))

@reduxForm({
  form: 'editRole',
  destroyOnUnmount: true
})

export default class extends Component {
  static propTypes = {
    deleteRole: PropTypes.func.isRequired,
    editRole: PropTypes.func.isRequired,
    fetchPreference: PropTypes.func.isRequired,
    fetchRightsData: PropTypes.func.isRequired,
    fetchRightsOptionsData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    moduleId: PropTypes.number.isRequired,
    preference: ImmutablePropTypes.map,
    rightsFetchState: PropTypes.string.isRequired,
    roleData: ImmutablePropTypes.list,
    setLinkValue: PropTypes.any,
    setRoleID: PropTypes.func.isRequired,
    setRoleIdData: PropTypes.any,
    userData: ImmutablePropTypes.map
  };

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      displayRights: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  async componentDidMount () {
    const { fetchPreference, userData, fetchRightsOptionsData } = this.props;
    fetchPreference({
      userId: userData.get('id')
    });
    await fetchRightsOptionsData(this.props.moduleId);
  }

  createColumnDefs (roleData) {
    return [
            { headerName: 'Action',
                field: 'roleID',
                width: 85,
                cellRendererFramework: IconsRenderer,
                cellRendererParams: {
                  icons: [
                    {
                      icon: 'fa-trash',
                      onClick: async (value) => {
                        const result = await confirm('role');
                        if (result) {
                          this.props.deleteRole({ moduleID: this.props.moduleId, roleID: value });
                        }
                      }
                    },
                    {
                      icon: 'fa-pencil',
                      onClick: async (value) => {
                        await this.props.setRoleID(value);
                        this.openModal();
                      }
                    }
                  ]
                }
            },
            { headerName: 'Role', field: 'role', width: 440 },
            { headerName: 'Created By', field: 'author', width: 435 },
            { headerName: 'Created Date', field: 'date', width: 180 },
            { headerName: 'View/Create Rights',
            field: 'roleID',
            width: 160,
            cellRendererFramework: IconsRenderer,
            cellRendererParams: {
              icons: [
                {
                  icon: 'fa-cog',
                  onClick: async (value) => {
                    await this.props.fetchRightsData({ moduleId: this.props.moduleId, roleID: value });
                    await this.props.setRoleID(value);
                    this.setState({
                      displayRights: true
                    });
                  }
                }
              ]
            }
            }
    ];
  }

  createRowData (roles) {
    return roles.map((role) => ({
      role: role.role,
      author: role.createdBy,
      date: role.inserted,
      roleID: role.roleID
    }));
  }

  closeModal () {
    this.setState({ showModal: false });
  }

  openModal () {
    this.setState({ showModal: true });
  }

  async submit (values) {
    await this.props.editRole({ moduleID: this.props.moduleId, roleID: this.props.setRoleIdData.roleID, role: values.toJS().role });
    this.closeModal();
  }

  onGridReady (params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  render () {
    const modalStyle = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#dddddd',
        padding: '20px'
      }
    };

    const roleData = this.props.roleData.toJS();
    let roleHeader = '';
    if (roleData.length !== 0) {
      roleHeader = roleData[0].module;
    }

    return (
            <div>
                <div className='ag-fresh'>
                    <h5 className='headerStyle'> { roleHeader } Roles</h5>
                    {this.props.preference.get('data') &&
                        <CustomAgGrid
                          columnDefs={this.createColumnDefs(roleData)}
                          enableColResize
                          enableFilter
                          enableSorting
                          name='roleData'
                          rowData={this.createRowData(roleData)}
                          onGridReady={this.onGridReady} />
                    }
                </div>
                {(this.props.rightsFetchState === 'loaded') && (this.state.displayRights === true) && <RightsGrid moduleId={this.props.moduleId} />}

                <Modal
                  contentLabel='Modal'
                  isOpen={this.state.showModal}
                  style={modalStyle}
                  onRequestClose={this.closeModal}>
                        <div className='modal-header'>ENTER NEW ROLE NAME</div>
                        <Field
                          className='modal-field'
                          component='input'
                          name='role'
                          type='text'/>
                        <div className='modal-buttons'>
                            <button className='btn btn-primary' onClick={this.props.handleSubmit(this.submit)}>
                                SUBMIT
                            </button>
                            <button className='btn btn-default' onClick={this.closeModal}>
                                CANCEL
                            </button>
                        </div>
                </Modal>
            </div>
        );
  }
}
