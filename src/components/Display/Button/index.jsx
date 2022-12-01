import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from 'lodash';

/**
 * Button Component
 *
 */
class Button extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { disabled } = this.props;
    if (!disabled) {
      this.props.onClick(e);
      this.buttonDOM.blur();
    }
  }

  render() {
    const {
      className,
      disabled,
      fullWidth,
      link,
      iconLeft,
      iconRight,
      id,
      label,
      secondary,
      shouldRender,
      style,
      type,
      primary,
      'data-test-element': dataTestElement,
      upperCase,
    } = this.props;

    if (!shouldRender) {
      return null;
    }

    const buttonClass = () => classNames({
      'ui-button': true,
      'ui-button--icon': iconLeft || iconRight,
      'ui-button--primary': primary,
      'ui-button--secondary': secondary,
      'ui-button--disabled': disabled,
      'ui-button--full-width': fullWidth,
      'ui-button--link': link,
      'ui-button--upper-case': upperCase,
    }, className);

    return (
      <button
        id={id}
        className={buttonClass()}
        aria-label={label}
        onClick={this.onClick}
        disabled={disabled}
        style={style}
        ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}
        type={type}
        data-test-element={dataTestElement}
      >
        {
          iconLeft ? (
            <span className="ui-button__icon-left">
              {iconLeft}
            </span>
          ) : null
        }
        {label}
        {
          iconRight ? (
            <span className="ui-button__icon-right">
              {iconRight}
            </span>
          ) : null
        }
      </button>
    );
  }
}

Button.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** label text for button */
  label: PropTypes.string,
  /**
   * Gets called when the user clicks(tap) on the button
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClick: PropTypes.func,
  /** value to determine button styles and configs Primary */
  primary: PropTypes.bool,
  /** value to determine button styles and configs */
  secondary: PropTypes.bool,
  /**
   * If true, the button will be disabled.
   *
   */
  disabled: PropTypes.bool,
  /**
   * If true, the button will be full width.
   *
   */
  fullWidth: PropTypes.bool,
  /**
   * If true, the button will be a link.
   *
   */
  link: PropTypes.bool,
  /** Conditional logic to determine if render || default value: true */
  shouldRender: PropTypes.bool,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Apply types on the button component i.e. "submit", "reset", "button", etc */
  type: PropTypes.string,
  /** Icon node element displayed on the left of the label */
  iconLeft: PropTypes.node,
  /** Icon node element displayed on the right of the label */
  iconRight: PropTypes.node,
  /** text style for button if wanting to uppercase */
  upperCase: PropTypes.bool,
  /** standardized attr for selectors */
  'data-test-element': PropTypes.string,
};

Button.defaultProps = {
  id: '',
  className: '',
  label: '',
  link: false,
  onClick: noop,
  primary: false,
  secondary: false,
  disabled: false,
  fullWidth: false,
  shouldRender: true,
  style: {},
  type: 'button',
  iconLeft: null,
  iconRight: null,
  'data-test-element': null,
  upperCase: false,
};

export default Button;
