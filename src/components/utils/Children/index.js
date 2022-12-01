import { Children } from 'react';

export default Object.assign({}, Children, {
  filter(children, filterFn) {
    return Children
      .toArray(children)
      .filter(filterFn);
  },
});
