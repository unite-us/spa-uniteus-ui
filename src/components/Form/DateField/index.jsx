import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import Icon from '../../Display/Icon';

import {
  maskValue,
  momentizeValue,
  convertToUnixTimestamp,
  validateDate,
  shouldDisableDay,
} from '../../utils/Dates';
import { getPropagationPath } from '../../utils/Browser';
import { fieldProps, getPreferredProp } from '../utils';
import Calendar from '../Calendar';
import {
  containerClass,
  labelClass,
  dropDownClass,
} from './classNames';

const Dropdown = props => (
  <div className={dropDownClass(props.state)}>
    <div className="ui-date-field__controls">
      <Icon
        icon="IconChevronLeft"
        onClick={props.onPreviousMonth}
      />
      <div>
        <span>
          {moment({ month: props.state.month, year: props.state.year }).format('MMMM')}&nbsp;
        </span>
        <label
          htmlFor={`${props.id}-year-input`}
          className="sr-only"
        >
          Year
        </label>
        <input
          id={`${props.id}-year-input`}
          value={_.isNull(props.state.yearValue) ? props.state.year : props.state.yearValue}
          onChange={props.onEditYear}
        />
      </div>
      <Icon
        icon="IconChevronRight"
        onClick={props.onNextMonth}
      />
    </div>
    <Calendar
      year={props.state.year}
      month={props.state.month}
      onDayClick={props.onDaySelect}
      selectedDays={[props.state.value]}
      isUtc={props.isUtc}
      shouldDisableDay={day => shouldDisableDay(day, props.maxDate, props.minDate, props.shouldDisableDate)}
    />
  </div>
);

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  isUtc: PropTypes.bool.isRequired,
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  onDaySelect: PropTypes.func.isRequired,
  onEditYear: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
  onPreviousMonth: PropTypes.func.isRequired,
  shouldDisableDate: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

Dropdown.defaultProps = {
  maxDate: null,
  minDate: null,
};

class DateField extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onCalendarClick = this.onCalendarClick.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onPreviousMonth = this.onPreviousMonth.bind(this);
    this.onNextMonth = this.onNextMonth.bind(this);
    this.onEditYear = this.onEditYear.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.isClickOutside = this.isClickOutside.bind(this);
    this.validate = this.validate.bind(this);
    this.triggerOnBlur = this.triggerOnBlur.bind(this);

    const value = momentizeValue(getPreferredProp(props, 'value'), props.dateFormat, props.isUtc);
    this.state = {
      isOpen: false,
      value,
      inputValue: null,
      yearValue: null,
      year: value ? value.year() : moment().year(),
      month: value ? value.month() : moment().month(),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (getPreferredProp(this.props, 'value') !== getPreferredProp(nextProps, 'value')) {
      const value = momentizeValue(getPreferredProp(nextProps, 'value'), nextProps.dateFormat, nextProps.isUtc);
      this.setState({
        value,
        year: value ? value.year() : moment().year(),
        month: value ? value.month() : moment().month(),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.isClickOutside, true);
  }

  onInputChange(e) {
    let value = _.get(e, 'target.value', '');
    if (this.props.useMask) {
      value = maskValue(value, this.props.dateFormat);
    }
    this.setState({ inputValue: value, isOpen: false });
  }

  onChange(date) {
    if (!date) {
      return getPreferredProp(this.props, 'onChange')('');
    }
    const value = this.props.isUtc ? moment.utc(moment(date).format(this.props.dateFormat), this.props.dateFormat) : moment(date);

    if (_.isFunction(this.props.valueFormat)) {
      return getPreferredProp(this.props, 'onChange')(this.props.valueFormat(value));
    }
    return getPreferredProp(this.props, 'onChange')(value.format(this.props.valueFormat));
  }

  onBlur(e) {
    if (e.target.value.length < 3) {
      this.setState({
        inputValue: null,
        value: null,
      });
      this.onChange('');
      this.triggerOnBlur();
      return;
    }
    if (!_.isNull(this.state.inputValue)) {
      const value = momentizeValue(e.target.value, this.props.dateFormat, this.props.isUtc);
      this.setState({
        inputValue: null,
        value,
        year: value ? value.year() : moment().year(),
        month: value ? value.month() : moment().month(),
      }, () => this.onChange(value));
    }
    this.triggerOnBlur();
  }

  onCalendarClick() {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        document.addEventListener('click', this.isClickOutside, true);
      } else {
        document.removeEventListener('click', this.isClickOutside, true);
      }
    });
  }

  onDaySelect(day) {
    const value = this.props.isUtc ? day.utc() : day;
    this.setState({
      isOpen: false,
      value,
      year: value ? value.year() : moment().year(),
      month: value ? value.month() : moment().month(),
    }, () => {
      document.removeEventListener('click', this.isClickOutside, true);
      this.onChange(day);
    });
  }

  onPreviousMonth() {
    const prev = moment({ month: this.state.month, year: this.state.year }).subtract(1, 'month');
    this.setState({ month: prev.month(), year: prev.year(), isOpen: true });
  }

  onNextMonth() {
    const next = moment({ month: this.state.month, year: this.state.year }).add(1, 'month');
    this.setState({ month: next.month(), year: next.year(), isOpen: true });
  }

  onEditYear(e) {
    const value = _.slice(e.target.value, 0, 4).toString().replace(/\D/g, '');
    this.setState({ yearValue: value }, () => {
      if (value && value.length === 4) {
        this.setState({ year: parseInt(value, 10), yearValue: null });
      }
    });
  }

  getInputValue() {
    if (_.isNil(this.state.inputValue)) {
      if (this.state.value) {
        return this.state.value.format(this.props.dateFormat);
      }
      return '';
    }
    return this.state.inputValue;
  }

  isClickOutside(e) {
    if (!_.includes(getPropagationPath(e), this.element)) {
      this.setState({ isOpen: false }, () => {
        if (_.isFunction(getPreferredProp(this.props, 'onBlur'))) {
          getPreferredProp(this.props, 'onBlur')();
        }
        document.removeEventListener('click', this.isClickOutside, true);
      });
    }
  }

  triggerOnBlur() {
    const propsOnBlur = getPreferredProp(this.props, 'onBlur');
    if (_.isFunction(propsOnBlur)) {
      propsOnBlur();
    }
  }

  validate(value) {
    const {
      maxDate,
      minDate,
      customErrorMessage,
      shouldDisableDate,
      dateFormat,
      isUtc,
    } = this.props;
    const date = momentizeValue(value, dateFormat, isUtc);
    return validateDate(date, maxDate, minDate, shouldDisableDate, dateFormat, customErrorMessage);
  }

  render() {
    const {
      dateFormat,
      disabled,
      hint,
      id,
      isUtc,
      label,
      maxDate,
      minDate,
      placeholder,
      shouldDisableDate,
      style,
    } = this.props;

    const hasError = (getPreferredProp(this.props, 'invalid') &&
      getPreferredProp(this.props, 'touched')) ||
      (this.state.value && !this.state.value.isValid());

    return (
      <div
        className={containerClass({ ...this.props, hasError }, this.state)}
        style={style.container}
        ref={(c) => { this.element = c; }}
      >
        <label
          htmlFor={id}
          className={labelClass(this.props)}
          style={style.label}
        >
          {label}
        </label>
        <div>
          <input
            id={id}
            value={this.getInputValue()}
            onChange={this.onInputChange}
            onBlur={this.onBlur}
            onFocus={getPreferredProp(this.props, 'onFocus')}
            placeholder={placeholder || dateFormat}
            name={getPreferredProp(this.props, 'name')}
            disabled={disabled}
            type="text"
            style={style.input}
          />
          <div className="ui-date-field__calendar-icon">
            <Icon
              icon="IconCalendar"
              onClick={this.onCalendarClick}
              disabled={disabled || (this.state.value && !this.state.value.isValid())}
            />
          </div>
          <Dropdown
            isUtc={isUtc}
            maxDate={maxDate}
            minDate={minDate}
            onDaySelect={this.onDaySelect}
            onEditYear={this.onEditYear}
            onNextMonth={this.onNextMonth}
            onPreviousMonth={this.onPreviousMonth}
            shouldDisableDate={shouldDisableDate}
            state={this.state}
            id={id}
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

/**
 * disable no-unused-prop-types handled by utility functions
*/
DateField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    input: PropTypes.object,
    hint: PropTypes.object,
    error: PropTypes.object,
  }),
  /** label text for button */
  label: PropTypes.node.isRequired,
  /** Should the label be displayed inline with the input? */
  inline: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Should the label be hidden? */
  hideLabel: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /** Help text displayed below the input */
  hint: PropTypes.node,
  /** Is the field required */
  required: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /** How the date should be formated in the input */
  dateFormat: PropTypes.string,
  /**
   * Specify the value format you want
   * @param date:moment
   */
  valueFormat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Should the component work with UTC moment? */
  isUtc: PropTypes.bool,
  /** Max permitted date */
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  /** Min permitted date */
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  /**
   * Should this date be disabled?
   * @param date:moment
   */
  shouldDisableDate: PropTypes.func,
  /** Should the input use the mask according to the dateFormat? */
  useMask: PropTypes.bool,
  /** See fieldProps doc */
  ...fieldProps,
};

DateField.defaultProps = {
  className: '',
  disabled: false,
  hideLabel: false,
  hint: '',
  inline: false,
  labelClassName: '',
  name: '',
  placeholder: '',
  required: false,
  style: {
    container: {},
    label: {},
    input: {},
    hint: {},
    error: {},
  },
  dateFormat: 'MM/DD/YYYY',
  valueFormat: convertToUnixTimestamp,
  isUtc: true,
  maxDate: null,
  minDate: null,
  customErrorMessage: '',
  shouldDisableDate: () => false,
  useMask: true,
};

export default DateField;
