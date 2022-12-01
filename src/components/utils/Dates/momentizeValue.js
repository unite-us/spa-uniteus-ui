import _ from 'lodash';
import moment from 'moment';

const momentizeValue = (value, format, isUtc) => {
  if (_.isNil(value) || value === '') {
    return null;
  }
  let date = null;
  if (/^[-]?\d+$/.test(value)) {
    date = moment.unix(value);
  } else if (_.isString(value) && !(value instanceof Date)) {
    date = moment(value, (format || 'MM/DD/YYYY'));
  } else {
    date = moment(value);
  }
  if (isUtc) {
    return date.utc();
  }
  return date;
};

export default momentizeValue;
