/**
 * JSX Runtime for TypeScript's jsx-runtime module resolution.
 * This is required for the jsxImportSource to work correctly.
 *
 * In development mode, React also looks for jsxDEV in this module,
 * so we export it from the dev runtime.
 */

export { jsx, jsxs, Fragment } from './index';
export { jsxDEV } from './jsx-dev-runtime';
export type { JSX } from './index';
