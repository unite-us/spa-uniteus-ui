/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useImperativeHandle, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import { getPreferredProp } from '../utils';
import SelectField from '../SelectField/index';
import DateField from '../DateField/index';

const hoursSelectionOptions = [...Array(12).keys()].map(hour =>
  ({ label: (hour + 1).toString().length === 1 ?
    `0${((hour + 1).toString())}` :
    (hour + 1).toString(),
  value: (hour + 1).toString() }));

const minutesSelectionOptions = [...Array(60).keys()].map(minute =>
  ({ label: minute.toString().length === 1 ?
    `0${minute.toString()}` :
    minute.toString(),
  value: minute.toString() }));

const AmOrPm = [{ label: 'am', value: 'am' }, { label: 'pm', value: 'pm' }];

const DateTime = React.forwardRef((props, ref) => {
  const epoch = props.field.initialValue;
  let newDate = '';
  let initialYear = '';
  let initialMonth = '';
  let initialDay = '';
  let initialHour = '';
  let initialMinute = '';
  let initialAmPm = '';
  if (isNumber(epoch)) {
    newDate = new Date(epoch * 1000);
    initialHour = newDate.getUTCHours();
    if (initialHour === 12) {
      initialAmPm = 'pm';
    } else if (initialHour > 12) {
      initialHour -= 12;
      initialAmPm = 'pm';
    } else if (initialHour === 0) {
      initialAmPm = 'am';
      initialHour = 12;
    } else {
      initialAmPm = 'am';
    }
    initialHour = initialHour.toString();
    initialMinute = newDate.getUTCMinutes().toString();
    initialYear = newDate.getUTCFullYear().toString();
    initialMonth = newDate.getUTCMonth().toString();
    initialDay = newDate.getUTCDate().toString();
  }

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);
  const [hours, setHour] = useState(initialHour);
  const [minutes, setMinute] = useState(initialMinute);
  const [amPm, setAmPm] = useState(initialAmPm);
  const initialDateValue = newDate !== '' ? new Date(Date.UTC(year, month, day)) : newDate;
  const [dateFieldValue, setDateFieldValue] = useState(initialDateValue);
  const dateField = useRef(null);

  const { inline, disabled, className, clearable, id, label, maxDate, minDate, required, hideError, style } = props;

  const hasError = getPreferredProp(props, 'invalid') && getPreferredProp(props, 'touched');


  const containerClass = () => classNames({
    'ui-input-field': true,
    'ui-form-field': true,
    'ui-datetime-field': true,
    'ui-form-field--inline': inline,
    'ui-form-field--has-error': hasError,
    'ui-form-field--disabled': disabled,
    'ui-input-field--has-error': hasError,
    'ui-select-field--has-error': hasError,
  }, className);

  useImperativeHandle(ref, () => ({ props }));

  useEffect(() => {
    if (dateField.current.state.value !== null && dateField.current.state.value.isValid() && hours !== '' && amPm !== '') {
      setDateFieldValue(dateField.current.state.value);
      let convertedHours = amPm === 'pm' ? (parseInt(hours, 10) + 12).toString() : hours;
      // If it is noon or midnight we need to set it to 0 or 12 hours.
      convertedHours = (convertedHours === '24' || convertedHours === '12') ?
        (parseInt(convertedHours, 10) - 12).toString() :
        convertedHours;
      const updatedDateTime = new Date(Date.UTC(year, month, day, convertedHours, minutes)) / 1000;
      getPreferredProp(props, 'onChange')(updatedDateTime.toString());
    } else {
      getPreferredProp(props, 'onChange')('');
    }
  }, [year, month, day, hours, minutes, amPm]);

  const updateCalendarValue = useCallback((calendarValue) => {
    const currentDate = new Date(calendarValue * 1000);
    setYear(currentDate.getUTCFullYear().toString());
    setMonth(currentDate.getUTCMonth().toString());
    setDay(currentDate.getUTCDate().toString());
  }, [setYear, setMonth, setDay]);

  const updateHours = useCallback((hourValue) => {
    setHour(hourValue);
  }, [setHour]);

  const updateMinutes = useCallback((minuteValue) => {
    setMinute(minuteValue);
  }, [setMinute]);

  const updateAmPm = useCallback((amPmValue) => {
    setAmPm(amPmValue);
  }, [setAmPm]);


  return (
    <div
      className={containerClass()}
    >
      <div className="ui-datetime-field__controls">
        <div className="ui-datetime-field__date-field">
          <DateField
            id={id}
            inline={false}
            label={label}
            onChange={updateCalendarValue}
            maxDate={maxDate}
            minDate={minDate}
            required={required}
            ref={dateField}
            value={dateFieldValue}
          />
        </div>
        <div className="time-selectors">
          <SelectField
            clearable={clearable}
            className="time-picker-field"
            label="Hours"
            options={hoursSelectionOptions}
            shouldSort={false}
            onChange={updateHours}
            required={required}
            value={hours}
          />
          <div className="time-colon">:</div>
          <SelectField
            clearable={clearable}
            className="time-picker-drop-downs"
            label="Minutes"
            options={minutesSelectionOptions}
            shouldSort={false}
            onChange={updateMinutes}
            required={required}
            value={minutes}
          />
          <SelectField
            clearable={clearable}
            className="time-picker-drop-downs"
            label="AM/PM"
            options={AmOrPm}
            shouldSort={false}
            onChange={updateAmPm}
            required={required}
            value={amPm}
          />
        </div>
      </div>
      {
        !hideError &&
        <div className="ui-form-field__error col-xs-12 date-time-error" style={style.error}>
          {getPreferredProp(props, 'error')}
        </div>
      }
    </div>
  );
});

DateTime.propTypes = {
  className: PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  hideError: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string,
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
  required: PropTypes.bool,
  style: PropTypes.object,
};
DateTime.defaultProps = {
  clearable: false,
  className: '',
  disabled: false,
  id: '',
  inline: false,
  label: 'Time Picker',
  maxDate: null,
  minDate: null,
  required: true,
  hideError: false,
  style: { error: {} },
};

export default DateTime;
