import React, { Component, PropTypes } from 'react';
import { simpleInputOperators, textOperators } from '../../../constants';
import Select from 'react-select';
import ReactDropdown from 'react-dropdown';
import NumberFormat from 'react-number-format';
require('./index.scss');

export default class SearchFilter extends Component {
  static propTypes = {
    input: PropTypes.object,
    searchOptions: PropTypes.any,
    searchRule: PropTypes.object,
    searchRules: PropTypes.array,
    value: PropTypes.object,
    onAddRule: PropTypes.func.isRequired,
    onRemoveAllRule: PropTypes.func.isRequired,
    onRemoveRule: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    const searchField = props.searchRules.map((rule) => rule.description)[0];
    const operator = props.searchRules.find((rule) => rule.description === searchField).operators[0];
    this.state = {
      searchField: searchField || '',
      operator: operator || '',
      multiSelectOption: [],
      simpleOption: '',
      fromOption: '',
      toOption: ''
    };
  }

  getCodes (searchField) {
    const { searchRules, searchOptions } = this.props;
    const searchRule = searchRules.find((rule) => rule.description === searchField);
    const id = searchRule ? searchRule.id : undefined;
    if (id) {
      if (searchOptions[id]) {
        return searchOptions[id].map((value) => ({
          value: value.code,
          label: value.code
        }));
      }
      return [];
    }
    return [];
  }

  getOperators (searchField) {
    const { searchRules } = this.props;
    const searchRule = searchRules.find((rule) => rule.description === searchField);
    if (searchRule) {
      return searchRule.operators;
    }
    return [];
  }

  getId (searchField) {
    const { searchRules } = this.props;
    const searchRule = searchRules.find((rule) => rule.description === searchField);
    if (searchRule) {
      return searchRule.id;
    }
    return null;
  }

  getDescription (id) {
    const { searchRules } = this.props;
    const searchRule = searchRules.find((rule) => rule.id === id);
    if (searchRule) {
      return searchRule.description;
    }
    return null;
  }

  addRule () {
    const { searchField, operator, multiSelectOption, simpleOption, fromOption, toOption } = this.state;
    const { onAddRule } = this.props;
    const rule = {};
    if (!searchField) {
      return;
    }
    if (!operator) {
      return;
    }
    rule.operator = operator;
    if (operator === 'in') {
      if (multiSelectOption.length === 0) {
        return;
      }
      rule.value = multiSelectOption.map((option) => option.value);
    } else if (operator === 'between') {
      if (!fromOption || !toOption) {
        return;
      }
      rule.beginValue = fromOption;
      rule.endValue = toOption;
    } else {
      if (!simpleOption && simpleOption !== 0) {
        return;
      }
      rule.value = simpleOption;
    }
    onAddRule(this.getId(searchField), rule);
  }

  onFieldChange (field, value) {
    if (field === 'searchField') {
      this.setState({ operator: this.getOperators(value)[0] });
    } else if (field === 'operator') {
      this.setState({
        simpleOption: '',
        fromOption: '',
        toOption: '',
        multiSelectOption: []
      });
    }
    this.setState({ [field]: value });
  }

  onKeyUp (event, type, changeOptions) {
    const { onSearch } = this.props;
    if (event.keyCode === 13) {  // press enter
      if (event.target.value && type) {
        this.addRule();
        if (changeOptions && changeOptions.length > 0) {
          changeOptions.forEach((option) => {
            if (type === 'number') {
              this.setState({ [option]: NaN });
            } else {
              this.setState({ [option]: '' });
            }
          });
        }
      } else {
        onSearch();
      }
    }
  }

  onAddRuleKeyUp (event) {
    if (event.keyCode === 13) {
      this.addRule();
    }
  }

  renderSearchRules () {
    const { searchRule, onRemoveRule } = this.props;
    let rules = Object.keys(searchRule);
    if (rules.length === 0) {
      return null;
    }
    rules = rules.filter((rule) => Boolean(searchRule[rule]));
    return (
      rules.map((rule) => (
        <div className='rule-item' key={rule}>
          {searchRule[rule] ?
            <label>
              {this.getDescription(rule)} | {searchRule[rule].operator} &nbsp;
              {searchRule[rule].operator === 'in' && searchRule[rule].value.join(', ')}
              {searchRule[rule].operator === 'between' &&
                <span>
                  <NumberFormat displayType={'text'} thousandSeparator value={parseInt(searchRule[rule].beginValue, 10)} /> &nbsp;
                  <NumberFormat displayType={'text'} thousandSeparator value={parseInt(searchRule[rule].endValue, 10)} />
                </span>}
              {(searchRule[rule].operator === '=' || searchRule[rule].operator === 'like') && searchRule[rule].value}
              {searchRule[rule].operator !== 'in' && searchRule[rule].operator !== 'between' && searchRule[rule].operator !== '=' && searchRule[rule].operator !== 'like' &&
              <NumberFormat displayType={'text'} thousandSeparator value={parseInt(searchRule[rule].value, 10)} />}
              <a style={{ marginLeft: '5px' }} onClick={() => onRemoveRule(rule)}><i className='icon fa-close' /></a>
            </label> :
            null
          }
        </div>
      ))
    );
  }

  renderClearSearchRuleButton () {
    const { searchRule, onRemoveAllRule } = this.props;
    let rules = Object.keys(searchRule);
    rules = rules.filter((rule) => Boolean(searchRule[rule]));
    if (rules.length > 0) {
      return (
        <button className='btn btn-outline btn-default btn-xs' type='button' onClick={onRemoveAllRule}><i className='icon fa-close' /> Clear All</button>
      );
    }
    return null;
  }

  render () {
    const { searchRules } = this.props;
    const { multiSelectOption, operator, searchField, simpleOption, fromOption, toOption } = this.state;
    return (
      <div className='search-filter-field'>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '150px', flexShrink: 0, marginRight: '10px' }}>
            <ReactDropdown
              options={searchRules.length > 0 ? searchRules.map((rule) => rule.description) : []}
              value={searchField}
              onChange={(val) => this.onFieldChange('searchField', val.value)} />
          </div>
          <div style={{ width: '100px', flexShrink: 0, marginRight: '10px' }}>
            {
              searchField &&
              <ReactDropdown
                options={this.getOperators(searchField)}
                value={operator}
                onChange={(val) => this.onFieldChange('operator', val.value)} />
            }
          </div>
          <div style={{ minWidth: '300px', marginRight: '10px' }}>
            {
              operator === 'in' &&
              <Select
                multi
                name='search-option'
                options={this.getCodes(searchField)}
                value={multiSelectOption}
                onChange={(val) => this.onFieldChange('multiSelectOption', val)}/>
            }
            {
              operator && simpleInputOperators.indexOf(operator) !== -1 &&   // operator is one of '=, >, <, >=, <=, like'
              <input
                className='form-control'
                style={{ width: '100%', maxWidth: 'initial' }}
                tabIndex={1}
                type={textOperators.indexOf(operator) !== -1 ? 'text' : 'number'}    // operator is text operator
                value={simpleOption}
                onChange={(event) => this.onFieldChange('simpleOption', event.target.value)}
                onKeyUp={(event) => this.onKeyUp(event, textOperators.indexOf(operator) !== -1 ? 'text' : 'number', [ 'simpleOption' ])}/>
            }
            {
              operator && operator === 'between' &&
              <div className='between-field'>
                <input
                  className='form-control'
                  placeholder='From'
                  tabIndex={1}
                  type='number'
                  value={fromOption}
                  onChange={(event) => this.onFieldChange('fromOption', event.target.value)}/>
                <div>to</div>
                <input
                  className='form-control'
                  placeholder='To'
                  tabIndex={2}
                  type='number'
                  value={toOption}
                  onChange={(event) => this.onFieldChange('toOption', event.target.value)}
                  onKeyUp={(event) => this.onKeyUp(event, 'number', [ 'fromOption', 'toOption' ])}/>
              </div>
            }
          </div>
          <div style={{ lineHeight: '30px', marginRight: '10px' }}>
            <a tabIndex={3} onClick={() => this.addRule()} onKeyUp={(event) => this.onAddRuleKeyUp(event)} ><i className='icon fa-plus' /></a>
          </div>
          <div className='filter-rule-wrapper' >
            <div>
              {this.renderSearchRules()}
            </div>
            <div>
              {this.renderClearSearchRuleButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
