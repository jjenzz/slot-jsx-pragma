import * as React from 'react';
import { Slot, Slottable } from './slot';
import { findHostFromSlottable, replaceSlottableWithHostChildren, mergeProps } from './helpers';

/**
 * Type definition for a JSX factory function.
 */
export type JsxFactory = (type: any, props: any, key?: any) => React.ReactElement;

/**
 * Wraps a base JSX factory to add slotting capabilities.
 *
 * When the type is Slot, this performs the slotting transformation:
 * - If there's a single child that's not a Slottable, slots directly onto it
 * - Otherwise:
 *   1. Finds the Slottable component in the children tree
 *   2. Extracts the host element from within Slottable
 *   3. Replaces Slottable with the host element's children in the template
 *   4. Merges props from the Slot and the host element
 *   5. Creates a new element with the host's type and merged props
 * - If slotting fails, logs error to console
 *
 * For all other types, delegates to the base JSX factory.
 */
export function withSlot(baseJsx: JsxFactory): JsxFactory {
  return function jsx(type: any, props: any, key?: any): React.ReactElement {
    if (type !== Slot) return baseJsx(type, props, key);
    const result = performSlotTransformation(props);
    return result ? baseJsx(result.type, result.props, key) : baseJsx(Slot, props, key);
  };
}

/**
 * Wraps a base JSX factory for static children (jsxs).
 * Identical behavior to withSlot since the transformation is the same.
 */
export function withSlotJsxs(baseJsxs: JsxFactory): JsxFactory {
  return withSlot(baseJsxs);
}

/**
 * Type definition for the jsxDEV factory function used in development.
 */
export type JsxDevFactory = (
  type: any,
  props: any,
  key: any,
  isStatic: boolean,
  source?: any,
  self?: any,
) => React.ReactElement;

/**
 * Wraps a base jsxDEV factory to add slotting capabilities in development mode.
 * This is similar to withSlot but handles the additional parameters used by jsxDEV.
 */
export function withSlotDev(baseJsxDev: JsxDevFactory): JsxDevFactory {
  return function jsxDEV(
    type: any,
    props: any,
    key: any,
    isStatic: boolean,
    source?: any,
    self?: any,
  ): React.ReactElement {
    if (type !== Slot) return baseJsxDev(type, props, key, isStatic, source, self);
    const result = performSlotTransformation(props);

    return result
      ? baseJsxDev(result.type, result.props, key, isStatic, source, self)
      : baseJsxDev(Slot, props, key, isStatic, source, self);
  };
}

/* ---------------------------------------------------------------------------------------------- */

type SlotTransformationSuccess = { type: any; props: any };

function performSlotTransformation(props: any): SlotTransformationSuccess | null {
  const { children, ...outerProps } = props;
  const childArray = React.Children.toArray(children);
  const singleChild = childArray[0];

  try {
    if (childArray.length <= 1) {
      // Check if we have a single child that's not a Slottable
      if (React.isValidElement(singleChild) && singleChild.type !== Slottable) {
        const hostElement = singleChild;
        const hostElementProps = hostElement.props as any;
        const { children: hostChildren, ...hostProps } = hostElementProps;
        const mergedProps = mergeProps(outerProps, hostProps);

        return {
          type: hostElement.type,
          props: { ...mergedProps, children: hostChildren },
        };
      } else {
        throw new Error(`Slot requires an element child to slot onto`);
      }
    }

    // Otherwise, try to find a Slottable in the children tree
    const hostElement = findHostFromSlottable(children);
    const hostType = hostElement.type;
    const hostElementProps = hostElement.props as any;
    const { children: hostChildren, ...hostProps } = hostElementProps;
    const newChildren = replaceSlottableWithHostChildren(children, hostChildren);
    const mergedProps = mergeProps(outerProps, hostProps);
    return {
      type: hostType,
      props: { ...mergedProps, children: newChildren },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Slot transformation failed';
    console.error(errorMessage);
    return null;
  }
}
