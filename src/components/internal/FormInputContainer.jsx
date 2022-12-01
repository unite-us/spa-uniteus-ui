import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormInputContainer extends PureComponent {
  render() {
    const {
      children,
      className,
      error,
      hint,
      showError,
      showHint,
      styles,
    } = this.props;

    return (
      <div
        className={className}
        {...(styles.container ? { style: styles.container } : null)}
      >
        {children}
        {
          showHint && (
            <div
              className="ui-form-field__hint"
              {...(styles.hint ? { style: styles.hint } : null)}
            >
              {hint}
            </div>
          )
        }
        {
          showError && (
            <div
              className="ui-form-field__error"
              {...(styles.error ? { style: styles.error } : null)}
            >
              {error}
            </div>
          )
        }
      </div>
    );
  }
}

FormInputContainer.propTypes = {
  /** children props for content inside */
  children: PropTypes.node.isRequired,
  /** className for the container */
  className: PropTypes.string.isRequired,
  /** Error text displayed below the input */
  error: PropTypes.string,
  /** Help text displayed below the input */
  hint: PropTypes.string,
  /** Show Error HTML defaults to true */
  showError: PropTypes.bool,
  /** Show Hint HTML defaults to true */
  showHint: PropTypes.bool,
  /** Styles for container, error and hint */
  styles: PropTypes.shape({
    container: PropTypes.object,
    error: PropTypes.object,
    hint: PropTypes.object,
  }).isRequired,
};

FormInputContainer.defaultProps = {
  hint: null,
  error: null,
  showHint: true,
  showError: true,
};

export default FormInputContainer;
