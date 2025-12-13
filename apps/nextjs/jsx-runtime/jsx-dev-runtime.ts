import { jsxDEV as baseJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { withSlotDev } from 'slot-jsx/react';
import { mergeProps } from './jsx-runtime';

export const jsxDEV = withSlotDev(baseJsxDEV, { mergeProps });
export { Fragment };
