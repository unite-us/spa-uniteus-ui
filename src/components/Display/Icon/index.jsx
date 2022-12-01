import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ICONS } from './utils/constants';
import { V2ICONS } from './utils/v2constants';
import { navigateOnEnterOrSpace } from '../../utils/Browser';

/**
 * Icon Component
 */
const Icon = (props) => {
  const {
    icons,
    id,
    className,
    style,
    ariaLabel,
    canReceiveFocus,
  } = props;

  const iconClass = () => classNames({
    'ui-icon': true,
  }, className);

  const styles = _.isEmpty(style) ? {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
      fill: props.color,
    },
  } : style;

  const allIcons = {
    ...ICONS,
    ...V2ICONS,
  };

  const viewBox = _.get(icons, 'icon.viewBox', null) || _.get(allIcons, props.icon, {}).viewBox;
  const iconImage = _.get(icons, 'icon.markup', null) || _.get(allIcons, props.icon, {}).markup;

  if (_.isEmpty(viewBox) || _.isEmpty(iconImage)) {
    return <p>Icon viewBox or markup does not exist!</p>;
  }

  if (props.onClick && !props.disabled) {
    return (
      <a
        role="button"
        aria-label={ariaLabel}
        onClick={props.onClick}
        tabIndex={canReceiveFocus ? 0 : -1}
        onKeyDown={navigateOnEnterOrSpace(props.onClick)}
      >
        <svg
          id={id}
          className={iconClass()}
          style={styles.svg}
          width={`${props.size}px`}
          height={`${props.size}px`}
          viewBox={viewBox}
        >
          {iconImage}
        </svg>
      </a>
    );
  }

  return (
    <svg
      id={id}
      className={iconClass()}
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox={viewBox}
    >
      {iconImage}
    </svg>
  );
};

Icon.propTypes = {
  /** ariaLabel for a11y */
  ariaLabel: PropTypes.string,
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Icon name */
  icon: PropTypes.string.isRequired,
  /** Color of icon */
  color: PropTypes.string,
  /** Size of Icon */
  size: PropTypes.number,
  /** clickable functionality. */
  onClick: PropTypes.func,
  /**
   * An object of icons if coming directly from the application.
   */
  icons: PropTypes.object,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Is the Icon disabled? */
  disabled: PropTypes.bool,
  /** If the parent already has a tabIndex, this prop will allow you to change the tabIndex for Icon */
  canReceiveFocus: PropTypes.bool,
};

Icon.defaultProps = {
  ariaLabel: null,
  id: '',
  className: '',
  icon: '',
  color: '',
  size: 16,
  onClick: null,
  icons: {},
  style: {},
  disabled: false,
  canReceiveFocus: true,
};

export default Icon;
