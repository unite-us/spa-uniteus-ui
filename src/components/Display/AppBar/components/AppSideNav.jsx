import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';

const AppSideNav = (props) => {
  const {
    id,
    className,
    children,
    style,
    width,
    navContent,
    containerStyle,
    mainContentStyle,
    opened,
    containerClassName,
  } = props;

  const appSideNavContainerClass = () => classNames({
    'ui-app-bar-side-nav': true,
    'ui-app-bar-side-nav--opened': opened,
  }, containerClassName);

  const appBarSideNavClass = () => classNames({
    'ui-app-bar-side-nav__side-content': true,
  }, className);

  const appBarSideNavMainClass = () => classNames({
    'ui-app-bar-side-nav__main-content': true,
  });

  const newChildren = filterChildren(children);

  return (
    <div
      className={appSideNavContainerClass()}
      style={{
        ...containerStyle,
        width: opened ? '100%' : `calc(100% + ${width})`,
        transform: opened ? 'translateX(0)' : `translateX(-${width})`,
      }}
    >
      <div
        id={id}
        className={appBarSideNavClass()}
        style={style}
      >
        {navContent}
      </div>
      <div
        className={appBarSideNavMainClass()}
        style={mainContentStyle}
      >
        {newChildren}
      </div>
    </div>
  );
};

AppSideNav.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for sidebar nav */
  className: PropTypes.string,
  /** styles for the sidebar nav */
  style: PropTypes.object,
  /** className for container of the side nav */
  containerClassName: PropTypes.string,
  /** styles for container of the side nav */
  containerStyle: PropTypes.object,
  /** styles for the main content */
  mainContentStyle: PropTypes.object,
  /** width of the side bar nav */
  width: PropTypes.string,
  /** content inside of the nav side bar */
  navContent: PropTypes.node.isRequired,
  /** if true, nav side bar will show */
  opened: PropTypes.bool,
  /**
  * children props for content inside
  * @ignore
  */
  children: PropTypes.node,
};

AppSideNav.defaultProps = {
  id: '',
  className: '',
  containerClassName: '',
  containerStyle: {},
  children: [],
  style: {},
  navContent: null,
  mainContentStyle: {},
  opened: false,
  width: '250px',
};

export default AppSideNav;
