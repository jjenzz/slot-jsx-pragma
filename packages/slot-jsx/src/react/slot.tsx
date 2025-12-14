import * as React from 'react';

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -------------------------------------------------------------------------------------------------
 * Slot marker component. This is a runtime no-op that acts as an identity marker for the JSX
 * pragma to intercept and perform slotting transformation.
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

// we must specify `_forwardRef` here to avoid consle errors in dev mode for older versions of React
const Slot = React.forwardRef<HTMLElement, SlotProps>((props, _forwardedRef) => {
  return <>{props.children}</>;
});

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -------------------------------------------------------------------------------------------------
 * Slottable marker component. This marks where the host element's children will be inserted
 * during slotting. It's a runtime no-op.
 * -----------------------------------------------------------------------------------------------*/

interface SlottableProps {
  as?: React.ReactNode | ((props: Record<string, any>) => React.ReactElement);
  children?: React.ReactNode | ((children: React.ReactNode) => React.ReactNode);
}

function Slottable(props: SlottableProps) {
  // When not intercepted by the pragma (i.e. not inside a Slot), render appropriately
  const children = typeof props.as === 'function' ? null : props.as;
  return typeof props.children === 'function' ? props.children(children) : props.children;
}

/* ---------------------------------------------------------------------------------------------- */

export { Slot, Slottable };
export type { SlotProps, SlottableProps };
