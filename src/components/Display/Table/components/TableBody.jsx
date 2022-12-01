import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';


const TableBody = (props) => {
  const {
    className,
    id,
    children,
    style,
    secondaryDataList,
  } = props;

  const tableBodyClass = () => classNames({
    'ui-table-body': true,
  }, className);

  const filteredChildren = filterChildren(children);

  let childrenWithFuncs;

  if (props.onCellClick) {
    childrenWithFuncs = React.Children.map(filteredChildren, (child, index) => React.cloneElement(child, {
      onCellClick: props.onCellClick,
      parent: 'table-body',
      rowIndex: index,
      secondaryDataList,
    }));
  } else {
    childrenWithFuncs = React.Children.map(filteredChildren, (child, index) => React.cloneElement(child, {
      parent: 'table-body',
      rowIndex: index,
      secondaryDataList,
    }));
  }

  return (
    <tbody
      id={id}
      className={tableBodyClass()}
      style={style}
    >
      {childrenWithFuncs}
    </tbody>
  );
};

TableBody.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** prop fucntion when user clicks */
  onCellClick: PropTypes.func,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
  /**
   * on cell click passed from the Table component
   * @ignore
   */
  /**
   * Data (in columns) to hide passed from TableRow component
   * @ignore
   */
  secondaryDataList: PropTypes.array,
};

TableBody.defaultProps = {
  id: '',
  className: '',
  children: [],
  style: {},
  onCellClick: null,
  secondaryDataList: [],
};

export default TableBody;
