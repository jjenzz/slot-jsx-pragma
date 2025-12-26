/* -------------------------------------------------------------------------------------------------
 * mergeProps
 * -----------------------------------------------------------------------------------------------*/

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

/* -------------------------------------------------------------------------------------------------
 * mergeRefs
 * -----------------------------------------------------------------------------------------------*/

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

export { mergeProps, mergeRefs };
