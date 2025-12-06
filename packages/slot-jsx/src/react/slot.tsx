import * as React from 'react';

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Slot marker component. This is a runtime no-op that acts as an identity marker
 * for the JSX pragma to intercept and perform slotting transformation.
 */
function Slot(props: SlotProps) {
  return <>{props.children}</>;
}

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

interface SlottableProps {
  children?: React.ReactNode;
}

/**
 * Slottable marker component. This marks where the host element's children
 * will be inserted during slotting. It's a runtime no-op.
 */
function Slottable(props: SlottableProps) {
  return <>{props.children}</>;
}

/* ---------------------------------------------------------------------------------------------- */

export { Slot, Slottable };
export type { SlotProps, SlottableProps };
