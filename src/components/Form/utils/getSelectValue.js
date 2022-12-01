import _ from 'lodash';

function recursiveSearch(value, valueKey, options) {
  const selectedOption = _.reduce(options, (acc, option) => {
    let result;
    if (_.has(option, 'children') && !_.isEmpty(option.children)) {
      result = recursiveSearch(value, valueKey, option.children);
    }
    if (result === undefined && _.get(option, valueKey, null) === value.value) {
      result = option;
    }
    return result === undefined ? acc : result;
  }, undefined);
  return selectedOption;
}

function getSelectValue(value, valueKey = 'value', options, forceObjectValue = false) {
  if (!value) {
    return '';
  }
  if (valueKey === 'value' && !forceObjectValue) {
    if (_.isArray(value)) {
      return _.map(value, 'value');
    }
    return value.value;
  }
  if (_.isArray(value)) {
    return _.map(value, val => recursiveSearch(val, valueKey, options));
  }
  return recursiveSearch(value, valueKey, options);
}

export default getSelectValue;
