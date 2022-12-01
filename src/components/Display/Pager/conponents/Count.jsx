import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Count = (props) => {
  const {
    currentPage,
    per,
    totalCount,
  } = props;
  if (!currentPage || !per || !totalCount) {
    return null;
  }

  const start =
    _.add(1,
      _.multiply(per, _.subtract(currentPage, 1)),
    ) <= 1 ? 1 : _.add(1,
        _.multiply(per, _.subtract(currentPage, 1)),
      );

  const end = _.multiply(per, currentPage) > totalCount ?
    totalCount :
    _.multiply(per * currentPage);

  return (
    <span className="ui-pager-count">
      {`${start}-${end} of ${totalCount}`}
    </span>);
};

Count.propTypes = {
  currentPage: PropTypes.number,
  per: PropTypes.number,
  totalCount: PropTypes.number,
};

Count.defaultProps = {
  currentPage: null,
  per: null,
  totalCount: null,
};

export default Count;
