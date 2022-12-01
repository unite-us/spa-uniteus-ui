import {
  join,
  concat,
  slice,
} from 'lodash';

const maskValue = (value, format) => {
  if (!value) {
    return '';
  }
  const reg = /\W/g;
  let newValue = value.replace(reg, '');
  let res = reg.exec(format);
  while (res !== null) {
    if (value.length > res.index) {
      newValue = join(concat(slice(newValue, 0, res.index), res, slice(newValue, res.index)), '');
    }
    res = reg.exec(format);
  }
  return newValue;
};

export default maskValue;
