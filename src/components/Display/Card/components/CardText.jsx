import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';

const CardText = (props) => {
  const {
    id,
    className,
    expanded,
    expandable,
    style,
    containerStyle,
  } = props;

  const cardTextClass = () => classNames({
    'ui-card-text': true,
    'ui-card-text--hidden': !expanded && expandable,
    'ui-card-text--expanded': expanded || !expandable,
  }, className);

  const newChildren = filterChildren(props.children);

  return (
    <div
      id={id}
      className={cardTextClass()}
      style={style}
    >
      <div className="ui-card-text__container" style={containerStyle}>
        {newChildren}
      </div>
    </div>
  );
};

CardText.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Override the inline-styles of the contaier element || Not Recommended */
  containerStyle: PropTypes.object,
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
  /**
  * children props for content inside
  * @ignore
  */
  children: PropTypes.node,
};

CardText.defaultProps = {
  id: '',
  className: '',
  expanded: null,
  expandable: false,
  children: [],
  style: {},
  containerStyle: {},
};

export default CardText;
