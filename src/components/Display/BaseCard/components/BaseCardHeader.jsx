import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class BaseCardHeader extends Component {
  static headerClass({ className, noBorder }) {
    return classNames({
      'ui-base-card-header': true,
      'with-border': !noBorder,
    }, className);
  }

  render() {
    const {
      children,
      className,
      id,
      title,
      noBorder,
      secondaryFullWidth,
    } = this.props;

    const mappedChildren = React.Children.map(children, (child, index) => (
      <div
        className={classNames({
          'ui-base-card-header__children-item--full': secondaryFullWidth,
        }, 'ui-base-card-header__children-item')}
        key={index}
      >
        {child}
      </div>
    ));

    return (
      <div
        {...(id ? { id } : {})}
        className={BaseCardHeader.headerClass({ className, noBorder })}
      >
        <div className="ui-base-card-header__main-content">
          <h2 className="ui-base-card-header__title">{title}</h2>

          <div
            className="ui-base-card-header__children"
          >
            {mappedChildren}
          </div>
        </div>
      </div>
    );
  }
}

BaseCardHeader.propTypes = {
  /** items to display on the right hand side of the Header */
  children: PropTypes.node,
  /** className for reference */
  className: PropTypes.string,
  /** id for reference */
  id: PropTypes.string,
  /** Can be used to render a title in Card Header. */
  title: PropTypes.node,
  /** Bool to allow a bottom border. */
  noBorder: PropTypes.bool,
  /** If true, set the secondary width 50% */
  secondaryFullWidth: PropTypes.bool,
};

BaseCardHeader.defaultProps = {
  children: [],
  className: '',
  id: '',
  title: '',
  noBorder: false,
  secondaryFullWidth: false,
};

export default BaseCardHeader;
