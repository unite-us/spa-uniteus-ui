import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

const SelectionBubble = (props) => {
  const {
    className,
    id,
    label,
    style,
    title,
    selected,
    hideClose,
  } = props;

  const selectionBubbleContainerClass = () => classNames({
    'ui-selection': true,
  }, className);

  const onClick = () => {
    props.onClick(selected);
  };

  return (
    <div
      id={id}
      className={selectionBubbleContainerClass()}
      style={style}
      title={title}
    >
      <div className="ui-selection__button-container">
        <span>{label}</span>
        {!hideClose &&
          (<Icon
            type="button"
            className="ui-selection__button"
            aria-label={`'${label}'`}
            icon="IconCross"
            size={9}
            onClick={onClick}
          />)
        }
      </div>
    </div>
  );
};

SelectionBubble.propTypes = {
  /** className for reference */
  className: PropTypes.string,
  hideClose: PropTypes.bool,
  /** id for reference */
  id: PropTypes.string,
  /** label text for bubble */
  label: PropTypes.string.isRequired,
  /** Callback function when the cross icon is clicked */
  onClick: PropTypes.func.isRequired,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Selected object represented by bubble */
  selected: PropTypes.object.isRequired,
  /** Message to display when hovering on the cross icon */
  title: PropTypes.string,
};

SelectionBubble.defaultProps = {
  id: '',
  className: '',
  style: {},
  title: '',
  hideClose: false,
};

export default SelectionBubble;
