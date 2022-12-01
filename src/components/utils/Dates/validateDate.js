import _ from 'lodash';
import momentizeValue from './momentizeValue';

function validateDate(date, maxDate, minDate, shouldDisableDate, dateFormat, customErrorMessage = '') {
  const maxiDate = momentizeValue(maxDate);
  const miniDate = momentizeValue(minDate);
  let errors = [];

  if (!date) {
    return undefined;
  }

  if (maxiDate && date.isAfter(maxiDate)) {
    const errorMessage = customErrorMessage || `Date should not be after ${maxiDate.format(dateFormat)}`;

    errors = _.concat(errors, errorMessage);
  }

  if (miniDate && date.isSameOrBefore(miniDate)) {
    const errorMessage = customErrorMessage || `Date should be after ${miniDate.format(dateFormat)}`;

    errors = _.concat(errors, errorMessage);
  }

  if ((_.isFunction(shouldDisableDate) && shouldDisableDate(date)) || !date.isValid() || date.year() === 0) {
    errors = _.concat(errors, 'Invalid Date');
  }

  return _.join(errors, ',');
}

export default validateDate;
