import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as ReactStrap from 'reactstrap';
import classNames from 'classnames';

class Popover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
    };
  }

  render() {
    const {
      id,
      hideArrow,
      className,
      isOpen,
      target,
      placement,
      toggle,
      header,
      body,
      boundariesElement,
    } = this.props;

    const popoverClass = () => classNames({
      'ui-popover': true,
      'ui-popover--no-arrow': hideArrow,
    }, className);

    return (
      <ReactStrap.Popover
        id={id}
        className={popoverClass()}
        toggle={toggle}
        isOpen={isOpen}
        target={target}
        placement={placement}
        hideArrow={hideArrow}
        trigger="legacy"
        fade={false}
        boundariesElement={boundariesElement}
      >
        {
          !_.isEmpty(header) ?
            <ReactStrap.PopoverHeader>{header}</ReactStrap.PopoverHeader> : null
        }
        {
          !_.isEmpty(body) ?
            <ReactStrap.PopoverBody>{body}</ReactStrap.PopoverBody> : null
        }
      </ReactStrap.Popover>
    );
  }
}

Popover.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** prop to determine open and close state of popover */
  isOpen: PropTypes.bool,
  /** id of target anchor */
  target: PropTypes.node.isRequired,
  /** toggle function necessary for switching between open and close state */
  toggle: PropTypes.func,
  /** placement of popover */
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ]),
  /** Header data */
  header: PropTypes.string,
  /** hide or show arrow */
  hideArrow: PropTypes.bool,
  /** Body data */
  body: PropTypes.node,
  /** Boundaries for popper, can be scrollParent, window, viewport, or any DOM element */
  boundariesElement: PropTypes.string,
};

Popover.defaultProps = {
  id: '',
  className: '',
  isOpen: false,
  target: '',
  placement: 'auto',
  toggle: _.noop,
  header: '',
  body: [],
  hideArrow: false,
  boundariesElement: '',
};

export default Popover;
