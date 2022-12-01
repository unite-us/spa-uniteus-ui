import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autosize from 'autosize';
import { isEmpty } from 'lodash';
import { fieldProps, getPreferredProp } from '../utils';

/**
 * TextField Component
 *
 */
class TextField extends Component {
  componentDidMount() {
    autosize(this.textarea);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (getPreferredProp(this.props, 'value') !== getPreferredProp(nextProps, 'value') && getPreferredProp(nextProps, 'value')) {
      setTimeout(() => {
        autosize.update(this.textarea);
      }, 50);
    }
  }

  componentWillUnmount() {
    autosize.destroy(this.textarea);
  }

  render() {
    const {
      afterLabelContent,
      autoFocus,
      className,
      labelClassName,
      disabled,
      hideLabel,
      hint,
      id,
      inline,
      label,
      placeholder,
      required,
      cols,
      rows,
      style,
    } = this.props;

    const hasError = getPreferredProp(this.props, 'invalid') && getPreferredProp(this.props, 'touched');

    const containerClass = () => classNames({
      'ui-text-field': true,
      'ui-form-field': true,
      'ui-form-field--inline': inline,
      'ui-form-field--inline-text-field-inline': inline,
      'ui-form-field--has-error': hasError,
      'ui-form-field--disabled': disabled,
      'ui-text-field--has-error': hasError,
    }, className);

    const labelClass = () => classNames({
      'ui-form-field__label': true,
      'ui-form-field__label--text-field': inline,
      'ui-form-field__label--required': required,
      [labelClassName]: !isEmpty(labelClassName),
      'sr-only': hideLabel,
    });

    const textareaWrapperClass = () => classNames({
      'textarea-wrapper': true,
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
        {afterLabelContent}
        <div className={textareaWrapperClass()}>
          <textarea
            id={id}
            value={getPreferredProp(this.props, 'value')}
            onChange={getPreferredProp(this.props, 'onChange')}
            onBlur={getPreferredProp(this.props, 'onBlur')}
            onFocus={getPreferredProp(this.props, 'onFocus')}
            placeholder={placeholder}
            name={getPreferredProp(this.props, 'name')}
            disabled={disabled}
            autoFocus={autoFocus}
            style={style.text}
            cols={cols}
            rows={rows}
            ref={(c) => { this.textarea = c; }}
          />
          <div className="ui-form-field__hint" style={style.hint}>
            {hint}
          </div>
          <div className="ui-form-field__error" style={style.error}>
            {getPreferredProp(this.props, 'error')}
          </div>
        </div>
      </div>
    );
  }
}

TextField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  /**
   * Override the inline-styles of the elements || **Not Recommended**
   * <br> ***note: currently overwritten by mysterious inline styles in `textarea`***
  */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    text: PropTypes.object,
    hint: PropTypes.object,
    error: PropTypes.object,
  }),
  /** label text for button */
  label: PropTypes.node.isRequired,
  /** insert content after label */
  afterLabelContent: PropTypes.node,
  /** Should the label be displayed inline with the input? */
  inline: PropTypes.bool,
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Should the label be hidden? */
  hideLabel: PropTypes.bool,
  /** Should the textfield be focused on load? */
  autoFocus: PropTypes.bool,
  /** Help text displayed below the input */
  hint: PropTypes.node,
  /** Is the field required */
  required: PropTypes.bool,
  /** number of columns for text area */
  cols: PropTypes.number,
  /** number of rows for text area */
  rows: PropTypes.number,
  /** See fieldProps doc */
  ...fieldProps,
};

TextField.defaultProps = {
  afterLabelContent: null,
  autoFocus: false,
  className: '',
  disabled: false,
  hideLabel: false,
  hint: '',
  inline: false,
  labelClassName: '',
  placeholder: '',
  required: false,
  cols: 50,
  rows: 4,
  style: {
    container: {},
    label: {},
    text: {},
    hint: {},
    error: {},
  },
};

export default TextField;
