import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../utils/Children/filterChildren';

class Table extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }

  /**
   * on cell click will return rowIndex and columnIndex
   * @param {number} row
   * @param {number} column
   * @public
   */
  onCellClick(row, column, event) {
    if (this.props.onCellClick) {
      this.props.onCellClick(row, column, event);
    }
  }

  render() {
    const {
      noBorder,
      className,
      id,
      style,
      secondaryDataList,
      responsiveCardStyle,
    } = this.props;

    const tableClass = () => classNames({
      'ui-table': true,
      'ui-table__with-border': !noBorder,
      'ui-table--responsive-cards': responsiveCardStyle,
    }, className);

    let newChildren;

    if (this.props.onCellClick) {
      newChildren = filterChildren(this.props.children, {
        onCellClick: this.onCellClick,
        parent: 'table',
        secondaryDataList,
      });
    } else {
      newChildren = filterChildren(this.props.children, {
        parent: 'table',
        secondaryDataList,
      });
    }

    return (
      <div id={id} className={tableClass()} style={style}>
        <table>
          {newChildren}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /**
   * Called when a row cell is clicked.  Returns a row number
   *
   */
  onCellClick: PropTypes.func,
  /** Bool to remove the border around the Table */
  noBorder: PropTypes.bool,
  /** Bool to display the table rows as cards on small screens */
  responsiveCardStyle: PropTypes.bool,
  /** Data (in columns) to hide passed from TableRow component */
  secondaryDataList: PropTypes.array,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

Table.defaultProps = {
  id: '',
  noBorder: false,
  className: '',
  children: [],
  onCellClick: null,
  style: {},
  secondaryDataList: [],
  responsiveCardStyle: false,
};

export default Table;
