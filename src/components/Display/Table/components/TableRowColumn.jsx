import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../../utils/Children/filterChildren';

class TableRowColumn extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(event) {
    event.stopPropagation();
    this.props.onCellClick(this.props.columnIndex, event);
  }

  render() {
    const {
      className,
      id,
      isLockIcon,
      secondaryDataList,
      columnIndex,
      showOverflow,
      style,
      label,
    } = this.props;

    const tableRowColumnClass = () => classNames({
      'ui-table-row-column': true,
      'ui-table-row-column--show-overflow': showOverflow,
      'ui-table-row-column--lock-icon': isLockIcon,
      'hidden-sm-down': _.includes(secondaryDataList, columnIndex),
    }, className);

    const newChildren = filterChildren(this.props.children);

    return (
      <td
        id={id}
        className={tableRowColumnClass()}
        role="gridcell"
        onClick={this.onCellClick}
        style={style}
        data-label={label}
      >
        {newChildren}
      </td>
    );
  }
}

TableRowColumn.propTypes = {
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
   * on cell click passed from the TableRow component
   * @ignore
   */
  onCellClick: PropTypes.func,
  /** Label to display when responsiveCardStyle is activated */
  label: PropTypes.string,
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
  /** Add this prop if you need to show overflow */
  showOverflow: PropTypes.bool,
  /** Boolean if is lock icon column */
  isLockIcon: PropTypes.bool,
};

TableRowColumn.defaultProps = {
  children: [],
  className: '',
  clickable: true,
  columnIndex: 0,
  id: '',
  isLockIcon: false,
  label: '',
  onCellClick: null,
  secondaryDataList: [],
  showOverflow: false,
  style: {},
};

export default TableRowColumn;
