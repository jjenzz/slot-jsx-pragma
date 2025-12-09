import mergeRefs from 'merge-refs';
import React from 'react';
import { Slot } from 'slot-jsx/react';

type ButtonRef = React.ElementRef<'button'>;
interface ButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'button';
    const mergedClassName = ['cta', className].filter(Boolean).join(' ');
    const ref = React.useRef<ButtonRef>(null);
    const mergedRefs = mergeRefs(forwardedRef, ref);

    React.useEffect(() => {
      if (ref.current) {
        console.log('button ref', ref.current);
      }
    }, []);

    return <Comp className={mergedClassName} {...props} ref={mergedRefs} />;
  },
);

function App() {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (anchorRef.current) {
      console.log('anchor ref', anchorRef.current);
    }
  }, []);

  return (
    <main className="app">
      <header className="stack">
        <p className="eyebrow">React 17 + Vite</p>
        <h1>slot-jsx compatibility playground</h1>
        <p className="lede">
          Use this space to verify the React 17 JSX transform (specifically ref composition).
        </p>
      </header>

      <section className="stack">
        <p className="section-title">Quick sanity check</p>
        <div className="stack">
          <Button asChild>
            <a href="https://example.com" ref={anchorRef} target="_blank" rel="noreferrer">
              Slotted anchor using asChild
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default App;
