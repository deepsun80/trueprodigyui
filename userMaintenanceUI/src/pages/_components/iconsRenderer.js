/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import './iconsRenderer.scss';
export default class IconRenderer extends Component {
  static propTypes = {
    data: PropTypes.any,
    icons: PropTypes.any,
    value: PropTypes.any
  };

  render () {
    const { icons, value, data } = this.props;
    return (
      <div className='ag-grid-action-container'>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {icons.map((component, index) => (
            <a key={index} style={{ cursor: 'pointer' }} onClick={() => component.onClick(value)}>
              <i className={`icon ${component.getIcon ? component.getIcon(data.defaultVersion) : component.icon}`} style={component.style}/>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
