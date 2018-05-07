/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as toastActions from '../../actions/toast';
import { routerPushWithReturnTo } from '../../actions/global';
import toastSelector from '../../selectors/toast';

@connect(null, (dispatch) => ({
  popToast: bindActionCreators(toastActions.pop, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@Radium
export class ErrorMessage extends Component {

  static propTypes = {
    entity: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    popToast: PropTypes.func.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired
  };

  async redirect (url) {
    await this.props.routerPushWithReturnTo(url);
    await this.props.popToast();
  }

  static styles = {
    clickable: {
      cursor: 'pointer',
      fontSize: '12px',
      ':hover': {
        textDecoration: 'underline'
      }
    }
  };

  render () {
    const { entity } = this.props;
    return (
      <div>
        <h4 style={{ color: 'white', marginTop: 0 }}><strong>{entity}</strong></h4>
        <span>Error occured !!!  in {entity}</span>
      </div>
    );
  }
}

@connect(null, (dispatch) => ({
  popToast: bindActionCreators(toastActions.pop, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@Radium
export class SuccessMessage extends Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
    popToast: PropTypes.func.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired
  };

  async redirect (url) {
    await this.props.routerPushWithReturnTo(url);
    await this.props.popToast();
  }

  static styles = {
    clickable: {
      cursor: 'pointer',
      fontSize: '12px',
      color: 'green',
      ':hover': {
        textDecoration: 'underline'
      }
    }
  };

  render () {
    const { message } = this.props;
    return <span>SUCCESS!!! {message}</span>;
  }
}

@connect(toastSelector, (dispatch) => ({
  popToast: bindActionCreators(toastActions.pop, dispatch)
}))
@Radium
export default class Toast extends Component {

  static propTypes = {
    currentToast: ImmutablePropTypes.map,
    popToast: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { transition: false };
  }

  componentWillReceiveProps (nextProps, nextState) {
    // We received a new toast, let's timeout
    if (nextProps.currentToast) {
      // next tick we need to set the transition on true, otherwise there
      // will be no transition.
      setTimeout(() => {
        this.setState({ transition: true });
        setTimeout(() => {
          this.setState({ transition: false });
        }, 4000);
        setTimeout(() => {
          this.props.popToast();
        }, 4250);
      }, 0);
    }
  }

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: 380,
      position: 'fixed',
      transition: 'top 0.25s ease-in, opacity 0.25s ease-in',
      right: 40,
      top: -100,
      opacity: 0,
      minHeight: 60, // Matches the flex-basis in icon.base style
      zIndex: 10000,
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)'
    },
    textContainer: {
      display: 'flex',
      padding: '13px 13px 13px 19px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '2px',
      justifyContent: 'space-between'
    },
    errorContainer: {
      backgroundColor: '#e74c3c',
      color: 'white'
    },
    successContainer: {
      backgroundColor: '#069dd8',
      color: 'white'
    },
    transition: {
      top: 40,
      opacity: 1,
      transition: 'top 0.25s ease-out, opacity 0.25s ease-in'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentToast } = this.props;

    // Render empty if there is no toast to show
    if (!currentToast) {
      return (
        <div />
      );
    }
    // Visualize the toast
    const type = currentToast.get('type');
    const message = currentToast.get('message');
    const error = currentToast.get('error');
    const entity = currentToast.get('entity');
    return (
      <div key='toastContainer' style={[ styles.container, this.state.transition && styles.transition ]}>
        <div style={[ styles.textContainer, type === 'error' && styles.errorContainer, type === 'success' && styles.successContainer ]}>
          <div>
            { type === 'error' && <ErrorMessage entity={entity} error={error} /> }
            { type === 'success' && <SuccessMessage message={message}/> }
          </div>
          <a className='clickable' onClick={this.props.popToast}><i className='icon fa-close' /></a>
        </div>
      </div>
    );
  }

}
