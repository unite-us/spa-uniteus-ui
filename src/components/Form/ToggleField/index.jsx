import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fieldProps, getPreferredProp } from '../utils';

/**
 * Toggle Component
 *
 */
const ToggleField = (props) => {
  const {
    className,
    style,
    inline,
    disabled,
    hint,
    id,
    label,
    labelPosition,
  } = props;

  const containerClass = () => classNames({
    'ui-toggle-field': true,
    'ui-form-field': true,
    'ui-form-field--inline': inline,
    'ui-form-field--disabled': disabled,
  }, className);

  const labelClass = () => classNames({
    'ui-form-field__label': true,
    'ui-form-field__label--left': labelPosition === 'left',
  });

  return (
    <div
      className={containerClass()}
      style={style.container}
    >
      <div>
        <input
          id={id}
          type="checkbox"
          checked={getPreferredProp(props, 'value') || getPreferredProp(props, 'checked')}
          onChange={getPreferredProp(props, 'onChange')}
          onBlur={getPreferredProp(props, 'onBlur')}
          onFocus={getPreferredProp(props, 'onFocus')}
          name={getPreferredProp(props, 'name')}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={labelClass()}
        >
          {label}
        </label>
      </div>
      <div className="ui-form-field__hint" style={style.hint}>
        {hint}
      </div>
    </div>
  );
};

/**
 * disable no-unused-prop-types handled by utility functions
*/
ToggleField.propTypes = {
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
  /** label text for button */
  label: PropTypes.string.isRequired,
  /** Position of the label */
  labelPosition: PropTypes.oneOf(['right', 'left']),
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Help text displayed below the input */
  hint: PropTypes.node,
  /** See fieldProps doc */
  ...fieldProps,
};

ToggleField.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  hint: '',
  labelPosition: 'right',
  style: {
    container: {},
    label: {},
    input: {},
    hint: {},
  },
};

export default ToggleField;
