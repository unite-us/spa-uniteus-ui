import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from '../../Icon';
import filterChildren from '../../../utils/Children/filterChildren';

const CardHeader = (props) => {
  const {
    className,
    showHeaderIcon,
    headerIconDetails: {
      color,
      icon,
      size,
      toolTipText,
    },
    id,
    style,
    title,
    subtitle,
    showExpandableButton,
    expanded,
    titleStyle,
    subtitleStyle,
  } = props;

  const tableHeaderClass = () => classNames({
    'ui-card-header': true,
  }, className);

  const newChildren = filterChildren(props.children);

  // Tooltip position calculations
  const headerTitleRef = useRef(null);
  const mainContentRef = useRef(null);
  let toolTipPosition;

  if (toolTipText && headerTitleRef.current && mainContentRef.current) {
    const widthDifference = mainContentRef.current.offsetWidth - (headerTitleRef.current.offsetWidth + 225);

    /** toolTipPosition(em) = target(px) / font-size(px) */
    toolTipPosition = (widthDifference < 0 ? widthDifference : -25) / 14;
  }

  return (
    <div
      id={id}
      className={tableHeaderClass()}
      style={style}
    >
      <div className="ui-card-header__main-content" ref={mainContentRef}>
        <h2 className="ui-card-header__title" style={titleStyle} ref={headerTitleRef}>
          {title}
          {
            showHeaderIcon ? (
              <span className="icon-tooltip">
                <Icon
                  color={color}
                  icon={icon}
                  size={size}
                />
                {
                  toolTipText ? <p className="tooltip" style={{ left: `${toolTipPosition}em` }}>{toolTipText}</p> : null }
              </span>
            ) : null
          }
        </h2>
        {
          showExpandableButton ?
            <div className="ui-card-header__expandable">
              {
                expanded ?
                  <Icon icon="IconChevronDown" onClick={props.onExpandChange} /> :
                  <Icon icon="IconChevronRight" onClick={props.onExpandChange} />
              }
            </div> : null
        }
      </div>
      {
        !_.isEmpty(subtitle) ?
          <div className="ui-card-header__sub-content mt-half" style={subtitleStyle}>
            {subtitle}
          </div> : null
      }

      {newChildren}
    </div>
  );
};

CardHeader.propTypes = {
  /** Boolean toggle to show an icon indicator for the program title */
  showHeaderIcon: PropTypes.bool,
  /** Icon tooltip for the card header */
  headerIconDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Can be used to render a title in Card Header. */
  title: PropTypes.node,
  /** Can be used to render a subtitle in Card Header. */
  subtitle: PropTypes.string,
  /** Override the inline-styles of the title element || Not Recommended */
  titleStyle: PropTypes.object,
  /** Override the inline-styles of the subtitle element || Not Recommended */
  subtitleStyle: PropTypes.object,
  /**  If true, this card component will include a button to expand the card. */
  showExpandableButton: PropTypes.bool,
  /**
   * Callback function fired when the expandable state of the card has changed.
   * @ignore
   */
  onExpandChange: PropTypes.func,
  /**
   * If true, this card component is expanded (uncontrolled)
   * @ignore
   */
  expanded: PropTypes.bool,
  children: PropTypes.node,
};

CardHeader.defaultProps = {
  headerIconDetails: {},
  showHeaderIcon: false,
  id: '',
  className: '',
  style: {},
  titleStyle: {},
  subtitleStyle: {},
  title: '',
  subtitle: '',
  showExpandableButton: false,
  expanded: null,
  onExpandChange: null,
  children: [],
};

export default CardHeader;
