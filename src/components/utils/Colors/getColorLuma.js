import _ from 'lodash';
import hexToRgb from './hexToRgb';

export default function getColorLuma(color) {
  let c = {};
  if (_.isString(color)) {
    c = hexToRgb(color);
  } else if (_.isObject(color)) {
    c = color;
  }
  // per ITU-R BT.709
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; // eslint-disable-line no-mixed-operators
}
