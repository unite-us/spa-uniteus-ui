import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconLoader = (props) => {
  const {
    size,
    rounded,
    className,
    id,
    style,
  } = props;

  const barLoaderClass = () => classNames({
    'icon-loader': true,
    'icon-loader--small': _.isEqual('small', size),
    'icon-loader--small-rounded': _.isEqual('small', size) && rounded,
    'icon-loader--large': _.isEqual('large', size),
    'icon-loader--large-rounded': _.isEqual('large', size) && rounded,
    'icon-loader--rounded': rounded && (!_.isEqual('large', size) || !_.isEqual('small', size)),
  }, className);
  return (
    <div
      id={id}
      style={style}
      className={barLoaderClass()}
    />
  );
};

IconLoader.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** string to have small, normal, or large icon loaders */
  size: PropTypes.oneOf(['large', 'regular', 'small']),
  /** use if you want rounded corners */
  rounded: PropTypes.bool,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
};

IconLoader.defaultProps = {
  id: '',
  className: '',
  size: 'regular',
  rounded: false,
  style: {},
};

export default IconLoader;
