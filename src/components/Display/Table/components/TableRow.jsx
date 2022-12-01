import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(columnIndex, event) {
    const { parent } = this.props;

    if (parent === 'table-body' && _.isFunction(this.props.onCellClick)) {
      this.props.onCellClick(this.props.rowIndex, columnIndex, event);
    }
  }

  render() {
    const {
      className,
      id,
      clickable,
      children,
      secondaryDataList,
      style,
      hoverable,
    } = this.props;

    const tableRowClass = () => classNames({
      'ui-table-row': true,
      'ui-table-row--clickable': clickable,
      'ui-table-row--hoverable': hoverable,
    }, className);

    const filteredChildren = filterChildren(children);

    const childrenWithFuncs = React.Children.map(filteredChildren, (child, index) => React.cloneElement(child, {
      onCellClick: this.onCellClick,
      columnIndex: index,
      secondaryDataList,
    }));

    return (
      <tr id={id} className={tableRowClass()} onClick={this.onCellClick} style={style}>
        {childrenWithFuncs}
      </tr>
    );
  }
}

TableRow.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** If true, row will be clickable */
  clickable: PropTypes.bool,
  /** If true, row will be hoverable */
  hoverable: PropTypes.bool,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
  /**
   * on cell click passed from the TableBody component
   * @ignore
   */
  onCellClick: PropTypes.func,
  /**
   * Row index passed from TableBody component
   * @ignore
   */
  rowIndex: PropTypes.number.isRequired,
  /**
   * Root parent component
   * @ignore
   */
  parent: PropTypes.string,
  /**
   * Data (in columns) to hide passed from TableHead or TableBody component
   * @ignore
   */
  secondaryDataList: PropTypes.array,
};

TableRow.defaultProps = {
  id: '',
  className: '',
  children: [],
  clickable: true,
  hoverable: true,
  onCellClick: null,
  rowIndex: 0,
  parent: '',
  secondaryDataList: [],
  style: {},
};

export default TableRow;
