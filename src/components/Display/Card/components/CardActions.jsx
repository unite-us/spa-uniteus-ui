import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';

const CardActions = (props) => {
  const {
    id,
    className,
    expanded,
    expandable,
    style,
  } = props;

  const cardActionClass = () => classNames({
    'ui-card-actions': true,
    'ui-card-actions--hidden': !expanded && expandable,
    'ui-card-actions--expanded': expanded || !expandable,
  }, className);

  const newChildren = filterChildren(props.children);

  return (
    <div
      className={cardActionClass()}
      id={id}
      style={style}
    >
      {newChildren}
    </div>
  );
};

CardActions.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  /**
   * If true, this card component is controlled.
   * @ignore
   */
  expandable: PropTypes.bool,
  /**
   * If true, this card component is expanded (uncontrolled)
   * @ignore
   */
  expanded: PropTypes.bool,
  style: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

CardActions.defaultProps = {
  id: '',
  className: '',
  style: {},
  children: [],
  expanded: null,
  expandable: false,
};

export default CardActions;
