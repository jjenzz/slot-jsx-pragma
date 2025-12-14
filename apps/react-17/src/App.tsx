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
        console.log('button ref');
      }
    }, []);

    return <Comp className={mergedClassName} {...props} ref={mergedRefs} />;
  },
);

function CompositionEventTest() {
  const handleOuterClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('outer handler fired');
  };

  const handleHostClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('host handler fired');
  };

  return (
    <Button asChild onClick={handleOuterClick}>
      <a href="#" onClick={handleHostClick}>
        Click to test event handler merging
      </a>
    </Button>
  );
}

function CompositionRefTest() {
  const outerRef = React.useRef<React.ElementRef<typeof Button>>(null);
  const hostRef = React.useRef<React.ElementRef<'a'>>(null);

  React.useEffect(() => {
    if (outerRef.current) {
      console.log('outer ref received');
    }
    if (hostRef.current) {
      console.log('host ref received');
    }
  }, []);

  return (
    <Button asChild ref={outerRef}>
      <a href="#" ref={hostRef}>
        Ref merging test
      </a>
    </Button>
  );
}

function App() {
  const anchorRef = React.useRef<React.ElementRef<'a'>>(null);

  React.useEffect(() => {
    if (anchorRef.current) {
      console.log('anchor ref');
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
        <div className="stack" data-testid="basic-slot">
          <Button asChild>
            <a href="https://example.com" ref={anchorRef} target="_blank" rel="noreferrer">
              Slotted anchor using asChild
            </a>
          </Button>
        </div>
      </section>

      <section className="stack">
        <p className="section-title">Composition Tests</p>

        <div className="stack" data-testid="composition-classname">
          <p className="test-label">className merging</p>
          <Button asChild className="outer-class">
            <a href="#" className="host-class">
              className merge test
            </a>
          </Button>
        </div>

        <div className="stack" data-testid="composition-style">
          <p className="test-label">style merging</p>
          <Button asChild style={{ color: 'red', padding: '10px' }}>
            <a href="#" style={{ backgroundColor: 'blue', padding: '20px' }}>
              style merge test
            </a>
          </Button>
        </div>

        <div className="stack" data-testid="composition-events">
          <p className="test-label">Event handler merging</p>
          <CompositionEventTest />
        </div>

        <div className="stack" data-testid="composition-refs">
          <p className="test-label">Ref merging</p>
          <CompositionRefTest />
        </div>

        <div className="stack" data-testid="composition-props">
          <p className="test-label">Prop override (data attributes)</p>
          <Button asChild data-outer="outer-value" data-shared="outer">
            <a href="#" data-host="host-value" data-shared="host">
              prop override test
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default App;
