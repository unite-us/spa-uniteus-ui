import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Gradient from '../../Gradient';

class BaseCardBody extends Component {
  static mainClass({ className, withPadding }) {
    return classNames({
      'ui-base-card-body': true,
      'ui-base-card-body--with-padding': withPadding,
    }, className);
  }

  render() {
    const {
      id,
      children,
      className,
      withPadding,
    } = this.props;
    return (
      <Gradient>
        <div
          {...(id ? { id } : {})}
          className={BaseCardBody.mainClass({ className, withPadding })}
        >
          {children}
        </div>
      </Gradient>
    );
  }
}

BaseCardBody.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** bool to determine if you need to add padding around the body */
  withPadding: PropTypes.bool,
  /** className for reference */
  className: PropTypes.string,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

BaseCardBody.defaultProps = {
  id: '',
  className: '',
  children: [],
  withPadding: false,
};

export default BaseCardBody;
