import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import filterChildren from '../../utils/Children/filterChildren';
import {
  DOWN_ARROW_KEY_CODE,
  ESC_KEY_CODE,
  RETURN_KEY_CODE,
  SPACEBAR_KEY_CODE,
  TAB_KEY_CODE,
  UP_ARROW_KEY_CODE,
} from '../../utils/Browser/keyCodes';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      isOpen: false,
      menuItemLength: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.onDocumentFocus = this.onDocumentFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setPositionOnKeyDown = this.setPositionOnKeyDown.bind(this);
    this.setMenuItemLength = this.setMenuItemLength.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onDocumentKeyDown, false);
    document.addEventListener('click', this.handleClick, false);
    window.addEventListener('focus', this.onDocumentFocus, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    document.removeEventListener('click', this.handleClick);
    window.removeEventListener('focus', this.onDocumentFocus);
  }

  onDocumentFocus(event) {
    const isWindowEvent = event.target.console;
    const clickedOutsideOfMenuDom = event.target && !isWindowEvent && this.menuDom && !this.menuDom.contains(event.target);
    if (this.state.isOpen && clickedOutsideOfMenuDom) {
      this.setState({ isOpen: false, position: 0 });
    }
  }

  onDocumentKeyDown(event) {
    if (event.keyCode === ESC_KEY_CODE && this.state.isOpen) {
      event.preventDefault();
      this.setState({ isOpen: false, position: 0 });
    }
  }

  onKeyDown(event) {
    this.props.keyHandler(event);

    if ((event.keyCode === RETURN_KEY_CODE || event.keyCode === SPACEBAR_KEY_CODE) && !this.state.isOpen) {
      return this.togglePopover();
    }

    return this.setPositionOnKeyDown(event);
  }


  setPositionOnKeyDown(event) {
    const menuItemLength = this.state.menuItemLength || filterChildren(this.props.children).length;
    const isLastMenuItem = this.state.position === (menuItemLength - 1);

    if (event.keyCode === TAB_KEY_CODE && this.state.isOpen && menuItemLength > 0 && !isLastMenuItem) {
      event.preventDefault();
      this.setState({ position: this.state.position + 1 });
      return true;
    }

    if (event.keyCode === DOWN_ARROW_KEY_CODE && this.state.isOpen) {
      event.preventDefault();
      this.setState({ position: (this.state.position + 1) % menuItemLength });
      return true;
    }

    if (event.keyCode === UP_ARROW_KEY_CODE && this.state.isOpen) {
      event.preventDefault();
      this.setState(this.state.position === 0 ? { position: menuItemLength - 1 } : { position: this.state.position - 1 });
      return true;
    }

    return false;
  }

  setPosition(position) {
    this.setState({ position });
  }

  setMenuItemLength(count) {
    this.setState({ menuItemLength: count });
  }

  handleClick(event) {
    if (this.state.isOpen && this.menuDom && !this.menuDom.contains(event.target)) {
      this.setState({ isOpen: false, position: 0 });
    }
  }

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen, position: 0 });
  }

  render() {
    const {
      anchorElement,
      className,
      closeMainMenu,
      id,
      position,
      style,
      subItemParent,
      target,
      onClick,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    const menuClass = () => classNames({
      'ui-menu': true,
    }, className);


    const menuListClass = () => classNames({
      'ui-menu__list': true,
      'ui-menu__list--hidden': !isOpen,
      'ui-menu__list--notification': position === 'notification',
      'ui-menu__list--bottom-start': position === 'bottom-start',
      'ui-menu__list--bottom-end': position === 'bottom-end',
      'ui-menu__list--top-start': position === 'top-start',
      'ui-menu__list--top-end': position === 'top-end',
      'ui-menu__list--right-start': position === 'right-start',
      'ui-menu__list--right-end': position === 'right-end',
      'ui-menu__list--left-start': position === 'left-start',
      'ui-menu__list--left-end': position === 'left-end',
      'ui-menu__list--target-top-bottom': target === 'top-bottom',
      'ui-menu__list--target-top-bottom-hidden': !isOpen && target === 'top-bottom',
      'ui-menu__list--target-bottom-top': target === 'bottom-top',
      'ui-menu__list--target-bottom-top-hidden': !isOpen && target === 'bottom-top',
      'ui-menu__list--target-right-left': target === 'right-left',
      'ui-menu__list--target-right-left-hidden': !isOpen && target === 'right-left',
      'ui-menu__list--target-left-right': target === 'left-right',
      'ui-menu__list--target-left-right-hidden': !isOpen && target === 'left-right',
    });

    const filteredChildren = filterChildren(this.props.children);

    const childrenWithFuncs = React.Children.map(filteredChildren, (child, index) => React.cloneElement(child, {
      closeMainMenu,
      handleMenuItemNavigation: this.onKeyDown,
      index,
      position: this.state.position,
      setMenuItemLength: this.setMenuItemLength,
      setPosition: this.setPosition,
      togglePopover: this.togglePopover,
      subItemParent,
      handleParentMenuonClick: onClick,
    }));

    return (
      <div
        id={id}
        className={menuClass()}
        style={style}
        ref={(menuDom) => { this.menuDom = menuDom; }}
      >
        <div
          className="ui-menu__anchor"
          role="menu"
          onClick={this.togglePopover}
          onKeyDown={this.onKeyDown}
          tabIndex={0}
        >
          {anchorElement}
        </div>

        <div className={menuListClass()}>
          {childrenWithFuncs}
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** anchor element the menuItem will reference to */
  anchorElement: PropTypes.node.isRequired,
  /** position of the menulist, will default to bottom */
  position: PropTypes.oneOf([
    'right-start',
    'right-end',
    'left-start',
    'left-end',
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
  ]),
  /** target of how you want the menu to appear */
  target: PropTypes.oneOf([
    'top-bottom',
    'bottom-top',
    'right-left',
    'left-right',
  ]),
  /** If true, menu has a parent menu */
  subItemParent: PropTypes.bool,
  /** If function exists from MenuItem component, will close both submenu and parent menu */
  closeMainMenu: PropTypes.func,
  /** If function exists from MenuItem component, will navigate directly to menu item if only one exists */
  keyHandler: PropTypes.func,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  id: '',
  className: '',
  position: 'bottom-start',
  target: 'top-bottom',
  style: {},
  subItemParent: false,
  closeMainMenu: _.noop,
  onKeyDown: _.noop,
  keyHandler: _.noop,
  handleClick: _.noop,
  onClick: _.noop,
};

export default Menu;
