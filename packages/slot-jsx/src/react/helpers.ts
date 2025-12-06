import * as React from 'react';
import { Slottable } from './slot';

/**
 * Walks the children tree and finds the Slottable component.
 * Returns the child element contained within Slottable.
 *
 * @throws if no Slottable is found
 * @throws if Slottable contains more than one child
 * @throws if child is not a valid React element
 */
export function findHostFromSlottable(children: React.ReactNode): React.ReactElement {
  let slottableChild: React.ReactNode = null;
  let foundSlottable = false;

  React.Children.forEach(children, (child) => {
    if (foundSlottable) return;

    if (React.isValidElement(child)) {
      const childProps = child.props as any;
      if (child.type === Slottable) {
        foundSlottable = true;
        slottableChild = childProps.children;
      } else if (childProps && typeof childProps === 'object' && 'children' in childProps) {
        try {
          const found = findHostFromSlottable(childProps.children);
          slottableChild = found;
          foundSlottable = true;
        } catch {
          // Continue searching if not found in this branch
        }
      }
    }
  });

  if (!foundSlottable) {
    throw new Error('Slot component requires a Slottable child');
  }

  const childArray = React.Children.toArray(slottableChild);

  if (childArray.length !== 1) {
    throw new Error('Slottable must contain exactly one child element');
  }

  const hostElement = childArray[0];

  if (!React.isValidElement(hostElement)) {
    throw new Error('Slottable child must be a valid React element');
  }

  return hostElement;
}

/**
 * Recursively walks through children and replaces Slottable with the host element's children.
 */
export function replaceSlottableWithHostChildren(
  children: React.ReactNode,
  hostChildren: React.ReactNode,
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === Slottable) return hostChildren;

    const childProps = child.props as any;
    if (childProps?.children) {
      // For other elements with children, recursively process their children to find Slottable
      const newChildren = replaceSlottableWithHostChildren(childProps.children, hostChildren);
      return React.createElement(child.type, childProps, newChildren);
    }

    return child;
  });
}

/**
 * Merges props from the outer component and host element.
 * Host element props take precedence over outer props (except children).
 */
export function mergeProps(outerProps: Record<string, any>, hostProps: Record<string, any>): Record<string, any> {
  const merged = { ...outerProps };

  // Merge all host props except children
  for (const key in hostProps) {
    if (key === 'children') continue;

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
        outerHandler(...args);
        hostHandler(...args);
      };
    }
    // Otherwise, host props override outer props
    else {
      merged[key] = hostProps[key];
    }
  }

  return merged;
}
