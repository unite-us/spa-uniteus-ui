import React from 'react';
import Children from './index';

export default function filterChildren(children, props) {
  const newChildren = Children.filter(children, child => child !== null);

  if (props) {
    return React.Children.map(newChildren, child => React.cloneElement(child, props));
  }

  if (newChildren.length === 1) {
    return newChildren[0];
  }

  return newChildren;
}
