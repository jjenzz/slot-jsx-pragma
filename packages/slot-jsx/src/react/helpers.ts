import * as React from 'react';
import { Slottable, SlottableProps } from './slot';

/**
 * Walks the children tree and finds the Slottable component in a single pass.
 * Returns both the host element from within Slottable AND the transformed children
 * with Slottable replaced by the host element's children.
 *
 * @throws if no Slottable is found
 * @throws if Slottable contains more than one child
 * @throws if child is not a valid React element
 */
function findAndReplaceSlottable(children: React.ReactNode): {
  element: React.ReactElement;
  children: React.ReactNode;
} {
  let hostElement: React.ReactElement<React.PropsWithChildren> | null = null;
  let hostChildren: React.ReactNode = null;

  const transform = (node: React.ReactNode): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (!React.isValidElement<React.PropsWithChildren>(child)) return child;

      // Found the Slottable - extract host and return its children
      if (child.type === Slottable) {
        const slottableProps = child.props as SlottableProps;
        const slottableChild = slottableProps.as ?? slottableProps.children;
        const childArray = React.Children.toArray(slottableChild);
        const host = childArray[0];

        if (childArray.length !== 1) {
          throw new Error('Slottable must contain exactly one child element');
        }

        if (!React.isValidElement<React.PropsWithChildren>(host)) {
          throw new Error('Slottable child must be a valid React element');
        }

        hostElement = host;
        hostChildren = slottableProps.as ? slottableProps.children : host.props.children;
        return hostChildren;
      }

      // Recurse into children of other elements
      if (child.props.children) {
        const newChildren = transform(child.props.children);
        return React.createElement(child.type, child.props, newChildren);
      }

      return child;
    });
  };

  const transformedChildren = transform(children);

  if (!hostElement) {
    throw new Error('Slot component requires a Slottable child');
  }

  return { element: hostElement, children: transformedChildren };
}

/**
 * Merges props from the outer component and host element.
 * Host element props take precedence over outer props.
 */
function mergeProps(
  outerProps: Record<string, any>,
  hostProps: Record<string, any>,
): Record<string, any> {
  const merged = { ...outerProps };

  for (const key in hostProps) {
    if (key === 'ref' && outerProps.ref !== hostProps.ref) {
      merged.ref = mergeRefs(outerProps.ref, hostProps.ref);
    } else if (
      key === 'className' &&
      hostProps.className &&
      outerProps.className &&
      outerProps.className !== hostProps.className
    ) {
      merged.className = `${outerProps.className} ${hostProps.className}`;
    } else if (
      key === 'style' &&
      typeof outerProps.style === 'object' &&
      typeof hostProps.style === 'object' &&
      outerProps.style !== hostProps.style
    ) {
      merged.style = { ...outerProps.style, ...hostProps.style };
    } else if (
      key.startsWith('on') &&
      typeof outerProps[key] === 'function' &&
      typeof hostProps[key] === 'function' &&
      outerProps[key] !== hostProps[key]
    ) {
      const outerHandler = outerProps[key];
      const hostHandler = hostProps[key];
      merged[key] = (...args: any[]) => {
        hostHandler(...args);
        outerHandler(...args);
      };
    } else {
      merged[key] = hostProps[key];
    }
  }

  return merged;
}

/**
 * Composes multiple refs into a single ref callback.
 */
function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.Ref<T> | undefined {
  const validRefs = refs.filter((ref) => ref != null);
  const count = validRefs.length;

  if (count === 0) return undefined;
  if (count === 1) return validRefs[0];

  return function mergedRefs(value: T | null) {
    for (const ref of validRefs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    }
  };
}

/* ---------------------------------------------------------------------------------------------- */

export { findAndReplaceSlottable, mergeProps };
