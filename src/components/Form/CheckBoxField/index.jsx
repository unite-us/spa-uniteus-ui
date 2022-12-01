import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fieldProps, getPreferredProp } from '../utils';
import FormInputContainer from '../../internal/FormInputContainer';

/**
 * Toggle Component
 *
 */
class CheckBoxField extends PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.checked;
    const callback = getPreferredProp(this.props, 'onChange');
    if (_.isFunction(callback)) {
      callback(e);
    }
    if (_.isFunction(this.props.onChange) && this.props.onChange !== callback) {
      this.props.onChange(value);
    }
  }
  render() {
    const {
      className,
      style,
      inline,
      disabled,
      hideLabel,
      hint,
      id,
      label,
      labelPosition,
      showError,
      showHint,
    } = this.props;
    const hasError = getPreferredProp(this.props, 'invalid') && getPreferredProp(this.props, 'touched');
    const containerClass = () => classNames({
      'ui-checkbox-field': true,
      'ui-form-field': true,
      'ui-form-field--inline': inline,
      'ui-form-field--disabled': disabled,
      'ui-checkbox-field--has-error': hasError,
      'ui-form-field--has-error': hasError,
    }, className);

    const labelClass = () => classNames({
      'ui-form-field__label': true,
      'ui-form-field__label--left': labelPosition === 'left',
      'sr-only': hideLabel,
    });

    return (
      <FormInputContainer
        className={containerClass()}
        styles={style}
        hint={hint}
        error={getPreferredProp(this.props, 'error')}
        showError={showError}
        showHint={showHint}
      >
        <div>
          <input
            id={id}
            type="checkbox"
            checked={getPreferredProp(this.props, 'value') || getPreferredProp(this.props, 'checked')}
            onChange={this.onChange}
            onBlur={getPreferredProp(this.props, 'onBlur')}
            onFocus={getPreferredProp(this.props, 'onFocus')}
            name={getPreferredProp(this.props, 'name')}
            disabled={disabled}
          />
          <label
            htmlFor={id}
            className={labelClass()}
          >
            {label}
          </label>
        </div>
      </FormInputContainer>
    );
  }
}

/**
 * disable no-unused-prop-types handled by utility functions
*/
CheckBoxField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** is the Toggle checked or not */
  checked: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    input: PropTypes.object,
    hint: PropTypes.object,
  }),
  /** Should the label be hidden? */
  hideLabel: PropTypes.bool,
  /** label text for button */
  label: PropTypes.string.isRequired,
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['right', 'left']),
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Help text displayed below the input */
  hint: PropTypes.node,
  /** Show Error HTML defaults to true */
  showError: PropTypes.bool,
  /** Show Hint HTML defaults to true */
  showHint: PropTypes.bool,
  /** See fieldProps doc */
  ...fieldProps,
};

CheckBoxField.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  hideLabel: false,
  hint: '',
  labelPosition: 'right',
  showError: true,
  showHint: true,
  style: {
    container: {},
    label: {},
    input: {},
    hint: {},
    error: {},
  },
};

export default CheckBoxField;
