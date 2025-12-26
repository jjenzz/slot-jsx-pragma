import * as React from 'react';
import { Slot, Slottable, type SlottableProps } from './slot';
import { mergeProps } from './helpers';

type Props = Record<string, unknown> & { children?: React.ReactNode; ref?: React.Ref<unknown> };
type Options = { mergeProps?: typeof mergeProps };

/* -------------------------------------------------------------------------------------------------
 * withSlot
 * -----------------------------------------------------------------------------------------------*/

type JsxFactory = (type: React.ElementType, props: Props, key?: string) => React.ReactElement;

function withSlot(baseJsx: JsxFactory, options?: Options): JsxFactory {
  const mergePropsFn = options?.mergeProps ?? mergeProps;

  return (type, props, key) => {
    if (type !== Slot) return baseJsx(type, props, key);

    const result = transformSlot(props, mergePropsFn, baseJsx);
    if (!result) return baseJsx(type, props, key);

    return baseJsx(result.type, result.props, key);
  };
}

/**
 * Wraps a base JSX factory for static children (jsxs).
 */
function withSlotJsxs(baseJsxs: JsxFactory, options?: Options): JsxFactory {
  return withSlot(baseJsxs, options);
}

/* -------------------------------------------------------------------------------------------------
 * withSlotDev
 * -----------------------------------------------------------------------------------------------*/

type JsxDevFactory = (
  type: React.ElementType,
  props: Props,
  key: React.Key | undefined,
  isStatic: boolean,
  source?: { fileName: string; lineNumber: number; columnNumber: number },
  self?: unknown,
) => React.ReactElement;

function withSlotDev(baseJsxDev: JsxDevFactory, options?: Options): JsxDevFactory {
  const mergePropsFn = options?.mergeProps ?? mergeProps;
  const jsx = (type: React.ElementType, props: Props, key?: string) =>
    baseJsxDev(type, props, key, false, undefined, undefined);

  return (type, props, key, isStatic, source, self) => {
    if (type !== Slot) return baseJsxDev(type, props, key, isStatic, source, self);

    const result = transformSlot(props, mergePropsFn, jsx);
    if (!result) return baseJsxDev(type, props, key, isStatic, source, self);

    return baseJsxDev(result.type, result.props, key, isStatic, source, self);
  };
}

/* -------------------------------------------------------------------------------------------------
 * transformSlot
 * -----------------------------------------------------------------------------------------------*/

interface TransformResult {
  type: React.ElementType;
  props: Props;
}

function transformSlot(
  props: Props,
  mergePropsFn: typeof mergeProps,
  jsx: JsxFactory,
): TransformResult | null {
  const { children, ...outerProps } = props;
  const childArray = React.Children.toArray(children);
  const child = childArray[0];

  try {
    // Single non-Slottable child: slot directly onto it
    if (childArray.length === 1 && React.isValidElement<Props>(child) && child.type !== Slottable) {
      const ref = extractRef(child);
      const merged = mergePropsFn(outerProps, { ...child.props, ref });
      return { type: child.type as React.ElementType, props: merged };
    }

    // Find Slottable in tree and extract host
    const found = findSlottableInTree(children, outerProps, jsx);
    if (!found) throw new Error('Slot requires a Slottable child or a single element to slot onto');

    const ref = extractRef(found.host);
    const hostProps = { ...found.host.props, children: found.children, ref };
    const merged = found.skipMerge ? hostProps : mergePropsFn(outerProps, hostProps);

    return { type: found.host.type as React.ElementType, props: merged };
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Slot transformation failed');
    return null;
  }
}

/* -------------------------------------------------------------------------------------------------
 * findSlottableInTree
 * -----------------------------------------------------------------------------------------------*/

interface FoundSlottable {
  host: React.ReactElement<Props>;
  children: React.ReactNode;
  skipMerge: boolean;
}

function findSlottableInTree(
  children: React.ReactNode,
  outerProps: Props,
  jsx: JsxFactory,
): FoundSlottable | null {
  const childArray = React.Children.toArray(children);
  const rebuilt: React.ReactNode[] = [];
  let found: FoundSlottable | null = null;

  for (const child of childArray) {
    if (React.isValidElement<SlottableProps>(child) && child.type === Slottable) {
      const extracted = extractHost(child.props, outerProps);
      found = { host: extracted.host, children: null, skipMerge: extracted.skipMerge };
      rebuilt.push(extracted.replacement);
      continue;
    }

    // Recurse into elements with children
    if (React.isValidElement<Props>(child) && child.props.children != null) {
      const nested = findSlottableInTree(child.props.children, outerProps, jsx);
      if (nested) {
        const replacment = jsx(
          child.type as React.ElementType,
          { ...child.props, children: nested.children },
          child.key != null ? String(child.key) : undefined,
        );
        found = nested;
        rebuilt.push(replacment);
        continue;
      }
    }

    rebuilt.push(child);
  }

  if (found) {
    found.children = rebuilt.length === 1 ? rebuilt[0] : rebuilt;
  }

  return found;
}

/* -------------------------------------------------------------------------------------------------
 * extractHost
 * -----------------------------------------------------------------------------------------------*/

interface ExtractedHost {
  host: React.ReactElement<Props>;
  replacement: React.ReactNode;
  skipMerge: boolean;
}

function extractHost(slottableProps: SlottableProps, outerProps: Props): ExtractedHost {
  const { as: asProp, children } = slottableProps;

  // `as` prop provided - use it as host
  if (asProp != null) {
    const isRenderFn = typeof asProp === 'function';
    const resolved = isRenderFn ? asProp(outerProps) : asProp;
    const isSameAsChildren = !isRenderFn && resolved === children;
    const hostArray = React.Children.toArray(resolved);

    if (hostArray.length !== 1 || !React.isValidElement<Props>(hostArray[0])) {
      throw new Error('Slottable `as` must resolve to exactly one element');
    }

    const host = hostArray[0];
    const replacement = isSameAsChildren ? host.props.children : children;

    return { host, replacement, skipMerge: isRenderFn };
  }

  // No `as` - children is the host
  const hostArray = React.Children.toArray(children);

  if (hostArray.length !== 1 || !React.isValidElement<Props>(hostArray[0])) {
    throw new Error('Slottable must contain exactly one child element');
  }

  const host = hostArray[0];
  return { host, replacement: host.props.children, skipMerge: false };
}

/* -------------------------------------------------------------------------------------------------
 * extractRef
 * -----------------------------------------------------------------------------------------------*/

function extractRef(element: React.ReactElement<Props>): React.Ref<unknown> | undefined {
  const major = parseInt(React.version.split('.')[0] || '0', 10);
  return major >= 19 ? element.props.ref : (element as unknown as { ref?: React.Ref<unknown> }).ref;
}

/* ---------------------------------------------------------------------------------------------- */

export type { JsxFactory, JsxDevFactory, Options };
export { withSlot, withSlotJsxs, withSlotDev };
