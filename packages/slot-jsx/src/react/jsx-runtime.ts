/**
 * JSX Runtime for TypeScript's jsx-runtime module resolution.
 * This is required for the jsxImportSource to work correctly.
 *
 * In development mode, React also looks for jsxDEV in this module,
 * so we export it from the dev runtime.
 */

import { jsx as baseJsx, jsxs as baseJsxs, Fragment } from 'react/jsx-runtime';
import { withSlot, withSlotJsxs } from './with-slot';

export const jsx = withSlot(baseJsx);
export const jsxs = withSlotJsxs(baseJsxs);
export { Fragment };

// Re-export the JSX namespace for TypeScript
export type { JSX } from 'react/jsx-runtime';
