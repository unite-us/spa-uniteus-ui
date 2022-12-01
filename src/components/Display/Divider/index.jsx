import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Divider = (props) => {
  const {
    id,
    className,
    style,
  } = props;

  const dividerClass = () => classNames({
    'ui-divider': true,
  }, className);

  return (
    <hr id={id} style={style} className={dividerClass()} />
  );
};

Divider.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
};

Divider.defaultProps = {
  className: '',
  id: '',
  style: {},
};

export default Divider;
