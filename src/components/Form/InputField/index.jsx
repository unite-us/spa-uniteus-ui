import React, { PureComponent } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isFunction, isEqual, isEmpty } from 'lodash';
import { fieldProps, getPreferredProp } from '../utils';

/**
 * Input Component
 *
 */
class InputField extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const callback = getPreferredProp(this.props, 'onChange');

    if (isFunction(callback)) {
      callback(event);
    }
    if (isFunction(this.props.onChange) && !isEqual(this.props.onChange, getPreferredProp(this.props, 'onChange'))) {
      this.props.onChange(event);
    }
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      className,
      disabled,
      hideError,
      hideHint,
      hideLabel,
      hint,
      id,
      inline,
      label,
      labelClassName,
      mask,
      max,
      maxLength,
      min,
      placeholder,
      required,
      step,
      style,
      type,
    } = this.props;

    const hasError = getPreferredProp(this.props, 'invalid') && getPreferredProp(this.props, 'touched');

    const containerClass = () => classNames({
      'ui-input-field': true,
      'ui-form-field': true,
      'ui-form-field--inline': inline,
      'ui-form-field--has-error': hasError,
      'ui-form-field--disabled': disabled,
      'ui-input-field--has-error': hasError,
    }, className);

    const labelClass = () => classNames({
      'ui-form-field__label': true,
      [labelClassName]: !isEmpty(labelClassName),
      'ui-form-field__label--required': required,
      'sr-only': hideLabel,
    });

    return (
      <div
        className={containerClass()}
        style={style.container}
      >
        <label
          htmlFor={id}
          className={labelClass()}
          style={style.label}
        >
          {label}
        </label>
        <div>
          {
            mask ?
              <InputMask
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                disabled={disabled}
                id={id}
                name={getPreferredProp(this.props, 'name')}
                onBlur={getPreferredProp(this.props, 'onBlur')}
                onChange={this.onChange}
                onFocus={getPreferredProp(this.props, 'onFocus')}
                placeholder={placeholder}
                style={style.input}
                type={type}
                value={getPreferredProp(this.props, 'value')}
                mask={mask}
                maskChar="_"
              /> :
              <input
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                disabled={disabled}
                id={id}
                max={max}
                maxLength={maxLength}
                min={min}
                name={getPreferredProp(this.props, 'name')}
                onBlur={getPreferredProp(this.props, 'onBlur')}
                onChange={this.onChange}
                onFocus={getPreferredProp(this.props, 'onFocus')}
                placeholder={placeholder}
                step={step}
                style={style.input}
                type={type}
                value={getPreferredProp(this.props, 'value')}
              />
          }
          {
            !hideHint &&
            <div className="ui-form-field__hint" style={style.hint}>
              {hint}
            </div>
          }
          {
            !hideError &&
            <div className="ui-form-field__error" style={style.error}>
              {getPreferredProp(this.props, 'error')}
            </div>
          }
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  /** can be on or off or a specific type ie. 'name', 'address-line1' */
  autoComplete: PropTypes.string.isRequired,
  /** Should the input be focused on load? */
  autoFocus: PropTypes.bool,
  /** className for reference */
  className: PropTypes.string,
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Should the label be hidden? */
  hideLabel: PropTypes.bool,
  /** Help text displayed below the input */
  hint: PropTypes.node,
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** Should the label be displayed inline with the input? */
  inline: PropTypes.bool,
  /** label text for button */
  label: PropTypes.node.isRequired,
  /** mask characteristics */
  mask: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Remove Hint element */
  hideHint: PropTypes.bool,
  /** Remove Error element */
  hideError: PropTypes.bool,
  /** Is the field required */
  required: PropTypes.bool,
  /** granularity that is expected (and required) of the value */
  step: PropTypes.string,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    error: PropTypes.object,
    hint: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.object,
  }),
  /** Input type */
  type: PropTypes.string,
  /** Min allowed value when `type="number"` */
  min: PropTypes.number,
  /** Max allowed value when `type="number"` */
  max: PropTypes.number,
  /** Max allowed value when `type="text"` */
  maxLength: PropTypes.number,
  /** See fieldProps doc */
  ...fieldProps,
};

InputField.defaultProps = {
  autoComplete: 'on',
  autoFocus: false,
  className: '',
  disabled: false,
  hideError: false,
  hideHint: false,
  hideLabel: false,
  hint: '',
  inline: false,
  labelClassName: '',
  labelFlexInherit: false,
  mask: '',
  max: null,
  min: null,
  maxLength: 99,
  placeholder: '',
  required: false,
  step: 'any',
  style: {
    container: {},
    label: {},
    input: {},
    hint: {},
    error: {},
  },
  type: 'text',
};

export default InputField;
