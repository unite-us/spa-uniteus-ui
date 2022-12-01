import PropTypes from 'prop-types';

const fieldProps = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  valid: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  pristine: PropTypes.bool,
  dirty: PropTypes.bool,
  visited: PropTypes.bool,
  error: PropTypes.string,
  /** Redux-Form 7 input prop */
  input: PropTypes.object,
  /** Redux-Form 7 meta prop */
  meta: PropTypes.object,
  /** Redux-Form 5 field prop */
  field: PropTypes.object,
};

export default fieldProps;
