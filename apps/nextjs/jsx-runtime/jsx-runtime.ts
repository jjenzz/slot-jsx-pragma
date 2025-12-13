import { jsx as baseJsx, jsxs as baseJsxs, Fragment } from 'react/jsx-runtime';
import { withSlot, withSlotJsxs, Options } from 'slot-jsx/react';

// optionally define your own custom merge props behaviour
export const mergeProps: Options['mergeProps'] = (outerProps, hostProps) => {
  return { ...outerProps, ...hostProps, className: 'bg-red-500' };
};

export const jsx = withSlot(baseJsx, { mergeProps });
export const jsxs = withSlotJsxs(baseJsxs, { mergeProps });
export { Fragment };
