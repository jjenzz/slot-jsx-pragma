/**
 * Pre-composed JSX runtime with slotting capabilities.
 *
 * This module provides a drop-in replacement for React's JSX runtime
 * that automatically handles slotting transformations.
 *
 * Usage in tsconfig.json:
 * {
 *   "compilerOptions": {
 *     "jsx": "react-jsx",
 *     "jsxImportSource": "slot-jsx/react"
 *   }
 * }
 */

// Re-export React-specific Slot components
export { Slot, Slottable } from './slot';
export type { SlotProps, SlottableProps } from './slot';

// Re-export utilities for advanced usage
export { withSlot, withSlotJsxs, withSlotDev, Options } from './with-slot';
export type { JsxFactory, JsxDevFactory } from './with-slot';
