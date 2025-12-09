import * as React from 'react';
import { Slot, Slottable } from './slot';
import { findAndReplaceSlottable, mergeProps } from './helpers';

type Props = React.PropsWithChildren<React.RefAttributes<any>>;

/**
 * Type definition for a JSX factory function.
 */
export type JsxFactory = (type: React.ElementType<any, any>, props: Props, key?: string) => React.ReactElement;

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
  const jsx: JsxFactory = (type, props, key) => {
    if (type !== Slot) return baseJsx(type, props, key);
    const result = performSlotTransformation(props);
    return result ? baseJsx(result.type, result.props, key) : baseJsx(Slot, props, key);
  };
  return jsx;
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
  type: React.ElementType,
  props: Props,
  key: React.Key | undefined,
  isStatic: boolean,
  source?: any,
  self?: unknown,
) => React.ReactElement;

/**
 * Wraps a base jsxDEV factory to add slotting capabilities in development mode.
 * This is similar to withSlot but handles the additional parameters used by jsxDEV.
 */
export function withSlotDev(baseJsxDev: JsxDevFactory): JsxDevFactory {
  const jsxDEV: JsxDevFactory = (type, props, key, isStatic, source, self) => {
    if (type !== Slot) return baseJsxDev(type, props, key, isStatic, source, self);
    const result = performSlotTransformation(props);

    return result
      ? baseJsxDev(result.type, result.props, key, isStatic, source, self)
      : baseJsxDev(Slot, props, key, isStatic, source, self);
  };
  return jsxDEV;
}

/* ---------------------------------------------------------------------------------------------- */

type SlotTransformationResult = Pick<React.ReactElement<Props, any>, 'type' | 'props'>;

function performSlotTransformation(props: Props): SlotTransformationResult | null {
  const { children, ...outerProps } = props;
  const childArray = React.Children.toArray(children);
  const singleChild = childArray[0];

  try {
    if (childArray.length <= 1) {
      // Check if we have a single child that's not a Slottable
      if (React.isValidElement<React.PropsWithChildren>(singleChild) && singleChild.type !== Slottable) {
        const hostElement = singleChild;
        const hostElementProps = hostElement.props;
        const hostElementRef = extractRef(hostElement);
        const mergedProps = mergeProps(outerProps, { ...hostElementProps, ref: hostElementRef });
        return { type: hostElement.type, props: mergedProps };
      } else {
        throw new Error(`Slot requires an element child to slot onto`);
      }
    }

    // Otherwise, try to find a Slottable in the children tree
    const { hostElement, transformedChildren } = findAndReplaceSlottable(children);
    const hostType = hostElement.type;
    const hostElementProps = hostElement.props as Props;
    const hostElementRef = extractRef(hostElement as React.ReactElement<Props>);
    const mergedProps = mergeProps(outerProps, { ...hostElementProps, ref: hostElementRef });
    const nextProps = { ...mergedProps, children: transformedChildren };

    return { type: hostType, props: nextProps };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Slot transformation failed';
    console.error(errorMessage);
    return null;
  }
}

function extractRef(element: React.ReactElement<Props>): React.Ref<any> | undefined {
  const majorVersion = parseInt(React.version.split('.')[0] || '0', 10);
  // React 19+ uses props.ref
  if (majorVersion >= 19) return element.props.ref;
  // React 17-18 use element.ref
  return (element as any).ref;
}
