# 🎰 slot-jsx

A custom JSX pragma that enables declarative slottable components for powering `asChild` or `render` function prop patterns.

## Features

- 🪆 **Nested Slottables**: Supports deeply nested slottable components
- 🔥 **No `React.cloneElement`**: Uses a safe element reconstruction approach
- ✨ **React Server Components**: Fully compatible with RSC and SSR
- ⏳ **Async Components**: Can slot onto async server components
- 🧹 **Streamlined React tree**: No more [`SlotClone` components](https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/slot.tsx#L101) in devtools
- 🧩 **Composable**: Can be composed with other JSX pragmas
- 🛡️ **Type-Safe**: Full TypeScript support

## Installation

```bash
pnpm add slot-jsx
```

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "slot-jsx/react"
  }
}
```

> **Important:** Always import from `slot-jsx/react`, not from the package root.

## Quick Start

### 1. Create a Slottable Component

```tsx
import { Slot } from 'slot-jsx/react';

interface ButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

export function Button({ asChild, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props}>{children}</Comp>;
}
```

> **Note:** The prop name `asChild` is a convention from Radix UI, but you can name it whatever you want.

### 2. Use It

```tsx
<Button asChild>
  <a href="/home">Go Home</a>
</Button>

// Result: <a href="/home">Go Home</a>
```

## How It Works

When `asChild={true}`, the component's root element is replaced by its child element, while preserving the component's internal structure.

### Simple Case (No Slottable needed)

```tsx
<Button asChild onClick={handleClick}>
  <a href="/foo">Click me</a>
</Button>

// Result: <a href="/foo" onClick={handleClick}>Click me</a>
```

### Complex Case (With Slottable)

When you have siblings to the children (like icons or wrappers), use `Slottable` to mark where the child's content goes:

```tsx
<IconButton asChild onClick={handleClick}>
  <a href="/foo">Click me</a>
</IconButton>
```

**IconButton internally renders:**

```tsx
<Slot onClick={handleClick}>
  <Icon />
  <span>
    <Slottable>{children}</Slottable>
  </span>
</Slot>
```

**The pragma transforms this to:**

```tsx
<a href="/foo" onClick={handleClick}>
  <Icon />
  <span>Click me</span>
</a>
```

**Without siblings?** Skip `Slottable`:

```tsx
export function Button({ asChild, children, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props}>{children}</Comp>;
}
```

### With Render Prop

If you want to define an API where you pass a _render prop_ to specify the underlying element—like [Ariakit](https://ariakit.org/guide/composition) or [BaseUI](https://base-ui.com/react/handbook/composition#render-function)—use the `as` prop on `Slottable`.

**Example:**

```tsx
export function Button({ render, ...props }) {
  const Comp = render ? Slot : 'button';
  return (
    <Comp {...props}>
      <Slottable as={render}>{props.children}</Slottable>
    </Comp>
  );
}
```

**Usage:**

```tsx
<Button render={<a href="/foo" />}>Click me</Button>
```

or:

```tsx
<Button render={(props) => <a {...props} href="/foo" />}>Click me</Button>
```

This pattern gives consumers full control over the rendered element while still preserving the slot mechanics. When using the function pattern, `Slot` will no longer merge props for you to give you control over prop forwarding and composition.

> **Note:** render functions are only possible in client components, so bear that in mind if you decide to use this API.

## Ejecting JSX Pragmas

You can eject the pragma to configure it, or compose it with other custom pragmas for styling or other transformations.

To eject, create your own custom JSX runtime files in your project:

**src/jsx-runtime/jsx-runtime.ts:**

```tsx
import { jsx as baseJsx, jsxs as baseJsxs, Fragment } from 'react/jsx-runtime';
import { withSlot, withSlotJsxs, Options } from 'slot-jsx/react';
import { withCss, withCssJsxs } from '@some-lib/css-pragma';

// optionally define your own custom merge props behaviour
export const mergeProps: Options['mergeProps'] = (outerProps, hostProps) => {
  return { ...outerProps, ...hostProps };
};

export const jsx = withCss(withSlot(baseJsx, { mergeProps }));
export const jsxs = withCssJsxs(withSlotJsxs(baseJsxs, { mergeProps }));
export { Fragment };
```

**src/jsx-runtime/jsx-dev-runtime.ts:**

```tsx
import { jsxDEV as baseJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { withSlotDev } from 'slot-jsx/react';
import { withCssDev } from '@some-lib/css-pragma';
import { mergeProps } from './jsx-runtime';

export const jsxDEV = withCssDev(withSlotDev(baseJsxDEV, { mergeProps }));
export { Fragment };
```

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsxImportSource": "./src/jsx-runtime"
  }
}
```

> **Important:** Use `"jsxImportSource": "@/jsx-runtime"` in NextJS projects.

### Prop Merging

When slotting occurs, props are merged intelligently:

- **className**: Concatenates both classes
- **style**: Merges style objects (host wins on conflicts)
- **ref**: Safely composes both refs (React 17+)
- **Event handlers**: Calls both handlers in sequence
- **Other props**: Host props take precedence

## Rules & Edge Cases

1. **Slottable is optional**: If you don't have wrappers or siblings to the children, you don't need `Slottable`
2. **Single Slottable**: Only one `Slottable` per `Slot` (if you use it)
3. **Single Host Element**: The child you're slotting onto must be exactly one React element
4. **Prop Merging**: Host props override component props (except for className, style, ref, and event handlers)

## Examples

Check out the [demo app](https://github.com/jjenzz/slot-jsx-pragma/tree/main/apps/nextjs) for working examples.

## Inspiration

This implementation is inspired by [Radix UI's Slot utility](https://www.radix-ui.com/primitives/docs/utilities/slot).
