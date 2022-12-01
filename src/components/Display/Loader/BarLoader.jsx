import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BarLoader = (props) => {
  const {
    tall,
    className,
    id,
    size,
    style,
  } = props;

  const barLoaderClass = () => classNames({
    'bar-loader': true,
    'bar-loader--tall': tall,
    'bar-loader--quarter': _.isEqual('quarter', size),
    'bar-loader--semi-full': _.isEqual('semi-full', size),
    'bar-loader--half': _.isEqual('half', size),
  }, className);
  return (
    <div
      id={id}
      style={style}
      className={barLoaderClass()}
    />
  );
};

BarLoader.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** determine if you want to use taller height */
  tall: PropTypes.bool,
  /** width size of loader bar */
  size: PropTypes.oneOf([
    'quarter',
    'half',
    'semi-full',
    'full',
  ]),
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
};

BarLoader.defaultProps = {
  id: '',
  className: '',
  tall: false,
  size: 'full',
  style: {},
};

export default BarLoader;
