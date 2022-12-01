import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class BaseCard extends Component {
  static cardClass({ className, noBorder }) {
    return classNames({
      'ui-base-card': true,
      'ui-base-card--bordered': !noBorder,
    }, className);
  }

  render() {
    const {
      noBorder,
      children,
      className,
      id,
    } = this.props;

    return (
      <div
        {...(id ? { id } : {})}
        className={BaseCard.cardClass({ noBorder, className })}
      >
        {children}
      </div>
    );
  }
}

BaseCard.propTypes = {
  /** optional id for reference */
  id: PropTypes.string,
  /** optional className for reference */
  className: PropTypes.string,
  /** Whether this card removes the border or not. */
  noBorder: PropTypes.bool,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

BaseCard.defaultProps = {
  id: '',
  className: '',
  children: [],
  noBorder: false,
};

export default BaseCard;
