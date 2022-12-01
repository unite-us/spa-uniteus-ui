import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { getColorLuma } from '../../utils/Colors';

const Badge = (props) => {
  const {
    id,
    className,
    color,
    text,
    badgeAriaLabel,
  } = props;

  if (text === '' || text === undefined) {
    return null;
  }

  const luma = getColorLuma(color);
  const style = _.assign(
    {},
    {
      color: luma < 128 ? 'white' : '#4A657F',
      backgroundColor: props.color,
    },
    props.style,
  );

  const badgeClass = () => classNames({
    badge: true,
    'badge--square': props.shape === 'square',
  }, className);

  return (
    <span
      id={id}
      className={badgeClass()}
      style={style}
      aria-label={badgeAriaLabel}
    >
      {text}
    </span>
  );
};

Badge.propTypes = {
  /** badge aria label */
  badgeAriaLabel: PropTypes.string,
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** content to display */
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Hex color code */
  color: PropTypes.string.isRequired,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Shape of the badge */
  shape: PropTypes.oneOf(['square', 'circle']),
};

Badge.defaultProps = {
  badgeAriaLabel: '',
  id: '',
  className: '',
  text: '',
  color: '#E53935',
  style: {},
  shape: 'circle',
};

export default Badge;
