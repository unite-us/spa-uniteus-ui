import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

export const getDays = (year, month) => {
  const firstDay = moment({ year, month }).startOf('month').startOf('week');
  const lastDay = moment({ year, month }).endOf('month').endOf('week');
  let days = [];
  let day = firstDay;
  do {
    days = _.concat(days, _.cloneDeep(day));
    day = day.add(1, 'day');
  } while (day.isBefore(lastDay));
  return _.chunk(days, 7);
};

export const isDayInArray = (day, daysArray, isUtc = false) =>
  _.some(daysArray, (selected) => {
    if (isUtc) {
      return day.utc().isSame(moment(selected), 'day');
    }
    return day.isSame(moment(selected), 'day');
  });

export const isDaySelected = (day, selectedDays, dateRange, isUtc) => {
  if (dateRange.start || dateRange.end) {
    return isDayInArray(day, [dateRange.start, dateRange.end], isUtc);
  }
  return isDayInArray(day, selectedDays, isUtc);
};

export const isDayDisabled = (day, disabledDays, shouldDisableDay) =>
  isDayInArray(day, disabledDays) || shouldDisableDay(day);

export const isDayInRange = (day, dateRange) => {
  if (dateRange.start && dateRange.end) {
    return day.isBetween(moment(dateRange.start), moment(dateRange.end), 'day');
  }
  return false;
};

export const isDayOutOfMonth = (day, month) => day.month() !== month;

const Calendar = (props) => {
  const {
    weekDays,
    year,
    month,
    selectedDays,
    onDayClick,
    disabledDays,
    className,
    id,
    style,
    shouldDisableDay,
    dateRange,
    isUtc,
  } = props;
  const days = getDays(year, month);

  const calendarClass = () => classNames({
    'ui-calendar': true,
  }, className);

  const dayClass = day => classNames({
    'ui-calendar__day': true,
    'ui-calendar__day--selected': isDaySelected(day, selectedDays, dateRange, isUtc),
    'ui-calendar__day--disabled': isDayDisabled(day, disabledDays, shouldDisableDay),
    'ui-calendar__day--out-of-month': isDayOutOfMonth(day, month),
    'ui-calendar__day--in-range': isDayInRange(day, dateRange) && !isDayOutOfMonth(day, month),
  });

  const onKeyPress = (e, day) => {
    e.preventDefault();
    if (e.charCode === 13 || e.charCode === 32) {
      onDayClick(day);
    }
  };

  return (
    <div
      className={calendarClass()}
      id={id}
      style={style.container}
    >
      <table>
        <thead>
          <tr>
            { weekDays.map(day => (<th key={`week-day-${day}`}>{day}</th>)) }
          </tr>
        </thead>
        <tbody>
          {
            days.map(week => (
              <tr key={`week-${week[0].week()}`}>
                {week.map(day => (
                  <td
                    key={`day-${day.dayOfYear()}`}
                    className={dayClass(day)}
                  >
                    <div
                      role="button"
                      onClick={() => (isDayDisabled(day, disabledDays, shouldDisableDay) ? _.noop() : onDayClick(day))}
                      tabIndex={isDayDisabled(day, disabledDays, shouldDisableDay) ? -1 : 0}
                      onKeyPress={e => onKeyPress(e, day)}
                    >
                      {day.date()}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

Calendar.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
  }),
  /** Current month to display */
  month: PropTypes.number.isRequired,
  /** Current year to display */
  year: PropTypes.number.isRequired,
  /** List of week days label */
  weekDays: PropTypes.array,
  /** Day click callback. Passes the moment Object */
  onDayClick: PropTypes.func,
  /** List of selected days. Can be a moment object or anything moment can parse */
  selectedDays: PropTypes.array,
  /** List of disabled days. Can be a moment object or anything moment can parse */
  disabledDays: PropTypes.array,
  /** Function returning a boolean */
  shouldDisableDay: PropTypes.func,
  /** Start and end date. This overrides the selectedDays prop */
  dateRange: PropTypes.shape({
    start: PropTypes.any,
    end: PropTypes.any,
  }),
  /** are the dates in UTC format? */
  isUtc: PropTypes.bool,
};

Calendar.defaultProps = {
  id: '',
  className: '',
  style: {
    container: {},
  },
  weekDays: [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
  ],
  onDayClick: _.noop,
  selectedDays: [],
  disabledDays: [],
  shouldDisableDay: _.noop,
  dateRange: {
    start: null,
    end: null,
  },
  isUtc: true,
};

export default Calendar;
