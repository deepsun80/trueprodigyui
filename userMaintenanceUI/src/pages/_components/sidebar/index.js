import React, { Component, PropTypes } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirectToLaunchPad } from '../../../client';
import * as globalActions from '../../../actions/global';
import { navMenuItems, defaultMenuItems, routesOpenState } from '../../../constants';
import selector from './selector';

require('./index.scss');

@connect(selector, (dispatch) => ({
  routerPushWithReturnTo: bindActionCreators(globalActions.routerPushWithReturnTo, dispatch)
}))
export default class Sidebar extends Component {
  static propTypes = {
    currentPath: PropTypes.string.isRequired,
    globalFormData: ImmutablePropTypes.map,
    isPlaying: PropTypes.bool.isRequired,
    prevPath: PropTypes.string.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired,
    urls: ImmutablePropTypes.map,
    userModules: ImmutablePropTypes.list
  };

  constructor (props) {
    super(props);
    this.state = {
      expanded: '',
      currentLevel: 0
    };
  }

  componentDidMount () {
    const { currentPath } = this.props;
    this.initOpenState(currentPath);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.currentPath !== nextProps.currentPath) {
      if (nextProps.prevPath) {
        return;
      }
      this.initOpenState(nextProps.currentPath);
    }
  }

  initOpenState (currentPath) {
    const pathArray = currentPath.split('/');
    if (pathArray.length > 1 && routesOpenState[pathArray[1]]) {
      this.setState({ expanded: routesOpenState[pathArray[1]] });
    }
  }

  expandToggleItem (menuItem, level, event) {
    event.preventDefault();
    event.stopPropagation();
    const { expanded, currentLevel } = this.state;
    let expandedArray = expanded.split('_');
    if (menuItem.child) {
      if (currentLevel < level) {
        expandedArray = expandedArray.slice(0, currentLevel + 1);
        expandedArray.push(menuItem.title);
        this.setState({ currentLevel: level });
      } else if (currentLevel === level) {
        if (expandedArray[expandedArray.length - 1] === menuItem.title) {
          expandedArray.pop();
        } else {
          expandedArray[currentLevel] = menuItem.title;
        }
      } else {
        expandedArray = expandedArray.slice(0, level + 1);
        if (expandedArray[level] === menuItem.title) {
          expandedArray.pop();
        } else {
          expandedArray[level] = menuItem.title;
        }
        this.setState({ currentLevel: level });
      }
      this.setState({ expanded: expandedArray.join('_') });
    }
  }

  redirect (menuItem) {
    const { routerPushWithReturnTo, urls, isPlaying } = this.props;
    if (menuItem.link) {
      if (menuItem.link === 'launchPad') {
        redirectToLaunchPad(urls.get(menuItem.link), isPlaying);
      } else {
        routerPushWithReturnTo(menuItem.link);
      }
    } else {
      console.log('redirecting~~~');
    }
  }

  currentClassName (link) {
    const { currentPath } = this.props;
    if (link === '/' && currentPath === '/') {
      return 'active';
    } else if (link && link !== '/' && currentPath.indexOf(link) !== -1) {
      return 'active';
    }
    return '';
  }

  openClassName (title) {
    const { expanded } = this.state;
    if (expanded.split('_').indexOf(title) !== -1) {
      return 'open';
    }
    return '';
  }

  removeUnvisibleItems (menuItems) {
    const { globalFormData } = this.props;
    let newMenuItems = [];
    newMenuItems = menuItems;
    if (!globalFormData || !globalFormData.getIn([ 'propertyId' ]) || !globalFormData.getIn([ 'year' ])) {
      newMenuItems = menuItems.filter((menuItem) => (menuItem.title) !== 'Subject');
    }
    return newMenuItems;
  }

  renderIcon (menuItem) {
    if (menuItem.iconClassName) {
      return <i className={`icon ${menuItem.iconClassName}`} />;
    }
    return null;
  }

  renderMenu (menuItems, level) {
    const { userModules } = this.props;
    const modules = userModules.toJS().concat(defaultMenuItems);
    const allowedMenuItems = level === 0 ? menuItems.filter((menuItem) => modules.indexOf(menuItem.title) !== -1) : menuItems;
    return (
      <ul className='site-menu-unfold'>
        {
          this.removeUnvisibleItems(allowedMenuItems).map((menuItem) => (
            <li
              className={`site-menu-item has-sub ${this.openClassName(menuItem.title)}`}
              key={menuItem.title}>
              <a className={this.currentClassName(menuItem.link)} style={{ paddingLeft: (level + 1) * 10 + 20 }} onClick={() => this.redirect(menuItem)} >
                <span className='site-menu-title'>
                  {this.renderIcon(menuItem)}
                  {menuItem.title}
                </span>
                {menuItem.child && <span className='site-menu-arrow sidebar-arrow' onClick={(event) => this.expandToggleItem(menuItem, level, event)} />}
              </a>
              {
                menuItem.child &&
                <SmoothCollapse expanded={this.state.expanded.split('_').indexOf(menuItem.title) !== -1}>
                  {
                    this.renderMenu(menuItem.child, level + 1)
                  }
                </SmoothCollapse>
              }
            </li>
          ))
        }
      </ul>
    );
  }

  render () {
    return (
      <div className='site-menubar'>
        <div className='site-menubar-body'>
          <div>
            {this.renderMenu(navMenuItems, 0)}
          </div>
        </div>
      </div>
    );
  }
}
