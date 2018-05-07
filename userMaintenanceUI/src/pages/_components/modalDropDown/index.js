import React, { Component, PropTypes } from 'react';
import outsideClick from 'react-click-outside';
import ReactDropdown from 'react-dropdown';
require('./index.scss');

@outsideClick
export default class ModalDropDown extends Component {
  static propTypes = {
    actionTitle: PropTypes.string,
    children: PropTypes.any,
    label: PropTypes.any,
    years: PropTypes.any,
    onAdd: PropTypes.func,
    onCopy: PropTypes.func,
    onImport: PropTypes.func,
    onLoad: PropTypes.func,
    onOpenCompSelector: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      masterPropID: '',
      loadPropID: '',
      addPropID: '',
      open: false,
      propID: '',
      year: ''
    };
  }

  componentDidMount () {
    const { years } = this.props;
    if (years.length > 0) {
      this.setState({
        year: {
          value: years[0],
          label: years[0]
        }
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    const { years } = this.props;
    if (years.length !== nextProps.years.length) {
      this.setState({
        year: {
          value: nextProps.years[0],
          label: nextProps.years[0]
        }
      });
    }
  }

  handleClickOutside () {
    this.setState({ open: false });
  }

  onToggle () {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  onPropIDChange (propID) {
    this.setState({ propID });
  }

  onAddPropIDChange (addPropID) {
    this.setState({ addPropID });
  }

  onMasterPropIDChange (masterPropID) {
    this.setState({ masterPropID });
  }

  onLoadPropIDChange (loadPropID) {
    this.setState({ loadPropID });
  }

  onYearChange (year) {
    this.setState({ year });
  }

  async onPropIDKeyUP (e) {
    const { year } = this.state;
    if (e.keyCode === 13 && e.target.value) {
      this.onCopy(e.target.value, year.value);
    }
  }

  async onCopy (propertyId, year) {
    const { onCopy } = this.props;
    if (!propertyId || !year) {
      return;
    }
    await onCopy(propertyId, year);
    this.setState({ propID: '' });
  }

  async onAdd (e) {
    const { onAdd } = this.props;
    if (e.keyCode === 13 && e.target.value) {
      await onAdd(e.target.value);
      this.setState({ addPropID: '' });
    }
  }

  async onMasterPropIDKeyUP (e) {
    if (e.keyCode === 13 && e.target.value) {
      this.onImport(e.target.value);
    }
  }

  async onImport (masterPropID) {
    const { onImport } = this.props;
    if (!masterPropID) {
      return;
    }
    await onImport(masterPropID);
    this.setState({ masterPropID: '' });
  }

  async onLoadPropIDKeyUP (e) {
    if (e.keyCode === 13 && e.target.value) {
      this.onLoad(e.target.value);
    }
  }

  async onLoad (loadPropID) {
    const { onLoad } = this.props;
    if (!loadPropID) {
      return;
    }
    await onLoad(loadPropID);
    this.setState({ loadPropID: '' });
  }

  render () {
    const { actionTitle, children, label, years, onCopy, onAdd, onOpenCompSelector, onImport, onLoad } = this.props;
    const { open, propID, year, masterPropID, loadPropID, addPropID } = this.state;
    return (
      <div className='master-control-container'>
        <span className='title-container'>
          {actionTitle}
          <a className='main-icon' onClick={() => this.onToggle()}>
            {label}
          </a>
        </span>
        {
          open &&
            <div className='master-control-content'>
              {
                onAdd &&
                <div className='master-control-item'>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <input
                      className='form-control'
                      placeholder='Prop ID'
                      style={{ marginRight: '2px' }}
                      value={addPropID}
                      onChange={(e) => this.onAddPropIDChange(e.target.value)}
                      onKeyUp={(e) => this.onAdd(e)} />
                  </div>
                </div>
              }
              {
                onCopy &&
                <div className='master-control-item'>
                  <a onClick={() => this.onCopy(propID, year.value)}>
                    <i className='icon fa-window-restore' />
                    Copy from
                  </a>
                  <div style={{ display: 'flex' }}>
                    <input
                      className='form-control'
                      placeholder='Prop ID'
                      style={{ marginRight: '2px' }}
                      value={propID}
                      onChange={(e) => this.onPropIDChange(e.target.value)}
                      onKeyUp={(e) => this.onPropIDKeyUP(e)}/>
                    <ReactDropdown
                      options={years}
                      value={year}
                      onChange={(val) => this.onYearChange(val)} />
                  </div>
                </div>
              }
              {
                onOpenCompSelector &&
                <div className='master-control-item'>
                  <a onClick={onOpenCompSelector}>
                    <i className='icon fa-search' />
                    Comp Selector
                  </a>
                </div>
              }
              {
                onImport &&
                <div className='master-control-item'>
                  <a onClick={(e) => this.onImport(masterPropID)}>
                    <i className='icon fa-cloud-upload' />
                    Import Master List
                  </a>
                  <div>
                    <input
                      className='form-control'
                      placeholder='Prop ID'
                      style={{ marginRight: '2px' }}
                      value={masterPropID}
                      onChange={(e) => this.onMasterPropIDChange(e.target.value)}
                      onKeyUp={(e) => this.onMasterPropIDKeyUP(e)}/>
                  </div>
                </div>
              }
              {
                onLoad &&
                <div className='master-control-item'>
                  <a onClick={(e) => this.onLoad(loadPropID)}>
                    <i className='icon fa-list' />
                    Load Last Year Comps
                  </a>
                  <div>
                    <input
                      className='form-control'
                      placeholder='Prop ID'
                      style={{ marginRight: '2px' }}
                      value={loadPropID}
                      onChange={(e) => this.onLoadPropIDChange(e.target.value)}
                      onKeyUp={(e) => this.onLoadPropIDKeyUP(e)}/>
                  </div>
                </div>
              }
              {children}
            </div>
        }
      </div>
    );
  }
}
