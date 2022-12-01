import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { fieldProps, getPreferredProp } from '../utils';

/**
 * RadioField Component
 *
*/

class RadioField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      loading: false,
    };
  }

  onChange(value) {
    const callback = getPreferredProp(this.props, 'onChange');
    if (_.isFunction(callback)) {
      callback(value);
    }
    if (_.isFunction(this.props.onChange) && !_.isEqual(this.props.onChange, getPreferredProp(this.props, 'onChange'))) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      options,
      className,
      labelClassName,
      id,
      style,
      inline,
      label,
      inlineLabel,
      postLabelContent,
      required,
    } = this.props;

    const hasError = getPreferredProp(this.props, 'invalid') && getPreferredProp(this.props, 'touched');

    const containerClass = () => classNames({
      'ui-radio-field': true,
      'ui-radio-field--inline': inline,
      'ui-form-field': true,
      'ui-form-field--has-error': hasError,
      'ui-radio-field--has-error': hasError,
    }, className);

    const labelClass = () => classNames({
      'ui-form-field__label': true,
      'ui-form-field__label--left': inlineLabel,
      'ui-radio-field__label': true,
      'ui-form-field__label--required': required,
      'ui-form-field__label--roman-label': !_.isEmpty(labelClassName) && labelClassName === 'ui-label-roman ui-label-roman--lowercase',
    });

    return (
      <div
        className={containerClass()}
        style={style.container}
      >
        {
          !_.isEmpty(label) &&
            <div className={labelClass()} style={style.label}>
              {label}
            </div>
        }
        {postLabelContent}
        {
          _.map(options, (opt, index) => (
            <div className="ui-radio-field__item" key={index}>
              <label htmlFor={`${id}-${index}`}>
                <input
                  id={`${id}-${index}`}
                  type="radio"
                  name={getPreferredProp(this.props, 'name')}
                  checked={getPreferredProp(this.props, 'value') === opt.value}
                  onChange={this.onChange}
                  onBlur={getPreferredProp(this.props, 'onBlur')}
                  onFocus={getPreferredProp(this.props, 'onFocus')}
                  disabled={opt.disabled}
                  style={style.input}
                  value={opt.value}
                />
                <span id={`${opt.value}-label`}>
                  {opt.label}
                </span>
              </label>
            </div>
          ))
        }
        <div className="ui-form-field__error" style={style.error}>
          {getPreferredProp(this.props, 'error')}
        </div>
      </div>
    );
  }
}

RadioField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  /** array of options consist of value and label */
  options: PropTypes.array,
  /** Text of the label */
  label: PropTypes.string,
  /** If true, Radio Buttons will be displayed inline */
  inline: PropTypes.bool,
  /** If true, Radio Label will be displayed inline */
  inlineLabel: PropTypes.bool,
  /** Content block that is placed between the label and the field */
  postLabelContent: PropTypes.node,
  /** Is the field required */
  required: PropTypes.bool,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    text: PropTypes.object,
    error: PropTypes.object,
  }),
  /** See fieldProps doc */
  ...fieldProps,
};

RadioField.defaultProps = {
  id: '',
  className: '',
  options: [],
  inlineLabel: false,
  label: '',
  labelClassName: '',
  postLabelContent: null,
  required: false,
  style: {
    container: {},
    label: {},
    input: {},
    error: {},
  },
  inline: false,
};

export default RadioField;
