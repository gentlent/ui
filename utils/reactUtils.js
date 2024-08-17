import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function filterChildren(children, condition) {
  return <>
    {((children || []).map ? (children || []) : [children]).map((child) => ((typeof condition === 'function' ? condition(child) : condition) ? <React.Fragment key={Math.random().toString()}>{child}</React.Fragment> : ''))}
  </>;
}

export function recursiveMap(children, fn) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      // eslint-disable-next-line no-param-reassign
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn),
      });
    }

    return fn(child);
  });
}
