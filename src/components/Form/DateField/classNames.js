import classNames from 'classnames';
import _ from 'lodash';

const containerClass = (props, state) => classNames({
  'ui-date-field': true,
  'ui-form-field': true,
  'ui-form-field--inline': props.inline,
  'ui-form-field--has-error': props.hasError,
  'ui-form-field--disabled': props.disabled,
  'ui-date-field--has-error': props.hasError,
  'ui-date-field--droptdown-open': state.isOpen,
}, props.className);

const labelClass = props => classNames({
  'ui-form-field__label': true,
  'ui-form-field__label--required': props.required,
  [props.labelClassName]: !_.isEmpty(props.labelClassName),
  'sr-only': props.hideLabel,
});
const dropDownClass = state => classNames({
  'ui-date-field__dropdown': true,
  'ui-date-field__dropdown--open': state.isOpen,
});

export {
  containerClass,
  labelClass,
  dropDownClass,
};
