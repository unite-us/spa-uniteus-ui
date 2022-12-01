import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hamburger from '../Hamburger';

const AppBar = (props) => {
  const {
    id,
    className,
    style,
    iconElementLeft,
    iconStyleLeft,
    iconElementRight,
    iconStyleRight,
    onHamburgerIconClick,
    opened,
  } = props;

  const appBarClass = () => classNames({
    'ui-app-bar': true,
  }, className);

  return (
    <div className={appBarClass()} id={id} style={style}>
      <div className="ui-app-bar__left-container">
        {
          onHamburgerIconClick ?
            <Hamburger
              className="mr-two"
              opened={opened}
              onMenuClick={props.onHamburgerIconClick}
            /> : null
        }
        <div className="ui-app-bar__left" style={iconStyleLeft}>
          {iconElementLeft}
        </div>
      </div>

      <div className="ui-app-bar__right" style={iconStyleRight}>
        {iconElementRight}
      </div>
    </div>
  );
};

AppBar.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** The custom element to be displayed on the left side of the app bar. */
  iconElementLeft: PropTypes.node,
  /** Override the inline-styles of the element displayed on the left side of the app bar. */
  iconStyleLeft: PropTypes.object,
  /** The custom element to be displayed on the right side of the app bar. */
  iconElementRight: PropTypes.node,
  /** Override the inline-styles of the element displayed on the right side of the app bar. */
  iconStyleRight: PropTypes.object,
  /** Function for when the left hamburger icon is selected via a touch tap. */
  onHamburgerIconClick: PropTypes.func,
  /** If true, App Bar will recognize as opened */
  opened: PropTypes.bool.isRequired,
};

AppBar.defaultProps = {
  id: '',
  className: '',
  style: {},
  iconElementLeft: '',
  iconStyleLeft: {},
  iconElementRight: '',
  iconStyleRight: {},
  onHamburgerIconClick: null,
};

export default AppBar;
