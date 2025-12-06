/**
 * JSX Dev Runtime for development mode.
 * React uses jsxDEV in development for better error messages.
 */

import { jsxDEV as baseJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { withSlotDev } from './with-slot';

export const jsxDEV = withSlotDev(baseJsxDEV);
export { Fragment };

// Re-export the JSX namespace for TypeScript
export type { JSX } from 'react/jsx-dev-runtime';
