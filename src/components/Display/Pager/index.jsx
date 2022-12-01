import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../Display/Icon';
import Count from './conponents/Count';

const Pager = (props) => {
  const {
    id,
    className,
    style,
    countRight,
    disabled,
    hideCount,
    onNextClick,
    onPrevClick,
    paging: {
      current_page,
      next_page,
      prev_page,
      per,
      total_count,
    },
  } = props;

  const prevBtnLabel = 'Previous Page';
  const nextBtnLabel = 'Next Page';

  const pagerContainerClass = () => classNames({
    'ui-pager': true,
  }, className);

  const actionsClass = () => classNames({
    'ui-pager__actions': true,
    'ui-pager__actions--left': !countRight,
    'ui-pager__actions--right': countRight,
  });

  const nextBtnClass = () => classNames({
    'ui-pager__btn': true,
    'ui-pager__btn-next': true,
    'ui-pager__btn--disabled': !next_page || disabled,
  });

  const prevBtnClass = () => classNames({
    'ui-pager__btn': true,
    'ui-pager__btn-prev': true,
    'ui-pager__btn--disabled': !prev_page || disabled,
  });

  return (
    <div
      id={id}
      className={pagerContainerClass()}
      style={style}
    >
      {(!hideCount && !countRight) &&
        <Count
          currentPage={current_page}
          per={per}
          totalCount={total_count}
        />}

      <div className={actionsClass()}>
        <button
          className={prevBtnClass()}
          id={id}
          aria-label={prevBtnLabel}
          disabled={!prev_page || disabled}
          onClick={onPrevClick}
          style={style}
        >
          <Icon icon="IconCaretLeft" size={10} />
          <span className="sr-only">Previous Page</span>
        </button>
        <button
          className={nextBtnClass()}
          id={id}
          aria-label={nextBtnLabel}
          disabled={!next_page || disabled}
          onClick={onNextClick}
          style={style}
        >
          <Icon icon="IconCaretRight" size={10} />
          <span className="sr-only">Next Page</span>
        </button>
      </div>

      {(!hideCount && countRight) &&
        <Count
          currentPage={current_page}
          per={per}
          totalCount={total_count}
        />}
    </div>
  );
};

Pager.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** If true, pagination counter is on the right. */
  countRight: PropTypes.bool,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** If true, buttons are disabled. */
  disabled: PropTypes.bool.isRequired,
  /** If true, pagination counter is hidden. */
  hideCount: PropTypes.bool,
  /** Callback function when the next button is clicked */
  onNextClick: PropTypes.func.isRequired,
  /** Callback function when the previous button is clicked */
  onPrevClick: PropTypes.func.isRequired,
  /** paging object with paginatin information */
  paging: PropTypes.object.isRequired,
};

Pager.defaultProps = {
  id: '',
  className: '',
  countRight: false,
  disabled: false,
  hideCount: false,
  style: {},
};

export default Pager;
