# 🎰 slot-jsx

A custom JSX pragma that enables declarative nested slottable components using the `asChild` pattern, inspired by Radix UI.

## Features

- ✅ **Custom JSX Runtime**: Transforms JSX at runtime to support slotting
- ✅ **Composable**: Can be composed with other JSX pragmas
- ✅ **Nested Slottables**: Supports deeply nested slottable components
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **No `React.cloneElement`**: Uses a safe element reconstruction approach
- ✅ **Async Components**: Can slot onto async server components
- ✅ **React Server Components**: Fully compatible with RSC and SSR
- ✅ **React 17+**: Requires React 17+ for the new JSX transform

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

> **Note:** The prop name `asChild` is a convention from Radix UI, but you can name it whatever you want (`polymorphic`, `as`, `renderAs`, etc.). We use `asChild` in our examples as it's widely recognised.

### 2. Use It

```tsx
// Regular button
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>

// As a link
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

// Renders: <a href="/foo" onClick={handleClick}>Click me</a>
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

**Without siblings?** You can skip `Slottable`:

```tsx
export function Button({ asChild, children, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props}>{children}</Comp>;
}
```

## Composing with Other JSX Pragmas

You can compose `withSlot` with other custom JSX pragmas for styling or other transformations.

### Example: Composing with CSS Pragmas

Create custom JSX runtime files in your project:

**jsx-runtime.ts:**

```tsx
import { jsx as baseJsx, jsxs as baseJsxs, Fragment } from 'react/jsx-runtime';
import { withSlot } from 'slot-jsx/react';
import { withCss } from '@some-lib/css-pragma';

// Compose pragmas - styling wraps slotting
export const jsx = withCss(withSlot(baseJsx));
export const jsxs = withCss(withSlot(baseJsxs));
export { Fragment };

// Re-export jsxDEV from dev runtime for development mode
export { jsxDEV } from './jsx-dev-runtime';
```

**jsx-dev-runtime.ts:**

```tsx
import { jsxDEV as baseJsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { withSlotDev } from 'slot-jsx/react';
import { withCssDev } from '@some-lib/css-pragma';

// Compose dev pragmas
export const jsxDEV = withCssDev(withSlotDev(baseJsxDEV));
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

> **Important:** Create both runtime files and make sure `jsx-runtime.ts` re-exports `jsxDEV` from `jsx-dev-runtime.ts` to avoid errors in development mode.

## API

### `Slot`

Marker component that enables slotting. When `asChild={true}`, this replaces the component's root.

```tsx
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}
```

### `Slottable`

Marks where the host element's children will be inserted.

```tsx
interface SlottableProps {
  children?: React.ReactNode;
}
```

### Prop Merging

When slotting occurs, props are merged intelligently:

- **className**: Concatenates both classes
- **style**: Merges style objects (host wins on conflicts)
- **Event handlers**: Calls both handlers in sequence
- **Other props**: Host props take precedence

## Rules & Edge Cases

1. **Slottable is optional**: If you don't have siblings to the children, you don't need `Slottable`
2. **Single Slottable**: Only one `Slottable` per `Slot` (if you use it)
3. **Single Host Element**: The child you're slotting onto must be exactly one React element
4. **Prop Merging**: Host props override component props (except for className, style, and event handlers)

## Examples

Check out the [demo app](https://github.com/jjenzz/slot-jsx/tree/main/nextjs) for working examples.

## Inspiration

This implementation is inspired by [Radix UI's Slot utility](https://www.radix-ui.com/primitives/docs/utilities/slot).

## License

MIT
