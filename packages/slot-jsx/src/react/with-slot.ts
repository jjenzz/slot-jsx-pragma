import * as React from 'react';
import { Slot, Slottable } from './slot';
import { findSlottable, mergeProps } from './helpers';

type Props = React.PropsWithChildren<React.RefAttributes<any>>;
type Options = { mergeProps?: typeof mergeProps };

/* -------------------------------------------------------------------------------------------------
 * withSlot
 * -------------------------------------------------------------------------------------------------
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
 * -----------------------------------------------------------------------------------------------*/

type JsxFactory = (
  type: React.ElementType<any, any>,
  props: Props,
  key?: string,
) => React.ReactElement;

function withSlot(baseJsx: JsxFactory, options?: Options): JsxFactory {
  const jsx: JsxFactory = (type, props, key) => {
    if (type !== Slot) return baseJsx(type, props, key);
    const result = performSlotTransformation(props, options);
    return result ? baseJsx(result.type, result.props, key) : baseJsx(Slot, props, key);
  };
  return jsx;
}

/**
 * Wraps a base JSX factory for static children (jsxs).
 * Identical behavior to withSlot since the transformation is the same.
 */
function withSlotJsxs(baseJsxs: JsxFactory, options?: Options): JsxFactory {
  return withSlot(baseJsxs, options);
}

/* -------------------------------------------------------------------------------------------------
 * withSlotDev
 * -------------------------------------------------------------------------------------------------
 * Wraps a base jsxDEV factory to add slotting capabilities in development mode.
 * This is similar to withSlot but handles the additional parameters used by jsxDEV.
 * -----------------------------------------------------------------------------------------------*/

type JsxDevFactory = (
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
function withSlotDev(baseJsxDev: JsxDevFactory, options?: Options): JsxDevFactory {
  const jsxDEV: JsxDevFactory = (type, props, key, isStatic, source, self) => {
    if (type !== Slot) return baseJsxDev(type, props, key, isStatic, source, self);
    const result = performSlotTransformation(props, options);

    return result
      ? baseJsxDev(result.type, result.props, key, isStatic, source, self)
      : baseJsxDev(Slot, props, key, isStatic, source, self);
  };
  return jsxDEV;
}

/* -------------------------------------------------------------------------------------------------
 * performSlotTransformation
 * -----------------------------------------------------------------------------------------------*/

type SlotTransformationResult = Pick<React.ReactElement<Props, any>, 'type' | 'props'>;

function performSlotTransformation(
  props: Props,
  options: Options = {},
): SlotTransformationResult | null {
  const { children, ...outerProps } = props;
  const childArray = React.Children.toArray(children);
  const singleChild = childArray[0];
  const mergePropsFn = options.mergeProps ?? mergeProps;

  try {
    // Single non-Slottable element: slot directly onto it
    if (
      childArray.length === 1 &&
      React.isValidElement<Props>(singleChild) &&
      singleChild.type !== Slottable
    ) {
      const ref = extractRef(singleChild);
      const mergedProps = mergePropsFn(outerProps, { ...singleChild.props, ref });
      return { type: singleChild.type, props: mergedProps };
    }

    // Otherwise, find Slottable, extract host, build output children
    const host = findSlottable(outerProps, children);
    const ref = extractRef(host.element as React.ReactElement<Props>);
    const hostProps = { ...(host.element.props as Props), children: host.children, ref };
    const mergedProps = host.isAsFunctionProp ? hostProps : mergePropsFn(outerProps, hostProps);
    return { type: host.element.type, props: mergedProps };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Slot transformation failed';
    console.error(errorMessage);
    return null;
  }
}

/* -------------------------------------------------------------------------------------------------
 * extractRef
 * -----------------------------------------------------------------------------------------------*/

function extractRef(element: React.ReactElement<Props>): React.Ref<any> | undefined {
  const majorVersion = parseInt(React.version.split('.')[0] || '0', 10);
  // React 19+ uses props.ref
  if (majorVersion >= 19) return element.props.ref;
  // React 17-18 use element.ref
  return (element as any).ref;
}

/* ---------------------------------------------------------------------------------------------- */

export type { JsxFactory, JsxDevFactory, Options };
export { withSlot, withSlotJsxs, withSlotDev };
