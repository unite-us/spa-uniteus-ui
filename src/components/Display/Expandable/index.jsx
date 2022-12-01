import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNull } from 'lodash';

const SECONDARY_TAG = 'span';

class Expandable extends Component {
  static mainClass(className) {
    return classNames('ui-expandable', className);
  }

  static containerClass(expanded) {
    return classNames('ui-expandable__container', {
      'ui-expandable__container--collapsed': !expanded,
      'ui-expandable__container--expanded': expanded,
    });
  }

  static headerClass(secondary) {
    return classNames('ui-expandable__header', {
      'ui-expandable__header--primary': !secondary,
      'ui-expandable__header--secondary': secondary,
    });
  }

  static bodyClass(expanded, secondary) {
    return classNames('ui-expandable__body', {
      'ui-expandable__body--collapsed': !expanded,
      'ui-expandable__body--expanded': expanded,
      'ui-expandable__body--secondary': secondary,
    });
  }

  static caretClass(expanded) {
    return classNames({
      'pull-right': true,
      'ui-expandable-caret open': expanded,
      'ui-expandable-caret closed': !expanded,
    });
  }

  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);

    this.state = {
      expanded: !props.initiallyCollapsed,
    };
  }

  onKeyPress(e) {
    // Capture Enter and Space keys
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.toggleExpansion(e);
    }
  }

  toggleExpansion(e) {
    e.stopPropagation();

    this.setState(() => ({
      expanded: !this.state.expanded,
    }));

    if (this.props.onExpandChange) {
      this.props.onExpandChange();
    }
  }

  render() {
    const expanded = isNull(this.props.expanded) ? this.state.expanded : this.props.expanded;
    const {
      children,
      className,
      header,
      headerTag,
      id,
      secondary,
    } = this.props;

    const HeaderTag = secondary ? SECONDARY_TAG : headerTag;

    return (
      <section
        className={Expandable.mainClass(className)}
        {...(id ? { id } : {})}
      >
        <div className={Expandable.containerClass(expanded)}>
          <a
            onClick={this.toggleExpansion}
            onKeyPress={this.onKeyPress}
            role="button"
            tabIndex={0}
          >
            <div className={Expandable.headerClass(secondary)}>
              <HeaderTag className="ui-expandable__header-content">
                <div className="ui-expandable-text">{header}</div>
                <div className={Expandable.caretClass(expanded)} />
              </HeaderTag>
            </div>
          </a>
          <div className={Expandable.bodyClass(expanded, secondary)}>
            {children}
          </div>
        </div>
      </section>
    );
  }
}

Expandable.propTypes = {
  /** children for content inside */
  children: PropTypes.node,
  /** optional className for reference */
  className: PropTypes.string,
  /** Whether this card is expanded. */
  expanded: PropTypes.bool,
  /** string or node header used as the toggle for the main component */
  header: PropTypes.node.isRequired,
  /** tag string used for semantic headings, it will not affect the styles */
  headerTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /** optional id for reference */
  id: PropTypes.string,
  /** boolean to determine if container is rendered expanded */
  initiallyCollapsed: PropTypes.bool.isRequired,
  /** function that is called when toggleExpansion is called */
  onExpandChange: PropTypes.func,
  /** determines style and color of expandable container */
  secondary: PropTypes.bool,
};

Expandable.defaultProps = {
  children: [],
  className: '',
  expanded: null,
  headerTag: 'h5',
  id: '',
  initiallyCollapsed: false,
  onExpandChange: null,
  secondary: false,
};

export default Expandable;
