'use client';

import * as React from 'react';
import { Slot, Slottable } from 'slot-jsx/react';
import mergeRefs from 'merge-refs';

export const Link = ({
  asChild = false,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'a';
  const ref = React.useRef<HTMLAnchorElement>(null);
  const mergedRefs = mergeRefs(props.ref, ref);
  return <Comp {...props} ref={mergedRefs} />;
};

export const LinkSlottable = ({
  asChild = false,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp {...props}>
      <span>left</span>
      <Slottable>{props.children}</Slottable>
      <span>right</span>
    </Comp>
  );
};

export const LinkButton = (props: React.ComponentProps<typeof Link>) => {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  return (
    <Button asChild>
      <Link {...props} ref={anchorRef}>
        {props.children}
      </Link>
    </Button>
  );
};

export const Button = ({
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  const ref = React.useRef<HTMLButtonElement>(null);
  const mergedRefs = mergeRefs(props.ref, ref);
  return <Comp {...props} ref={mergedRefs} />;
};

export const ButtonSlottable = ({
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props}>
      <span>left</span>
      <Slottable>{props.children}</Slottable>
      <span>right</span>
    </Comp>
  );
};

export const ButtonNestedSlottable = ({
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props}>
      <span>left</span>
      <Slottable as={props.children}>{(children) => <b>bold {children}</b>}</Slottable>
      <span>right</span>
    </Comp>
  );
};

export const IconButtonNestedSlottable = ({
  asChild,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Button asChild>
      <Comp {...props}>
        <span>ICON</span>
        <Slottable as={props.children}>{(children) => <b>bold {children}</b>}</Slottable>
      </Comp>
    </Button>
  );
};

export const ButtonSiblingSlottable = ({
  children,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props}>
      <span>left</span>
      <Slottable>{children}</Slottable>
      <span>right</span>
    </Comp>
  );
};

// IRL this would be typed correctly but we're just testing functionality here
interface ButtonRenderProps extends React.ComponentProps<'button'> {
  render?: React.ReactElement | ((props: any) => React.ReactElement);
}

export const ButtonRender = ({ render, ...props }: ButtonRenderProps) => {
  const Comp = render ? Slot : 'button';
  return (
    <Comp {...props}>
      <Slottable as={render}>{props.children}</Slottable>
    </Comp>
  );
};

export const ButtonRenderProp = (props: React.ComponentProps<typeof ButtonRender>) => {
  return (
    <ButtonRender
      {...props}
      render={(props) => (
        <Link
          href="/"
          {...props}
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
        />
      )}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Composition Test Components
 * -----------------------------------------------------------------------------------------------*/

export function CompositionEventTest() {
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
      <Link
        href="/"
        onClick={handleHostClick}
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      >
        Click to test event handler merging
      </Link>
    </Button>
  );
}

export function CompositionRefTest() {
  const outerRef = React.useRef<React.ComponentRef<typeof Button>>(null);
  const hostRef = React.useRef<React.ComponentRef<typeof Link>>(null);

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
      <Link
        href="/"
        ref={hostRef}
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      >
        Ref merging test
      </Link>
    </Button>
  );
}
