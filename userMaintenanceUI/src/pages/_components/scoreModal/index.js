import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as propertyActions from '../../../actions/property';
import * as modalActions from '../../../actions/modal';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import selector from './selector';

@connect(selector, (dispatch) => ({
  fetchCompScore: bindActionCreators(propertyActions.fetchCompScore, dispatch),
  closeScoreModal: bindActionCreators(modalActions.closeScoreModal, dispatch)
}))
export default class ScoreModal extends Component {
  static propTypes = {
    closeScoreModal: PropTypes.func.isRequired,
    fetchCompScore: PropTypes.func.isRequired,
    fields: PropTypes.any,
    modal: ImmutablePropTypes.map
  };

  constructor (props) {
    super(props);
    this.state = {
      response: {}
    };
  }

  componentDidMount () {
    const { modal } = this.props;
    const data = modal.toJS().values;
    this.fetchData(data.propertyId, data.comPropId);
  }

  componentWillReceiveProps (nextProps) {
    const { modal } = this.props;
    const data = modal.toJS().values;
    const nextData = nextProps.modal.toJS().values;
    if (data.propertyId !== nextData.propertyId || data.compPropertyId !== nextData.compPropertyId) {
      this.fetchData(nextData.propertyId, nextData.compPropertyId);
    }
  }

  async fetchData (propertyId, compPropertyId) {
    const { fetchCompScore } = this.props;
    if (propertyId && compPropertyId) {
      const response = await fetchCompScore({ propertyId, compPropertyId });
      this.setState({ response: response.results.score });
    }
  }

  buildCompColumnDefs () {
    return [
      { headerName: 'Field', field: 'field' },
      { headerName: 'Subject', field: 'subject' },
      { headerName: 'Comp', field: 'comp' }
    ];
  }

  buildCompRowData (compData, subjectData) {
    const { fields } = this.props;
    const availableFields = fields.toJS();
    return availableFields.map((field) => ({
      field: field.displayName,
      subject: subjectData[field.id],
      comp: compData[field.id]
    }));
  }

  buildRuleScoringColumnDefs () {
    return [
      { headerName: 'Rule', field: 'rule' },
      { headerName: 'Score', field: 'score' }
    ];
  }

  buildRuleScoringRowData (ruleScoringData) {
    return Object.keys(ruleScoringData).map((field) => ({
      rule: field,
      score: ruleScoringData[field]
    }));
  }

  onGridReady () {

  }

  render () {
    const { modal, closeScoreModal } = this.props;
    const { response } = this.state;
    const modalStyle = {
      content: {
        padding: 0,
        top: '80px',
        left: '50%',
        bottom: '80px',
        width: '1130px',
        transform: 'translateX(-50%)'
      }
    };
    return (
      <ReactModal isOpen={modal.get('openState')} style={modalStyle} onRequestClose={closeScoreModal}>
        <div className='score-container'>
        {
          response.comp && response.subject && response.score.ruleScoring &&
          <div className='comparison-container'>
            <div className='list-table'>
              <div className='content-header'>Property Comparison</div>
              <div className='ag-fresh'>
                <AgGridReact
                  columnDefs={this.buildCompColumnDefs()}
                  rowData={this.buildCompRowData(response.comp, response.subject)}
                  onGridReady={(value) => this.onGridReady(value)}/>
              </div>
            </div>
            <div className='list-table'>
              <div className='content-header'>Rule Scoring</div>
              <div className='ag-fresh'>
                <AgGridReact
                  columnDefs={this.buildRuleScoringColumnDefs()}
                  rowData={this.buildRuleScoringRowData(response.score.ruleScoring)}
                  onGridReady={(value) => this.onGridReady(value)}/>
              </div>
            </div>
          </div>
        }
        {
          response.score &&
          <div className='category-wrapper'>
            <div className='content-header'>Category Scoring</div>
            <div className='category-container'>
              <div className='category'>
                <h1>{response.score.categoryScore.appraisalmethod}</h1>
                <span> APPRAISAL METHOD</span>
              </div>
              <div className='category'>
                <h1>{response.score.categoryScore.characteristics}</h1>
                <span>CHARACTERISTICS</span>
              </div>
              <div className='category'>
                <h1>{response.score.categoryScore.income}</h1>
                <span>INCOME</span>
              </div>
              <div className='category'>
                <h1>{response.score.categoryScore.total}</h1>
                <span>TOTAL</span>
              </div>
            </div>
          </div>
        }
        </div>
      </ReactModal>
    );
  }
}
