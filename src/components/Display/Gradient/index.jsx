import React from 'react';
import PropTypes from 'prop-types';

const Gradient = ({ children }) => (
  <div className="ui-gradient">
    {children}
  </div>
);

Gradient.propTypes = {
  /**
   * children for content inside
   */
  children: PropTypes.node,
};

Gradient.defaultProps = {
  children: [],
};

export default Gradient;
