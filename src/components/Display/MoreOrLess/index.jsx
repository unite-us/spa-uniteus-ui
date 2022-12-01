import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Icon from '../Icon';

const MoreOrLess = ({
  children,
  moreText,
  lessText,
}) => {
  const [showMore, toggleShow] = useState(false);
  const onButtonClick = (event) => {
    event.preventDefault();
    toggleShow(!showMore);
  };

  const childrenWithFuncs = React.Children.map(children, child => (
    child && React.cloneElement(child, { showMore, showLess: !showMore })
  ));

  return (
    <div
      className={`more-or-less ${showMore ? 'more-or-less--show-more' : ''}`}
    >
      {childrenWithFuncs}
      <Button
        id="more-or-less-toggle-btn"
        className="more-or-less__button text-center"
        link
        onClick={onButtonClick}
        label={`${showMore ? lessText : moreText}`}
        iconRight={<Icon icon="IconChevronDown" />}
      />
    </div>
  );
};

MoreOrLess.propTypes = {
  /** Passed children components */
  children: PropTypes.node.isRequired,
  /** Copy for the condensed mode */
  moreText: PropTypes.string,
  /** Copy for the expanded mode */
  lessText: PropTypes.string,
};

MoreOrLess.defaultProps = {
  moreText: 'See more',
  lessText: 'See less',
};

export default MoreOrLess;
