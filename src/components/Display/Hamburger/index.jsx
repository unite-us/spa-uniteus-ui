import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from 'lodash';

const Hamburger = (props) => {
  const {
    opened,
    id,
    className,
    style,
  } = props;

  const hamburgerContainerClass = () => classNames({
    'ui-hamburger': true,
  }, className);

  const bar1Class = () => classNames({
    'ui-hamburger__bar1': true,
    'ui-hamburger__bar1--opened': opened,
  });

  const bar2Class = () => classNames({
    'ui-hamburger__bar2': true,
    'ui-hamburger__bar2--opened': opened,
  });

  const bar3Class = () => classNames({
    'ui-hamburger__bar3': true,
    'ui-hamburger__bar3--opened': opened,
  });

  return (
    <div
      id={id}
      className={hamburgerContainerClass()}
      onClick={props.onMenuClick}
      role="button"
      tabIndex={0}
      style={style}
    >
      <div className={bar1Class()} />
      <div className={bar2Class()} />
      <div className={bar3Class()} />
    </div>
  );
};

Hamburger.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** If true, this card component is expandable. */
  opened: PropTypes.bool.isRequired,
  /** Callback function when the burger icon is clicked */
  onMenuClick: PropTypes.func,
};

Hamburger.defaultProps = {
  id: '',
  className: '',
  style: {},
  onMenuClick: noop,
};

export default Hamburger;
