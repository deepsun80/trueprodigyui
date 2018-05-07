import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import * as setLinkValueActions from '../../actions/constants';
import * as roleActions from '../../actions/roles';
import * as moduleActions from '../../actions/module';
import RoleGrid from './RoleGrid';
import selector from './selector';
import ContentToolbar from '../_components/contentToolbar';
import ContentHeader from '../_components/contentHeader';
import ModuleDisplay from '../_components/moduleDisplay';

require('./index.scss');

@connect(selector, (dispatch) => ({
  setLinkValue: bindActionCreators(setLinkValueActions.setLinkValue, dispatch),
  fetchRoleData: bindActionCreators(roleActions.fetchRoleData, dispatch),
  addRole: bindActionCreators(roleActions.addRole, dispatch),
  fetchModuleData: bindActionCreators(moduleActions.fetchModuleData, dispatch)
}))

@reduxForm({
  form: 'addRole',
  destroyOnUnmount: true
})

export default class RoleMaintenance extends Component {
  static propTypes = {
    addRole: PropTypes.func.isRequired,
    fetchModuleData: PropTypes.func.isRequired,
    fetchRoleData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    linkValue: PropTypes.any,
    moduleId: PropTypes.number.isRequired,
    setLinkValue: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      module: null
    };
    this.submit = this.submit.bind(this);
  }

  async componentDidMount () {
    const { setLinkValue, fetchRoleData, fetchModuleData } = this.props;
    setLinkValue(this.props.moduleId);
    await fetchModuleData();
    await fetchRoleData(this.props.moduleId);
  }

  async submit (values) {
    await this.props.addRole({ moduleID: this.props.moduleId, role: values.toJS().role });
  }

  render () {
    return (
          <div>
            <ContentHeader title='Role Maintenance'/>
            <ModuleDisplay />
            <div style={{ marginTop: 10 }}>
                <ContentToolbar>
                    <div className='header'>ADD A ROLE</div>
                    <Field
                      className='field-style'
                      component='input'
                      name='role'
                      type='text'/>
                    <button className='btn btn-primary button' onClick={this.props.handleSubmit(this.submit)}>
                        CREATE
                    </button>
                </ContentToolbar>
                <RoleGrid moduleId={this.props.moduleId}/>
            </div>
          </div>
        );
  }
}
