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

import { jsx as baseJsx, jsxs as baseJsxs, Fragment } from 'react/jsx-runtime';

import { withSlot } from './with-slot';

export const jsx = withSlot(baseJsx);
export const jsxs = withSlot(baseJsxs);
export { Fragment };

// Re-export the JSX namespace for TypeScript
export type { JSX } from 'react/jsx-runtime';

// Re-export React-specific Slot components
export { Slot, Slottable } from './slot';
export type { SlotProps, SlottableProps } from './slot';

// Re-export utilities for advanced usage
export { withSlot, withSlotJsxs, withSlotDev } from './with-slot';
export type { JsxFactory, JsxDevFactory } from './with-slot';

export { findHostFromSlottable, replaceSlottableWithHostChildren, mergeProps } from './helpers';
