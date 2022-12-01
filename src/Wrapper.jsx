import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import './stylesheets/main.scss';

const Wrapper = ({ children }) => (
  <div className="wrapper">
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
