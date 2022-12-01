import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Menu from '../index';
import filterChildren from '../../../utils/Children/filterChildren';
import { RETURN_KEY_CODE } from '../../../utils/Browser/keyCodes';

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.closeMainMenu = this.closeMainMenu.bind(this);
  }

  componentDidUpdate() {
    const {
      position,
      index,
    } = this.props;

    if (position === index) {
      this.menuItemDOM.focus();
    }
  }

  onClick() {
    const { menuItems, subItemParent } = this.props;

    this.props.onClick();

    this.menuItemDOM.blur();

    if (_.isEmpty(menuItems) && this.props.onClick !== _.noop) {
      this.closeMainMenu();
    }

    if (subItemParent) {
      this.props.closeMainMenu();
    }

    this.props.handleParentMenuonClick();
  }

  closeMainMenu() {
    this.props.togglePopover();
  }

  render() {
    const {
      id,
      className,
      primaryNode,
      index,
      position,
      children,
      menuItems,
      subMenuPosition,
      subMenuTarget,
      onKeyDown,
      handleMenuItemNavigation,
      subItemParent,
      closeMainMenu,
      onClick,
      handleParentMenuonClick,
    } = this.props;

    const menuItemClass = () => classNames({
      'ui-menu-item': true,
      'ui-menu-item--hovered': index === position,
      'ui-menu-item--disabled': onClick === _.noop && _.isEmpty(menuItems),
    }, className);

    const submenuItemClass = () => classNames({
      'ui-sub-menu-items': true,
      'ui-sub-menu-items--hovered': index === position,
    });

    const newChildren = filterChildren(children);

    if (!_.isEmpty(menuItems)) {
      return (
        <Menu
          className={submenuItemClass()}
          anchorElement={
            <div
              id={id}
              role="button"
              tabIndex={0}
              className={menuItemClass()}
              onClick={handleParentMenuonClick}
              onKeyDown={(e) => {
                onKeyDown(e);
                handleMenuItemNavigation(e);
              }}
              onMouseEnter={() => this.props.setPosition(index)}
              ref={(menuItemDOM) => { this.menuItemDOM = menuItemDOM; }}
            >
              {primaryNode}
              {newChildren}
            </div>
          }
          position={subMenuPosition}
          target={subMenuTarget}
          subItemParent
          closeMainMenu={this.closeMainMenu}
        >
          {
            _.map(menuItems, menuItem => menuItem)
          }
        </Menu>
      );
    }

    return (
      <div
        id={id}
        role="button"
        tabIndex={0}
        className={menuItemClass()}
        onClick={this.onClick}
        onKeyDown={(e) => {
          if (e.keyCode === RETURN_KEY_CODE) {
            this.closeMainMenu();
            if (subItemParent) {
              closeMainMenu();
            }
          }

          onKeyDown(e);
          handleMenuItemNavigation(e);
        }}
        onMouseEnter={() => this.props.setPosition(index)}
        ref={(menuItemDOM) => { this.menuItemDOM = menuItemDOM; }}
      >
        {primaryNode}
        {children}
      </div>
    );
  }
}

MenuItem.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** node for the menuItem */
  primaryNode: PropTypes.node,
  /** Callback function when clicked */
  onClick: PropTypes.func,
  /** Callback function from app-client with route when enter key is pressed down */
  onKeyDown: PropTypes.func,
  /** Callback function handling the keydown from the Menu parent handling arrow, tab and return navigation */
  handleMenuItemNavigation: PropTypes.func,
  /** Handles onClick from the Parent Menu Component */
  handleParentMenuonClick: PropTypes.func,
  /** array of MenuItems that will act as subItems */
  menuItems: PropTypes.array,
  /** position of the submenu list (if exist), will default to left-start */
  subMenuPosition: PropTypes.oneOf([
    'right-start',
    'right-end',
    'left-start',
    'left-end',
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
  ]),
  subMenuTarget: PropTypes.oneOf([
    'top-bottom',
    'bottom-top',
    'right-left',
    'left-right',
  ]),
  /**
   * If true, MenuItem will act as parent of Menu
   * @ignore
   */
  subItemParent: PropTypes.bool,
  /**
   * Prop function received from Menu to set the position
   * @ignore
   */
  setPosition: PropTypes.func,
  /**
   * Prop position to compare index to current position
   * @ignore
   */
  position: PropTypes.number,
  /**
   * Prop function received from Menu to toggle popover (MainMenu)
   * @ignore
   */
  togglePopover: PropTypes.func,
  /**
   *    * Prop function receieved from Menu to close both Main and subMenu
   * @ignore
   */
  closeMainMenu: PropTypes.func,
  /**
   * index position props inside the Menu
   * @ignore
   */
  index: PropTypes.number,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node.isRequired,
};

MenuItem.defaultProps = {
  id: '',
  className: '',
  position: 0,
  index: null,
  setPosition: _.noop,
  children: [],
  menuItems: [],
  primaryNode: [],
  onClick: _.noop,
  onKeyDown: _.noop,
  handleMenuItemNavigation: _.noop,
  handleParentMenuonClick: _.noop,
  subItemParent: false,
  subMenuPosition: 'left-start',
  subMenuTarget: 'top-bottom',
  closeMainMenu: _.noop,
  togglePopover: _.noop,
};


export default MenuItem;
