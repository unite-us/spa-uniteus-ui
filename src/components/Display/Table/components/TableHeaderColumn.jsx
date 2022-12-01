import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import filterChildren from '../../../utils/Children/filterChildren';

const TableHeaderColumn = (props) => {
  const {
    className,
    id,
    style,
    secondaryDataList,
    columnIndex,
    children,
  } = props;

  const tableHeaderColumnClass = () => classNames({
    'ui-table-header-column': true,
    'hidden-sm-down': _.includes(secondaryDataList, columnIndex),
  }, className);

  const newChildren = filterChildren(children);

  return (
    <th
      id={id}
      className={tableHeaderColumnClass()}
      style={style}
    >
      {newChildren}
    </th>
  );
};

TableHeaderColumn.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Column index passed from TableRow component
   * @ignore
   */
  columnIndex: PropTypes.number.isRequired,
  /**
   * Data (in columns) to hide passed from TableRow component
   * @ignore
   */
  secondaryDataList: PropTypes.array,
};

TableHeaderColumn.defaultProps = {
  id: '',
  className: '',
  children: [],
  style: {},
  secondaryDataList: [],
  columnIndex: 0,
};


export default TableHeaderColumn;
