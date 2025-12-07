import * as React from 'react';
import { Slottable } from './slot';

/**
 * Walks the children tree and finds the Slottable component in a single pass.
 * Returns both the host element from within Slottable AND the transformed children
 * with Slottable replaced by the host element's children.
 *
 * @throws if no Slottable is found
 * @throws if Slottable contains more than one child
 * @throws if child is not a valid React element
 */
export function findAndReplaceSlottable(children: React.ReactNode): {
  hostElement: React.ReactElement;
  transformedChildren: React.ReactNode;
} {
  let hostElement: React.ReactElement | null = null;
  let hostChildren: React.ReactNode = null;

  const transform = (node: React.ReactNode): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (!React.isValidElement(child)) return child;

      // Found the Slottable - extract host and return its children
      if (child.type === Slottable) {
        if (hostElement) return hostChildren;

        const slottableChild = (child.props as any).children;
        const childArray = React.Children.toArray(slottableChild);

        if (childArray.length !== 1) {
          throw new Error('Slottable must contain exactly one child element');
        }

        const host = childArray[0];

        if (!React.isValidElement(host)) {
          throw new Error('Slottable child must be a valid React element');
        }

        hostElement = host;
        hostChildren = (host.props as any).children;
        return hostChildren;
      }

      // Recurse into children of other elements
      const childProps = child.props as any;
      if (childProps?.children) {
        const newChildren = transform(childProps.children);
        return React.createElement(child.type, childProps, newChildren);
      }

      return child;
    });
  };

  const transformedChildren = transform(children);

  if (!hostElement) {
    throw new Error('Slot component requires a Slottable child');
  }

  return { hostElement, transformedChildren };
}

/**
 * Merges props from the outer component and host element.
 * Host element props take precedence over outer props (except children).
 */
export function mergeProps(outerProps: Record<string, any>, hostProps: Record<string, any>): Record<string, any> {
  const merged = { ...outerProps };

  // Merge all host props except children
  for (const key in hostProps) {
    // Special handling for className - concatenate them
    if (key === 'className' && hostProps.className && outerProps.className) {
      merged.className = `${outerProps.className} ${hostProps.className}`;
    }
    // Special handling for style - merge objects
    else if (key === 'style' && typeof outerProps.style === 'object' && typeof hostProps.style === 'object') {
      merged.style = { ...outerProps.style, ...hostProps.style };
    }
    // For event handlers, call both
    else if (key.startsWith('on') && typeof outerProps[key] === 'function' && typeof hostProps[key] === 'function') {
      const outerHandler = outerProps[key];
      const hostHandler = hostProps[key];
      merged[key] = (...args: any[]) => {
        hostHandler(...args);
        outerHandler(...args);
      };
    }
    // Otherwise, host props override outer props
    else {
      merged[key] = hostProps[key];
    }
  }

  return merged;
}
