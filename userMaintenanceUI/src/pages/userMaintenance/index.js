import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import confirm from '../_components/askConfirmation';
import Dropdown from '../_components/dropDown';
import ContentToolbar from '../_components/contentToolbar';
import IconsRenderer from '../_components/iconsRenderer';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomAgGrid from '../_components/customAgGrid';
import ContentHeader from '../_components/contentHeader';
import * as globalActions from '../../actions/global';
import * as moduleActions from '../../actions/module';
import * as usersActions from '../../actions/users';
import * as rolesActions from '../../actions/roles';
import Modal from 'react-modal';
import selector from './selector';

require('./index.scss');

const appraisalLogo = require('../../assets/images/module-logo_appraisal.png');
const equiFinderLogo = require('../../assets/images/module-logo_Equifinder.png');
const mraLogo = require('../../assets/images/module-logo_mra.png');
const analyticsLogo = require('../../assets/images/module-logo_analytics.png');
const biLogo = require('../../assets/images/module-logo_bi.png');

@connect(selector, (dispatch) => ({
  fetchUsersData: bindActionCreators(usersActions.fetchUsersData, dispatch),
  fetchPreference: bindActionCreators(globalActions.fetchPreference, dispatch),
  deleteUser: bindActionCreators(usersActions.deleteUser, dispatch),
  addUser: bindActionCreators(usersActions.addUser, dispatch),
  editUserName: bindActionCreators(usersActions.editUserName, dispatch),
  addUserModule: bindActionCreators(usersActions.addUserModule, dispatch),
  deleteUserModule: bindActionCreators(usersActions.deleteUserModule, dispatch),
  deleteUserRole: bindActionCreators(usersActions.deleteUserRole, dispatch),
  fetchModuleData: bindActionCreators(moduleActions.fetchModuleData, dispatch),
  fetchUserModules: bindActionCreators(usersActions.fetchUserModules, dispatch),
  fetchUserRoles: bindActionCreators(usersActions.fetchUserRoles, dispatch),
  fetchRoleData: bindActionCreators(rolesActions.fetchRoleData, dispatch),
  addRoleUser: bindActionCreators(usersActions.addRoleUser, dispatch),
  editUser: bindActionCreators(usersActions.editUser, dispatch)
}))

@reduxForm({
  form: 'addUser',
  destroyOnUnmount: true
})

export default class UserMaintenance extends Component {
  static propTypes = {
    addRoleUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    addUserModule: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    deleteUserModule: PropTypes.func.isRequired,
    deleteUserRole: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    editUserName: PropTypes.func.isRequired,
    fetchModuleData: PropTypes.func.isRequired,
    fetchPreference: PropTypes.func.isRequired,
    fetchRoleData: PropTypes.func.isRequired,
    fetchUserModules: PropTypes.func.isRequired,
    fetchUserRoles: PropTypes.func.isRequired,
    fetchUsersData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    moduleData: ImmutablePropTypes.list,
    newUserData: ImmutablePropTypes.list,
    newUserFetchState: PropTypes.string.isRequired,
    newUserState: PropTypes.string.isRequired,
    preference: ImmutablePropTypes.map,
    roleData: ImmutablePropTypes.list,
    roleFetchState: PropTypes.string.isRequired,
    userData: ImmutablePropTypes.map,
    userModuleData: ImmutablePropTypes.list,
    userModuleState: PropTypes.string.isRequired,
    userRoleData: ImmutablePropTypes.list,
    usersData: ImmutablePropTypes.list
  };

  constructor (props) {
    super(props);
    this.state = {
      addUserModal: false,
      moduleValue: null,
      selectedModule: '',
      displayNameEdit: false,
      userModules: [],
      userModuleDisplay: false
    };
    this.addUserCloseModal = this.addUserCloseModal.bind(this);
    this.addUserOpenModal = this.addUserOpenModal.bind(this);
    this.addUserSubmit = this.addUserSubmit.bind(this);
    this.editNameSubmit = this.editNameSubmit.bind(this);
    this.addModuleSubmit = this.addModuleSubmit.bind(this);
    this.addRoleSubmit = this.addRoleSubmit.bind(this);
    this.deleteModuleSubmit = this.deleteModuleSubmit.bind(this);
    this.fetchRolesSubmit = this.fetchRolesSubmit.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
    this.createModuleRowDefs = this.createModuleRowDefs.bind(this);
  }

  async componentDidMount () {
    const { fetchUsersData, userData, fetchPreference, fetchModuleData } = this.props;
    await fetchUsersData();
    await fetchModuleData();
    fetchPreference({
      userId: userData.get('id')
    });
  }

  // ------Users Grid------------

  createUsersColDefs (usersData) {
    return [
            { headerName: 'User Actions',
                field: 'userID',
                width: 100,
                cellRendererFramework: IconsRenderer,
                cellRendererParams: {
                  icons: [
                    {
                      icon: 'fa-trash',
                      onClick: async (value) => {
                        const result = await confirm('user');
                        if (result) {
                          this.props.deleteUser({ id: value });
                        }
                      }
                    },
                    {
                      icon: 'fa-pencil',
                      onClick: async (value) => {
                        this.props.usersData.toJS().forEach((user) => {
                          if (user.id === value) {
                            this.props.editUser(user, this.props.roleData);
                            this.props.fetchUserRoles({ userID: value });
                            this.addUserOpenModal();
                          }
                        });
                      }
                    }
                  ]
                }
            },
            { headerName: 'User', field: 'user', width: 230 },
            { headerName: 'Modules', field: 'modules', width: 400 },
            { headerName: 'Roles', field: 'roles', width: 405 },
            { headerName: 'Created Date', field: 'date', width: 180 }
    ];
  }

  createUsersRowDefs (users) {
    return users.map((user) => ({
      user: user.email,
      modules: user.modules,
      roles: user.roles,
      date: user.inserted,
      userID: user.id
    }));
  }

  // -------Modules Grid----------

  createModuleColDefs (moduleData) {
    return [
            { headerName: 'Actions',
                field: 'moduleID',
                width: 70,
                cellRendererFramework: IconsRenderer,
                cellRendererParams: {
                  icons: [
                    {
                      icon: 'fa-trash',
                      onClick: async (value) => {
                        const result = await confirm('module');
                        if (result) {
                          this.deleteModuleSubmit(value);
                          if (value === 5) {
                            $('#checkbox-equifinder').prop('checked', false);
                          }
                          if (value === 13) {
                            $('#checkbox-appraisal').prop('checked', false);
                          }
                          if (value === 3) {
                            $('#checkbox-analytics').prop('checked', false);
                          }
                          if (value === 4) {
                            $('#checkbox-mra').prop('checked', false);
                          }
                          if (value === 2) {
                            $('#checkbox-bi').prop('checked', false);
                          }
                        }
                      }
                    }
                  ]
                }
            },
            { headerName: 'Add/Delete Roles',
                field: 'moduleID',
                width: 150,
                cellRendererFramework: IconsRenderer,
                cellRendererParams: {
                  icons: [
                    {
                      icon: 'fa-cog',
                      onClick: async (value) => {
                        this.fetchRolesSubmit(value);
                        this.setState({
                          userModuleDisplay: true
                        });
                      }
                    }
                  ]
                }
            },
            { headerName: 'Modules', field: 'module', width: 540 },
            { headerName: 'Created Date', field: 'date', width: 150 }
    ];
  }

  createModuleRowDefs (userModuleData) {
    return userModuleData.map((moduleObj) => {
      let setModuleId;
      switch (moduleObj.moduleID) {
        case 2:
          setModuleId = 'Prodigy BI Dashboard';
          break;
        case 3:
          setModuleId = 'Prodigy Analytics';
          break;
        case 4:
          setModuleId = 'Prodigy MRA';
          break;
        case 5:
          setModuleId = 'Prodigy Equityfinder';
          break;
        case 13:
          setModuleId = 'Prodigy Appraisal';
          break;
        default:
          setModuleId = '';
      }
      return {
        date: moduleObj.inserted,
        moduleID: moduleObj.moduleID,
        module: setModuleId
      };
    });
  }

  // -----Roles Grid-------------

  createRoleColDefs (roleData) {
    return [
            { headerName: 'Actions',
                field: 'rolemoduleID',
                width: 70,
                cellRendererFramework: IconsRenderer,
                cellRendererParams: {
                  icons: [
                    {
                      icon: 'fa-trash',
                      onClick: async (value) => {
                        const result = await confirm('role');
                        if (result) {
                          this.deleteRoleSubmit(value);
                        }
                      }
                    }
                  ]
                }
            },
            { headerName: 'Module', field: 'module', width: 360 },
            { headerName: 'Roles', field: 'roles', width: 320 },
            { headerName: 'Created Date', field: 'date', width: 150 }
    ];
  }

  createRoleRowDefs (roleData) {
    return roleData.map((roles) => ({
      module: roles.module,
      roles: roles.role,
      date: roles.inserted,
      rolemoduleID: { roleID: roles.roleID, moduleID: roles.moduleID }
    }));
  }

  // -----Modal functions---------

  addUserOpenModal () {
    this.setState({ addUserModal: true });
  }

  addUserCloseModal () {
    this.setState({ addUserModal: false });
    location.reload();
  }

  // ------Add New User Function------

  async addUserSubmit (values) {
    await this.props.addUser({ email: values.toJS().email, fullName: values.toJS().fullName });
  }

  // ------Edit User Name Function------

  async editNameSubmit (values) {
    await this.props.editUserName({ userID: this.props.newUserData.toJS()[0].id, fullName: values.toJS().fullName });
    this.setState({
      displayNameEdit: false
    });
  }

  // -------Add New Module Function-----

  async addModuleSubmit (event) {
    if (event.target.checked === true) {
      let newModuleID = 0;
      this.props.moduleData.toJS().forEach((object) => {
        if (event.target.value === object.module) {
          newModuleID = object.id;
        }
      });
      this.state.userModules.push(event.target.value);
      await this.props.addUserModule({ userID: this.props.newUserData.toJS()[0].id, moduleID: newModuleID });
    }
  }

  // -------Add New Role Function-----

  async addRoleSubmit (values) {
    let newModuleID = 0;
    let newRoleID = 0;
    this.props.roleData.toJS().forEach((object) => {
      if (values.toJS().roles === object.role) {
        newModuleID = object.moduleID;
        newRoleID = object.roleID;
      }
    });
    await this.props.addRoleUser({ userID: this.props.newUserData.toJS()[0].id, moduleID: newModuleID, roleIDList: newRoleID });
  }

  // -------Delete Functions-----------

  async deleteModuleSubmit (value) {
    await this.props.deleteUserModule({ userID: this.props.newUserData.toJS()[0].id, moduleID: value });
    let newModuleID = 0;
    this.props.moduleData.toJS().forEach((object) => {
      if (value === object.id) {
        newModuleID = object.module;
      }
    });
    const index = this.state.userModules.indexOf(newModuleID);
    if (index > -1) {
      this.state.userModules.splice(index, 1);
    }
    if (newModuleID === this.state.selectedModule) {
      this.setState({
        selectedModule: ''
      });
    }
    if (value === this.props.roleData.toJS()[0].moduleID) {
      this.setState({
        userModuleDisplay: false
      });
    }
  }

  async deleteRoleSubmit (value) {
    await this.props.deleteUserRole({ userID: this.props.newUserData.toJS()[0].id, moduleID: value.moduleID, roleID: value.roleID });
  }

  // -----User Name Change Display-------

  userNameChange () {
    this.setState({
      displayNameEdit: !this.state.displayNameEdit
    });
  }

  // --------Get Roles for Modules--------

  async fetchRolesSubmit (values) {
    await this.props.fetchRoleData(values);
    let newModule = '';
    this.props.moduleData.toJS().forEach((object) => {
      if (values === object.id) {
        newModule = object.module;
      }
    });
    this.setState({
      selectedModule: newModule
    });
  }

  onGridReady (params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  render () {
    const addUserModalStyle = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        overflow: 'auto'
      }
    };

    const addModuleModalStyle = {
      content: {
        position: 'absolute',
        top: '40px',
        left: '20%',
        right: '20%',
        bottom: '40px',
        background: '#fff',
        overflow: 'auto'
      }
    };

    const usersData = this.props.usersData.toJS();

    const moduleData = this.props.moduleData.toJS();

    const roleData = this.props.roleData.toJS();

    const userRoleData = this.props.userRoleData.toJS();

    const newUserRoleData = [];
    const flags = [];

    for (let i = 0; i < userRoleData.length; i++) {
      if (flags[userRoleData[i].role]) {
        continue;
      }
      newUserRoleData.push(userRoleData[i]);
      flags[userRoleData[i].role] = true;
    }

    const userModuleData = this.props.userModuleData.toJS();

    let moduleDataArray = [];
    moduleData.forEach((object) => {
      moduleDataArray.push(object.module);
    });

    const userModuleDataArray = [];
    userModuleData.forEach((object) => {
      userModuleDataArray.push(object.module);
    });

    let roleDataArray = [];
    roleData.forEach((object) => {
      userModuleData.forEach((module) => {
        if (module.moduleID === object.moduleID) {
          roleDataArray.push(object.role);
        }
      });
    });

    moduleDataArray = moduleDataArray.filter((module) =>
        module === 'Prodigy Equityfinder' ||
        module === 'Prodigy Appraisal' ||
        module === 'Prodigy Analytics' ||
        module === 'Prodigy MRA' ||
        module === 'Prodigy BI Dashboard'
    );

    return (
            <div>
                <ContentHeader title='User Maintenance'/>
                <ContentToolbar>
                    <button className='btn btn-primary button' style={{ marginLeft: 3 }} onClick={this.addUserOpenModal}>
                        ADD NEW USER
                    </button>
                </ContentToolbar>
                <div className='ag-fresh-grid-user'>
                    <h5 className='headerStyle'>Users</h5>
                    {this.props.preference.get('data') &&
                        <CustomAgGrid
                          columnDefs={this.createUsersColDefs(usersData)}
                          enableColResize
                          enableFilter
                          enableSorting
                          name='usersData'
                          rowData={this.createUsersRowDefs(usersData)}
                          onGridReady={this.onGridReady} />
                    }
                </div>

                {(this.props.newUserState !== 'loaded') &&
                  <Modal
                    contentLabel='addUserModal'
                    isOpen={this.state.addUserModal}
                    style={addUserModalStyle}
                    onRequestClose={this.addUserCloseModal}>
                            <form onSubmit={this.props.handleSubmit(this.addUserSubmit)}>
                                <div className='createModel-dialog'>
                                    <div className='field-row'>
                                      <label style={{ fontFamily: 'Arial', fontWeight: 400 }}> Email: </label>
                                      <div>
                                          <Field
                                            className='form-control'
                                            component='input'
                                            label='Email Address'
                                            name='email'
                                            type='email'/>
                                      </div>
                                    </div>
                                    <div className='field-row'>
                                      <label style={{ fontFamily: 'Arial', fontWeight: 400 }}>Full Name: </label>
                                      <div className='upload-field'>
                                          <Field
                                            className='form-control'
                                            component='input'
                                            label='Full Name'
                                            name='fullName'
                                            type='text'/>
                                      </div>
                                    </div>
                                    <div className='field-action'>
                                      <button className='btn btn-sm btn-basic' style={{ marginRight: 10 }} onClick={this.addUserCloseModal}>
                                        Cancel
                                    </button>
                                    <button className='btn btn-sm btn-success' type='submit' onClick={this.props.handleSubmit(this.addUserSubmit)}>
                                        Create
                                    </button>
                                  </div>
                                </div>
                          </form>
                  </Modal>
                }

                {(this.props.newUserState === 'loaded') &&
                  <Modal
                    contentLabel='addUserModal'
                    isOpen={this.state.addUserModal}
                    style={addModuleModalStyle}
                    onRequestClose={this.addUserCloseModal}>
                          <p style={{ fontSize: 18, fontFamily: 'arial', fontWeight: 700, paddingLeft: 5, color: '#55636A' }}> User Information </p>
                          <div className='blue-header'>
                            <div className='modal-header-edit'>Email: {this.props.newUserData.toJS()[0].email}</div>
                            {(this.state.displayNameEdit === false) &&
                              <div style={{ display: 'flex' }}>
                                <div className='modal-header-edit'>Full Name: {this.props.newUserData.toJS()[0].fullName}</div>
                                <a href='#'><i className='icon fa-pencil' style={{ marginLeft: 20, color: '#818E9A' }} onClick={this.userNameChange}/></a>
                              </div>
                            }
                          {(this.state.displayNameEdit === true) &&
                            <div style={{ display: 'flex', marginLeft: 15 }}>
                                <Field
                                  className='modal-field form-control'
                                  component='input'
                                  label='Full Name'
                                  name='fullName'
                                  type='text'/>
                              <div style={{ marginTop: -5 }}>
                                <button className='btn btn-primary btn-sm modal-button' type='submit' onClick={this.props.handleSubmit(this.editNameSubmit)}>
                                  SUBMIT
                                </button>
                                <button className='btn btn-basic btn-sm modal-button' onClick={this.userNameChange}>
                                  CANCEL
                                </button>
                              </div>
                            </div>
                          }
                          </div>
                            <p style={{ fontSize: 16, fontFamily: 'arial', fontWeight: 700, paddingLeft: 5, paddingTop: 10, color: '#55636A' }}> Choose a Module </p>
                            <form style={{ marginLeft: 5 }}>
                              <input id='checkbox-equifinder' type='checkbox' value='Prodigy Equityfinder' onChange={this.addModuleSubmit}/><img src={equiFinderLogo} style={{ marginLeft: 6, marginRight: 25 }} width='15%'/>
                              <input id='checkbox-appraisal' type='checkbox' value='Prodigy Appraisal' onChange={this.addModuleSubmit}/><img src={appraisalLogo} style={{ marginLeft: 6, marginRight: 25 }} width='15%'/>
                              <input id='checkbox-analytics' type='checkbox' value='Prodigy Analytics' onChange={this.addModuleSubmit}/><img src={analyticsLogo} style={{ marginLeft: 6, marginRight: 25 }} width='15%'/>
                              <input id='checkbox-mra' type='checkbox' value='Prodigy MRA' onChange={this.addModuleSubmit}/><img src={mraLogo} style={{ marginLeft: 6, marginRight: 25 }} width='15%'/>
                              <input id='checkbox-bi' type='checkbox' value='Prodigy BI Dashboard' onChange={this.addModuleSubmit}/><img src={biLogo} style={{ marginLeft: 6, marginRight: 25 }} width='15%'/>
                            </form>
                           {(this.props.userModuleState === 'loaded') &&
                            <div>
                              <p style={{ fontSize: 16, fontFamily: 'arial', fontWeight: 700, paddingLeft: 5, paddingTop: 10, color: '#55636A' }}> Assigned User Modules </p>
                              <div className='ag-fresh-grid-module'>
                                    <CustomAgGrid
                                      columnDefs={this.createModuleColDefs(userModuleData)}
                                      enableColResize
                                      enableFilter
                                      enableSorting
                                      name='moduleData'
                                      rowData={this.createModuleRowDefs(userModuleData)}
                                      onGridReady={this.onGridReady} />
                              </div>
                            </div>
                          }
                          {(this.state.userModuleDisplay === true && this.props.roleFetchState === 'loaded') &&
                            <div>
                              <div className='blue-header-bottom'>
                                <div>
                                    <div className='header' style={{ paddingTop: 7, color: '#55636A' }}>{this.state.selectedModule.toUpperCase()} ROLES </div>
                                </div>
                                  <div className='modal-field'>
                                    <Field
                                      component={Dropdown}
                                      initValue={'Select Role to Add to User'}
                                      name='roles'
                                      options={roleDataArray}/>
                                  </div>
                                  <button className='btn btn-success modal-button' type='submit' onClick={this.props.handleSubmit(this.addRoleSubmit)}>
                                    <i className='icon fa-plus' />
                                  </button>
                              </div>
                                <p style={{ fontSize: 16, fontFamily: 'arial', fontWeight: 700, paddingLeft: 5, paddingTop: 10 }}> Assigned User Roles </p>
                                <div className='ag-fresh-grid-module'>
                                    <CustomAgGrid
                                      columnDefs={this.createRoleColDefs(newUserRoleData)}
                                      enableColResize
                                      enableFilter
                                      enableSorting
                                      name='roleData'
                                      rowData={this.createRoleRowDefs(newUserRoleData)}
                                      onGridReady={this.onGridReady} />
                                </div>
                                <button className='btn btn-primary btn-lg' style={{ position: 'relative', left: 800 }} type='submit' onClick={this.addUserCloseModal}>
                                    SAVE
                                </button>
                            </div>
                          }
                  </Modal>
                  }
            </div>
        );
  }
}
