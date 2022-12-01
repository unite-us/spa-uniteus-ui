import _ from 'lodash';
import momentizeValue from './momentizeValue';

function shouldDisableDay(day, maxDate, minDate, shouldDisableDate) {
  const maxiDate = momentizeValue(maxDate);
  const miniDate = momentizeValue(minDate);

  return (maxiDate && day.isAfter(maxiDate)) ||
    (miniDate && day.isSameOrBefore(miniDate)) ||
    (_.isFunction(shouldDisableDate) && shouldDisableDate(day));
}

export default shouldDisableDay;
