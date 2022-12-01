import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../utils/Children/filterChildren';
import Icon from '../Icon';

function getHeight(topOffset) {
  return {
    height: `calc(100% - ${topOffset})`,
  };
}

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.onEscClick = this.onEscClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEscClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick(event) {
    if (event.keyCode === 27 && this.props.open) {
      const closeFn = this.props.onEscClick || this.props.onClose;
      closeFn();
    }
  }

  onClose() {
    if (this.props.open) {
      this.props.onClose();
    }
  }

  render() {
    const {
      id,
      className,
      children,
      open,
      secondary,
      hideCloseButton,
      style,
      title,
      topOffset,
      width,
      theme,
    } = this.props;

    const drawerClass = () => classNames({
      'ui-drawer': true,
      'ui-drawer--primary': !secondary,
      'ui-drawer--secondary': secondary,
      'ui-drawer--opened': open,
    }, className);

    const buttonClass = () => classNames({
      'ui-drawer__close-btn': true,
      'ui-drawer__close-btn--opened': open,
      'ui-drawer__close-btn--dark': theme === 'dark',
    }, className);

    const newChildren = filterChildren(children);

    return (
      <div
        id={id}
        className={drawerClass()}
        style={{ ...style, top: topOffset, width, ...getHeight(topOffset) }}
      >
        <div className="ui-drawer__container">
          <div className="ui-drawer__body">
            <div className="ui-drawer__title">
              <div className="ui-drawer__title__close-button">
                <Icon
                  ariaLabel="Back"
                  icon="IconChevronLeft"
                  size={16}
                  color="#506784"
                  onClick={this.onClose}
                />
              </div>
              {
                title &&
                <div className="ui-drawer__title__content">
                  {title}
                </div>
              }
            </div>
            {newChildren}
          </div>
          {
            !hideCloseButton &&
              <div className={buttonClass()}>
                <Icon
                  ariaLabel="Close"
                  icon="IconCross"
                  size={14}
                  color={theme === 'dark' ? '#FFFFFF' : '#B7D2E5'}
                  onClick={this.onClose}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** If true, drawer hides close button.  Defaults to false. */
  hideCloseButton: PropTypes.bool,
  /** When close button is clicked or Esc key pressed, run this function */
  onClose: PropTypes.func,
  /** When Esc key is pressed, run this function. Takes precedence over onClose function. */
  onEscClick: PropTypes.func,
  /** If true, the Drawer is open. */
  open: PropTypes.bool.isRequired,
  /** If true, the Drawer is positioned to open from the opposite side. */
  secondary: PropTypes.bool,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** The drawer title string or node */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /** How much to offset drawer from top of window */
  topOffset: PropTypes.string,
  /** The width of the Drawer in pixels or percentage in string format ex. 50% to fill half of the window or 100% and so on. */
  width: PropTypes.string,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
  /** theme to determine light or dark mode */
  theme: PropTypes.oneOf(['light', 'dark']),
};

Drawer.defaultProps = {
  children: [],
  className: '',
  id: '',
  onClose: _.noop,
  // Important that onEscClick is 'undefined' by default.  When it is not defined,
  // onClose function takes precedence.
  onEscClick: undefined,
  secondary: false,
  style: {},
  hideCloseButton: false,
  title: null,
  topOffset: '0',
  width: '20%',
  theme: 'light',
};

export default Drawer;
