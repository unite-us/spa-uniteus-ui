import { get } from 'lodash';
/**
 * Returns a prop by key prefering Redux-form 7 props, redux-form 5 props
 * or manual props in this order.
 * @param {object} props - all PropTypes
 * @param {string} key - the property to look for
 *
 */
export default function getPreferredProp(props, key, forcedPath = null) {
  let propsCopy = props;

  if (forcedPath) {
    propsCopy = get(props, forcedPath, {});
  }
  return get(propsCopy, `input.${key}`,
    get(propsCopy, `meta.${key}`,
      get(propsCopy, `field.${key}`,
        get(propsCopy, key, undefined),
      ),
    ),
  );
}
