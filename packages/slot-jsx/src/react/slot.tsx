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
  children?: React.ReactNode;
}

function Slottable(props: SlottableProps) {
  return <>{props.children}</>;
}

/* ---------------------------------------------------------------------------------------------- */

export { Slot, Slottable };
export type { SlotProps, SlottableProps };
