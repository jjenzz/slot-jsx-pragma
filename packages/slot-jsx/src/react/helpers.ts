import * as React from 'react';
import { Slottable, SlottableProps } from './slot';

/**
 * Finds Slottable in children, extracts host element, and builds output children.
 * Handles both single Slottable and Slottable among siblings.
 *
 * @throws if Slottable host resolves to more than one element
 * @throws if resolved host is not a valid React element
 */
function findSlottable(
  outerProps: Record<string, any>,
  children: React.ReactNode,
): {
  element: React.ReactElement;
  children: React.ReactNode;
  isAsFunctionProp: boolean;
} {
  const childArray = React.Children.toArray(children);
  const outputChildren: React.ReactNode[] = [];
  let hostElement: React.ReactElement<React.PropsWithChildren> | null = null;
  let isAsFunctionProp = false;

  for (const child of childArray) {
    if (React.isValidElement<SlottableProps>(child) && child.type === Slottable) {
      const slottableProps = child.props;
      const asProp = slottableProps.as;

      // If `as` is provided, use it as the host (supports function or element)
      if (asProp != null) {
        const isFn = typeof asProp === 'function';
        const resolvedHost = isFn ? asProp(outerProps) : asProp;
        const hostArray = React.Children.toArray(resolvedHost);
        const singleChild = hostArray[0];

        if (hostArray.length !== 1) {
          throw new Error('Slottable `as` must resolve to exactly one child element');
        }

        if (!React.isValidElement<React.PropsWithChildren>(singleChild)) {
          throw new Error('Slottable `as` must be a valid React element or render function');
        }

        const hostChildren = resolveSlottableChildren(slottableProps, singleChild.props.children);
        outputChildren.push(hostChildren);
        hostElement = singleChild;
        isAsFunctionProp = isFn;

        continue;
      }

      // No `as` prop - use children as the host
      if (typeof slottableProps.children === 'function') {
        throw new Error('Slottable children cannot be a function without an `as` prop');
      }

      const hostArray = React.Children.toArray(slottableProps.children);
      const singleChild = hostArray[0];

      if (hostArray.length !== 1) {
        throw new Error('Slottable must contain exactly one child element');
      }

      if (!React.isValidElement<React.PropsWithChildren>(singleChild)) {
        throw new Error('Slottable child must be a valid React element');
      }

      outputChildren.push(singleChild.props.children);
      hostElement = singleChild;
    } else {
      outputChildren.push(child);
    }
  }

  if (!hostElement) {
    throw new Error('Slot requires a Slottable child or a single element to slot onto');
  }

  return {
    element: hostElement,
    children: outputChildren.length === 1 ? outputChildren[0] : outputChildren,
    isAsFunctionProp,
  };
}

/**
 * Resolves the children that should be rendered inside the host element.
 * If `children` is a function, we pass the host element's children to it.
 */
function resolveSlottableChildren(
  slottableProps: SlottableProps,
  hostChildren: React.ReactNode,
): React.ReactNode {
  if (typeof slottableProps.children === 'function') return slottableProps.children(hostChildren);
  if (slottableProps.children !== undefined) return slottableProps.children;
  return hostChildren;
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

export { findSlottable, mergeProps };
