import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import Icon from '../../Display/Icon';
import { getPreferredProp } from '../utils';
import {
  maskValue,
  momentizeValue,
  convertToUnixTimestamp,
  validateDate,
  shouldDisableDay,
} from '../../utils/Dates';
import { getPropagationPath } from '../../utils/Browser';
import Calendar from '../Calendar';

class DurationField extends Component {
  constructor(props) {
    super(props);

    this.onCalendarClick = this.onCalendarClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onPreviousMonth = this.onPreviousMonth.bind(this);
    this.onNextMonth = this.onNextMonth.bind(this);
    this.onEditYear = this.onEditYear.bind(this);
    this.onFakeInputKeyPress = this.onFakeInputKeyPress.bind(this);
    this.getFormatedRange = this.getFormatedRange.bind(this);
    this.isClickOutside = this.isClickOutside.bind(this);
    this.validate = this.validate.bind(this);

    const startValue = momentizeValue(getPreferredProp(props, 'value', props.startFieldPath), props.dateFormat, props.isUtc);
    const endValue = momentizeValue(getPreferredProp(props, 'value', props.endFieldPath), props.dateFormat, props.isUtc);

    this.state = {
      isOpen: false,
      startValue,
      endValue,
      startInputValue: null,
      endInputValue: null,
      yearValue: null,
      year: startValue && startValue.isValid() ? startValue.year() : moment().year(),
      month: startValue && startValue.isValid() ? startValue.month() : moment().month(),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      startFieldPath,
      endFieldPath,
    } = this.props;
    if (getPreferredProp(this.props, 'value', startFieldPath) !== getPreferredProp(nextProps, 'value', startFieldPath)) {
      const value = momentizeValue(getPreferredProp(nextProps, 'value', startFieldPath), nextProps.dateFormat, nextProps.isUtc);
      this.setState({
        startValue: value,
        year: value ? value.year() : moment().year(),
        month: value ? value.month() : moment().month(),
      });
    }
    if (getPreferredProp(this.props, 'value', endFieldPath) !== getPreferredProp(nextProps, 'value', endFieldPath)) {
      const value = momentizeValue(getPreferredProp(nextProps, 'value', endFieldPath), nextProps.dateFormat, nextProps.isUtc);
      this.setState({
        endValue: value,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.isClickOutside);
  }

  onCalendarClick(e) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen) {
        document.addEventListener('click', this.isClickOutside);
      } else {
        document.removeEventListener('click', this.isClickOutside);
      }
    });
  }

  onInputChange(e, path) {
    let value = _.get(e, 'target.value', '');
    if (this.props.useMask) {
      value = maskValue(value, this.props.dateFormat);
    }
    this.setState({ [`${path}InputValue`]: value });
  }

  onChange() {
    let startValue = this.state.startValue;
    let endValue = this.state.endValue;
    const {
      startFieldPath,
      endFieldPath,
    } = this.props;
    if (startValue && endValue && startValue.isAfter(endValue)) {
      startValue = this.state.endValue;
      endValue = this.state.startValue;
    }
    if (this.props.isUtc) {
      startValue = startValue && moment.utc(startValue.format(this.props.dateFormat), this.props.dateFormat);
      endValue = endValue && moment.utc(endValue.format(this.props.dateFormat), this.props.dateFormat);
    }
    if (_.isFunction(this.props.valueFormat)) {
      getPreferredProp(this.props, 'onChange', startFieldPath)(startValue ? this.props.valueFormat(startValue) : '');
      getPreferredProp(this.props, 'onChange', endFieldPath)(endValue ? this.props.valueFormat(endValue) : '');
    } else {
      getPreferredProp(this.props, 'onChange', startFieldPath)(startValue ? startValue.format(this.props.valueFormat) : '');
      getPreferredProp(this.props, 'onChange', endFieldPath)(endValue ? endValue.format(this.props.valueFormat) : '');
    }
  }

  onBlur(e, path) {
    if (e.target.value.length < 3) {
      this.setState({
        [`${path}InputValue`]: null,
      });
      return;
    }

    const oldValue = _.get(this.state, `${path}InputValue`, null);
    const fieldPath = _.get(this.props, `${path}FieldPath`, null);
    if (!_.isNull(oldValue)) {
      const value = momentizeValue(e.target.value, this.props.dateFormat, this.props.isUtc);
      this.setState({
        [`${path}InputValue`]: null,
        [`${path}Value`]: value,
        year: value && value.isValid() ? value.year() : moment().year(),
        month: value && value.isValid() ? value.month() : moment().month(),
      }, this.onChange);
    }

    if (_.isFunction(getPreferredProp(this.props, 'onBlur', fieldPath))) {
      getPreferredProp(this.props, 'onBlur', fieldPath)();
    }
  }

  onDaySelect(day, secondary) {
    const value = this.props.isUtc ? day.utc() : day;
    const {
      startFieldPath,
      endFieldPath,
    } = this.props;

    let startValue = this.state.startValue;
    let endValue = this.state.endValue;
    let stayOpen = true;
    let year = this.state.year;
    let month = this.state.month;

    if (!secondary) {
      year = value && value.isValid() ? value.year() : moment().year();
      month = value && value.isValid() ? value.month() : moment().month();
    }

    if (this.state.startValue && !this.state.endValue) {
      startValue = this.state.startValue;
      endValue = day;
      stayOpen = false;
    } else {
      startValue = day;
      endValue = null;
    }

    this.setState({
      isOpen: stayOpen,
      startValue,
      endValue,
      year,
      month,
    }, () => {
      if (!stayOpen) {
        if (_.isFunction(getPreferredProp(this.props, 'onBlur', startFieldPath))) {
          getPreferredProp(this.props, 'onBlur', startFieldPath)();
        }
        if (_.isFunction(getPreferredProp(this.props, 'onBlur', endFieldPath))) {
          getPreferredProp(this.props, 'onBlur', endFieldPath)();
        }
        document.removeEventListener('click', this.isClickOutside);
      }
      this.onChange();
    });
  }

  onPreviousMonth() {
    const prev = moment({ month: this.state.month, year: this.state.year }).subtract(1, 'month');
    this.setState({ month: prev.month(), year: prev.year() });
  }

  onNextMonth() {
    const next = moment({ month: this.state.month, year: this.state.year }).add(1, 'month');
    this.setState({ month: next.month(), year: next.year() });
  }

  onEditYear(e) {
    const value = _.slice(e.target.value, 0, 4).toString().replace(/\D/g, '');
    this.setState({ yearValue: value }, () => {
      if (value && value.length === 4) {
        this.setState({ year: parseInt(value, 10), yearValue: null });
      }
    });
  }

  onFakeInputKeyPress(e) {
    e.preventDefault();
    if (e.charCode === 13 || e.charCode === 32) {
      this.onCalendarClick(e);
    }
  }

  getFormatedRange() {
    const { dateFormat } = this.props;
    const start = this.state.startValue ? this.state.startValue.format(dateFormat) : null;
    const end = this.state.endValue ? this.state.endValue.format(dateFormat) : null;

    const separator = this.state.startValue || this.state.endValue ? this.props.separator : null;

    return _.compact([start, separator, end]).join(' ');
  }

  getInputValue(path) {
    const value = _.get(this.state, `${path}Value`, null);
    const inputValue = _.get(this.state, `${path}InputValue`, null);
    if (_.isNil(inputValue)) {
      if (value) {
        return value.format(this.props.dateFormat);
      }
      return '';
    }
    return inputValue;
  }

  isClickOutside(e) {
    const {
      startFieldPath,
      endFieldPath,
    } = this.props;

    if (!_.includes(getPropagationPath(e), this.element)) {
      this.setState({ isOpen: false }, () => {
        if (_.isFunction(getPreferredProp(this.props, 'onBlur', startFieldPath))) {
          getPreferredProp(this.props, 'onBlur', startFieldPath)();
        }
        if (_.isFunction(getPreferredProp(this.props, 'onBlur', endFieldPath))) {
          getPreferredProp(this.props, 'onBlur', endFieldPath)();
        }
        document.removeEventListener('click', this.isClickOutside);
      });
    }
  }

  validate(value) {
    const {
      maxDate,
      minDate,
      shouldDisableDate,
      dateFormat,
      isUtc,
    } = this.props;
    const date = momentizeValue(value, dateFormat, isUtc);
    return validateDate(date, maxDate, minDate, shouldDisableDate, dateFormat);
  }

  render() {
    const {
      className,
      labelClassName,
      dateFormat,
      disabled,
      endField,
      hideLabel,
      hint,
      id,
      inline,
      isUtc,
      label,
      maxDate,
      minDate,
      placeholder,
      required,
      shouldDisableDate,
      startField,
      style,
      name,
      startFieldPath,
      endFieldPath,
    } = this.props;

    const fields = [
      startField,
      endField,
    ];

    const fieldPaths = [
      startFieldPath,
      endFieldPath,
    ];
    const hasError = _.every(fields, (field, index) => getPreferredProp(this.props, 'touched', fieldPaths[index])) &&
      (
        _.some(fields, (field, index) => getPreferredProp(this.props, 'invalid', fieldPaths[index])) ||
        (this.state.startValue && !this.state.startValue.isValid()) ||
        (this.state.endValue && !this.state.endValue.isValid())
      );

    const nextMonth = moment({ year: this.state.year, month: this.state.month }).add(1, 'month');

    const containerClass = () => classNames({
      'ui-duration-field': true,
      'ui-form-field': true,
      'ui-form-field--inline': inline,
      'ui-form-field--has-error': hasError,
      'ui-form-field--disabled': disabled,
      'ui-duration-field--has-error': hasError,
      'ui-duration-field--droptdown-open': this.state.isOpen,
    }, className);
    const labelClass = () => classNames({
      'ui-form-field__label': true,
      'ui-form-field__label--required': required,
      [labelClassName]: !_.isEmpty(labelClassName),
      'sr-only': hideLabel,
    });
    const dropDownClass = () => classNames({
      'ui-duration-field__dropdown': true,
      'ui-duration-field__dropdown--open': this.state.isOpen,
    });

    return (
      <div
        className={containerClass()}
        style={style.container}
        ref={(c) => { this.element = c; }}
      >
        <label
          htmlFor={id}
          className={labelClass()}
          style={style.label}
        >
          {label}
        </label>
        <div>
          <button
            id={id}
            className="ui-duration-field__fake-input"
            onClick={this.onCalendarClick}
            disabled={disabled}
            onKeyPress={this.onFakeInputKeyPress}
          >
            {this.getFormatedRange()}
          </button>
          <div className="ui-date-field__calendar-icon">
            <Icon
              icon="IconCalendar"
              disabled={disabled || (this.state.startValue && !this.state.startValue.isValid())}
              onClick={this.onCalendarClick}
            />
          </div>
          <div className={dropDownClass()}>
            <div className="ui-duration-field__inputs">
              <label
                htmlFor={`${id}-start`}
                className="sr-only"
              >
                Start Date
              </label>
              <input
                id={`${id}-start`}
                value={this.getInputValue('start')}
                onChange={e => this.onInputChange(e, 'start')}
                onBlur={e => this.onBlur(e, 'start')}
                onFocus={getPreferredProp(this.props, 'onFocus', startFieldPath)}
                placeholder={placeholder || dateFormat}
                name={`${name}-start`}
                disabled={disabled}
                type="text"
                style={style.input}
              />
              <label
                htmlFor={`${id}-end`}
                className="sr-only"
              >
                End Date
              </label>
              <input
                id={`${id}-end`}
                value={this.getInputValue('end')}
                onChange={e => this.onInputChange(e, 'end')}
                onBlur={e => this.onBlur(e, 'end')}
                onFocus={getPreferredProp(this.props, 'onFocus', endFieldPath)}
                placeholder={placeholder || dateFormat}
                name={`${name}-end`}
                disabled={disabled}
                type="text"
                style={style.input}
              />
            </div>
            <div className="ui-duration-field__controls">
              <Icon
                icon="IconChevronLeft"
                onClick={this.onPreviousMonth}
              />
              <div>
                <span>
                  {moment({ month: this.state.month, year: this.state.year }).format('MMMM')}&nbsp;
                </span>
                <label
                  htmlFor={`${id}-start-year`}
                  className="sr-only"
                >
                  Start Year
                </label>
                <input
                  id={`${id}-start-year`}
                  value={_.isNull(this.state.yearValue) ? this.state.year : this.state.yearValue}
                  onChange={this.onEditYear}
                />
              </div>
              <div>
                <span>
                  {moment({ month: nextMonth.month(), year: nextMonth.year() }).format('MMMM')}&nbsp;
                </span>
                <label
                  htmlFor={`${id}-end-year`}
                  className="sr-only"
                >
                  End Year
                </label>
                <input
                  id={`${id}-end-year`}
                  value={_.isNull(this.state.yearValue) ? nextMonth.year() : this.state.yearValue}
                  onChange={this.onEditYear}
                />
              </div>
              <Icon
                icon="IconChevronRight"
                onClick={this.onNextMonth}
              />
            </div>
            <div className="ui-duration-field__calendars">
              <Calendar
                year={this.state.year}
                month={this.state.month}
                onDayClick={this.onDaySelect}
                dateRange={{
                  start: this.state.startValue,
                  end: this.state.endValue,
                }}
                isUtc={isUtc}
                shouldDisableDay={day => shouldDisableDay(day, maxDate, minDate, shouldDisableDate)}
              />
              <Calendar
                year={nextMonth.year()}
                month={nextMonth.month()}
                onDayClick={day => this.onDaySelect(day, true)}
                dateRange={{
                  start: this.state.startValue,
                  end: this.state.endValue,
                }}
                isUtc={isUtc}
                shouldDisableDay={day => shouldDisableDay(day, maxDate, minDate, shouldDisableDate)}
              />
            </div>
          </div>
          <div className="ui-form-field__hint" style={style.hint}>
            {hint}
          </div>
          <div className="ui-form-field__error" style={style.error}>
            {getPreferredProp(this.props, 'error', startFieldPath)}
            {getPreferredProp(this.props, 'error', endFieldPath)}
          </div>
        </div>
      </div>
    );
  }
}

DurationField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    input: PropTypes.object,
    hint: PropTypes.object,
    error: PropTypes.object,
  }),
  /** label text for button */
  label: PropTypes.string.isRequired,
  /** Input name */
  name: PropTypes.string,
  /** Should the label be displayed inline with the input? */
  inline: PropTypes.bool,
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Should the label be hidden? */
  hideLabel: PropTypes.bool,
  /** Help text displayed below the input */
  hint: PropTypes.node,
  /** Is the field required */
  required: PropTypes.bool,
  /** How the date should be formated in the input */
  dateFormat: PropTypes.string,
  /** String between the two Dates */
  separator: PropTypes.string,
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
  ]),
  /** Min permitted date */
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /**
   * Should this date be disabled?
   * @param date:moment
   */
  shouldDisableDate: PropTypes.func,
  /** See fieldProps doc */
  startField: PropTypes.object,
  /** See fieldProps doc */
  endField: PropTypes.object,
  /** Should the input use the mask according to the dateFormat? */
  useMask: PropTypes.bool,
  /** if the Field is on a different path than props.startField */
  startFieldPath: PropTypes.string,
  /** if the Field is on a different path than props.endField */
  endFieldPath: PropTypes.string,
};

DurationField.defaultProps = {
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
  shouldDisableDate: () => false,
  separator: '-',
  useMask: true,
  startField: {},
  endField: {},
  startFieldPath: 'startField',
  endFieldPath: 'endField',
};

export default DurationField;
