import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';


const TableHeader = (props) => {
  const {
    className,
    id,
    style,
    secondaryDataList,
    children,
  } = props;

  const tableHeaderClass = () => classNames({
    'ui-table-header': true,
  }, className);

  const newChildren = filterChildren(children, {
    secondaryDataList,
  });


  return (
    <thead
      id={id}
      className={tableHeaderClass()}
      style={style}
    >
      {newChildren}
    </thead>
  );
};

TableHeader.propTypes = {
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
   * Data (in columns) to hide passed from TableRow component
   * @ignore
   */
  secondaryDataList: PropTypes.array,
};

TableHeader.defaultProps = {
  id: '',
  className: '',
  children: [],
  style: {},
  secondaryDataList: [],
};

export default TableHeader;
