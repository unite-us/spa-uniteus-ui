import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import filterChildren from '../../utils/Children/filterChildren';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.initiallyExpanded,
    };

    this.onExpandChange = this.onExpandChange.bind(this);
  }

  onExpandChange() {
    return _.isNull(this.props.expanded) ?
      this.setState({ expanded: !this.state.expanded }) : this.props.onExpandChange();
  }

  render() {
    const {
      children,
      id,
      className,
      style,
      applyBorder,
    } = this.props;

    const cardClass = () => classNames({
      'ui-card': true,
      'ui-card--bordered': applyBorder,
    }, className);

    const newChildren = filterChildren(children, {
      expanded: _.isNull(this.props.expanded) ? this.state.expanded : this.props.expanded,
      onExpandChange: this.onExpandChange,
    });

    return (
      <div
        id={id}
        className={cardClass()}
        style={style}
      >
        {newChildren}
      </div>
    );
  }
}

Card.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Whether this card is expanded. */
  expanded: PropTypes.bool,
  /** Only applicable to uncontrolled Card.  Whether this card is initially expanded. */
  initiallyExpanded: PropTypes.bool,
  /** Only applicable and REQUIRED for controlled Card.  Callback function fired when the expandable state of the card has changed.  */
  onExpandChange: PropTypes.func,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** If true, applies a border around the card */
  applyBorder: PropTypes.bool,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

Card.defaultProps = {
  id: '',
  className: '',
  children: [],
  style: {},
  expandable: false,
  expanded: null,
  initiallyExpanded: false,
  onExpandChange: null,
  applyBorder: true,
};

export default Card;
