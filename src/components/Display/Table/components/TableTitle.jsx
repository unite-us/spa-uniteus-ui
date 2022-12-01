import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';

const TableTitle = (props) => {
  const {
    className,
    id,
    secondary,
    onSecondaryTitleClick,
    style,
    secondaryStyle,
  } = props;

  const tableTitle = () => classNames({
    'ui-table-title': true,
  }, className);

  const newChildren = filterChildren(props.children);

  return (
    <caption
      id={id}
      className={tableTitle()}
      style={style}
    >
      <h3 className="ui-table-title__primary-title">
        {newChildren}
      </h3>

      {
        <span className="ui-table-title__secondary">
          {
            onSecondaryTitleClick ?
              <a
                className="ui-table-title__secondary-title secondary-title--link"
                type="link"
                onClick={onSecondaryTitleClick}
                style={secondaryStyle}
                role="link"
                tabIndex={0}
              >
                {secondary}
              </a> :
              <span
                className="ui-table-title__secondary-title"
                style={secondaryStyle}
              >
                {secondary}
              </span>
          }
        </span>
      }
    </caption>
  );
};

TableTitle.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Secondary text or node */
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /** On Secondary text click function if clickable */
  onSecondaryTitleClick: PropTypes.func,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Override the inline-styles of the secondary title element || Not Recommended */
  secondaryStyle: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

TableTitle.defaultProps = {
  id: '',
  className: '',
  children: [],
  onCellClick: null,
  style: {},
  secondaryStyle: {},
  onSecondaryTitleClick: null,
  secondary: '',
};


export default TableTitle;
