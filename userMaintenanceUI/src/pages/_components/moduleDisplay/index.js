import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../../../actions/global';
import * as setLinkValueActions from '../../../actions/constants';
import selector from './selector';

require('./index.scss');

const appraisalLogo = require('../../../assets/images/true-prodigy-logo-Appraisal.png');
const equiFinderLogo = require('../../../assets/images/true-prodigy-logo-Equifinder.png');
const mraLogo = require('../../../assets/images/true-prodigy-logo-MRA.png');
const analyticsLogo = require('../../../assets/images/true-prodigy-logo-Analytics.png');
const biLogo = require('../../../assets/images/true-prodigy-logo-BI.png');

@connect(selector, (dispatch) => ({
  routerPushWithReturnTo: bindActionCreators(globalActions.routerPushWithReturnTo, dispatch),
  setLinkValue: bindActionCreators(setLinkValueActions.setLinkValue, dispatch)
}))

export default class ModuleDisplay extends Component {
  static propTypes = {
    moduleSelect: PropTypes.any,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    setLinkValue: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  async handleSetLinkEquityFinder (event, modulelink) {
    const { routerPushWithReturnTo, setLinkValue } = this.props;
    event.preventDefault();
    await setLinkValue(modulelink);
    routerPushWithReturnTo('/role-maintenance/equityfinder');
  }

  async handleSetLinkAppraisal (event, modulelink) {
    const { routerPushWithReturnTo, setLinkValue } = this.props;
    event.preventDefault();
    await setLinkValue(modulelink);
    routerPushWithReturnTo('/role-maintenance/appraisal');
  }

  async handleSetLinkAnalytics (event, modulelink) {
    const { routerPushWithReturnTo, setLinkValue } = this.props;
    event.preventDefault();
    await setLinkValue(modulelink);
    routerPushWithReturnTo('/role-maintenance/analytics');
  }

  async handleSetLinkMRA (event, modulelink) {
    const { routerPushWithReturnTo, setLinkValue } = this.props;
    event.preventDefault();
    await setLinkValue(modulelink);
    routerPushWithReturnTo('/role-maintenance/mra');
  }

  async handleSetLinkBI (event, modulelink) {
    const { routerPushWithReturnTo, setLinkValue } = this.props;
    event.preventDefault();
    await setLinkValue(modulelink);
    routerPushWithReturnTo('/role-maintenance/bi');
  }

  render () {
    const { moduleSelect } = this.props;
    switch (moduleSelect.linkValue) {
      case (5):
        return (
                    <div className='module-display'>
                        <p>CHOOSE MODULE</p>
                        <div className='module-list'>
                            <a onClick={(event) => this.handleSetLinkEquityFinder(event, 5)}><img className='module-logo-large' src={equiFinderLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAppraisal(event, 13)}><img className='module-logo' src={appraisalLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAnalytics(event, 3)}><img className='module-logo' src={analyticsLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkMRA(event, 4)}><img className='module-logo' src={mraLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkBI(event, 2)}><img className='module-logo' src={biLogo} /></a>
                        </div>
                    </div>
                );
      case (13):
        return (
                    <div className='module-display'>
                        <p>CHOOSE MODULE</p>
                        <div className='module-list'>
                            <a onClick={(event) => this.handleSetLinkEquityFinder(event, 5)}><img className='module-logo' src={equiFinderLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAppraisal(event, 13)}><img className='module-logo-large' src={appraisalLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAnalytics(event, 3)}><img className='module-logo' src={analyticsLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkMRA(event, 4)}><img className='module-logo' src={mraLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkBI(event, 2)}><img className='module-logo' src={biLogo} /></a>
                        </div>
                    </div>
                );
      case (3):
        return (
                    <div className='module-display'>
                        <p>CHOOSE MODULE</p>
                        <div className='module-list'>
                            <a onClick={(event) => this.handleSetLinkEquityFinder(event, 5)}><img className='module-logo' src={equiFinderLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAppraisal(event, 13)}><img className='module-logo' src={appraisalLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAnalytics(event, 3)}><img className='module-logo-large' src={analyticsLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkMRA(event, 4)}><img className='module-logo' src={mraLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkBI(event, 2)}><img className='module-logo' src={biLogo} /></a>
                        </div>
                    </div>
                );
      case (4):
        return (
                    <div className='module-display'>
                        <p>CHOOSE MODULE</p>
                        <div className='module-list'>
                            <a onClick={(event) => this.handleSetLinkEquityFinder(event, 5)}><img className='module-logo' src={equiFinderLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAppraisal(event, 13)}><img className='module-logo' src={appraisalLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAnalytics(event, 3)}><img className='module-logo' src={analyticsLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkMRA(event, 4)}><img className='module-logo-large' src={mraLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkBI(event, 2)}><img className='module-logo' src={biLogo} /></a>
                        </div>
                    </div>
                );
      case (2):
        return (
                    <div className='module-display'>
                        <p>CHOOSE MODULE</p>
                        <div className='module-list'>
                            <a onClick={(event) => this.handleSetLinkEquityFinder(event, 5)}><img className='module-logo' src={equiFinderLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAppraisal(event, 13)}><img className='module-logo' src={appraisalLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAnalytics(event, 3)}><img className='module-logo' src={analyticsLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkMRA(event, 4)}><img className='module-logo' src={mraLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkBI(event, 2)}><img className='module-logo-large' src={biLogo} /></a>
                        </div>
                    </div>
                );
      default:
        return (
                    <div className='module-display'>
                        <p>CHOOSE MODULE</p>
                        <div className='module-list'>
                            <a onClick={(event) => this.handleSetLink(event, 5)}><img className='module-logo' src={equiFinderLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkEquityFinder(event, 13)}><img className='module-logo' src={appraisalLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkAnalytics(event, 3)}><img className='module-logo' src={analyticsLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkMRA(event, 4)}><img className='module-logo' src={mraLogo} /></a>
                            <a onClick={(event) => this.handleSetLinkBI(event, 2)}><img className='module-logo' src={biLogo} /></a>
                        </div>
                    </div>
                );
    }
  }
}
