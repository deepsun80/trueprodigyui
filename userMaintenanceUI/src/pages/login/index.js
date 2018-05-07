/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Body from 'react-body-classname';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import Radium from 'radium';
import { connect } from 'react-redux';
import * as actions from '../../actions/user';
import { routerPushWithReturnTo } from '../../actions/global';

const backgroundImg = require('../../assets/images/login-image-tp.png');
require('./index.scss');

function validate (values) {
  const validationErrors = {};
  const { username, password } = values.toJS();

  const usernameError = !username;
  if (usernameError) { validationErrors.email = 'invalid'; }

  const passwordError = !password;
  if (passwordError) { validationErrors.password = 'invalid'; }
  // Done
  return validationErrors;
}

const renderField = Radium((props) => {
  return (
    <input
      autoFocus={props.autoFocus}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type}
      {...props.input} />
  );
});

@connect(null, (dispatch) => ({
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch),
  submit: bindActionCreators(actions.login, dispatch)
}))
@reduxForm({
  form: 'login',
  validate
})
@Radium
export default class Login extends Component {

  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.submit = ::this.submit;
  }

  async submit (form) {
    try {
      await this.props.submit(form.toJS());
      this.props.routerPushWithReturnTo('/');
    } catch (error) {
      if (error === 'incorrect') {
        throw new SubmissionError('incorrect information');
      }
      throw new SubmissionError('unexpected error');
    }
  }

  render () {
    const { error, handleSubmit } = this.props;

    return (
      <Body className='layout-full'>
        <div className='page page-login' style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}>
          <div className='page-content'>
            <div className='page-brand-info'>
              <div className='brand'>
                <h2 className='brand-text font-size-40'>&lt;True Prodigy&gt;</h2>
              </div>
              <p className='font-size-20'>
                SOLVING COMPLEX appraisal problems with ANALYTICS
              </p>
            </div>
            <div className='page-login-main'>
              <h3 className='font-size-24'>Sign In</h3>
              <form onSubmit={handleSubmit(this.submit)}>
                <div className='form-group'>
                  <Field className='form-control' component={renderField} name='username' placeholder='User Name' type='text'/>
                </div>
                <div className='form-group'>
                  <Field className='form-control' component={renderField} name='password' placeholder={'Password'} type='password' />
                </div>

                {error && typeof error === 'string' && <div>error</div>}
                <div className='form-group clearfix'>
                  <div className='checkbox-custom checkbox-inline checkbox-primary float-left'>
                    <input id='rememberMe' name='rememberMe' type='checkbox' />
                    <label>Remember me</label>
                  </div>
                  <a className='float-right'>Forgot password?</a>
                </div>
                <button className='btn btn-primary btn-block' type='submit' >Sign in</button>
              </form>
              <footer className='page-copyright'>
                <p>© True Prodigy Tech Solutions 2017 | <a href='https://www.trueprodigy.tech'>www.trueprodigy.tech</a></p>
                <p>ALL RIGHT RESERVED</p>
              </footer>
            </div>
          </div>
        </div>
      </Body>
    );
  }
}
