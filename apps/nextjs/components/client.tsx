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
      <Slottable as={props.children}>
        {(children) => (
          <>
            <span>left</span> {children} <span>right</span>
          </>
        )}
      </Slottable>
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
      <Slottable as={props.children}>
        {(children) => (
          <>
            <span>left</span> {children} <span>right</span>
          </>
        )}
      </Slottable>
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
      <Slottable as={props.children}>
        {(children) => (
          <>
            <span>left</span>
            <b>bold {children}</b>
            <span>right</span>
          </>
        )}
      </Slottable>
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
        <Slottable as={props.children}>
          {(children) => (
            <>
              <span>ICON</span>
              <b>bold {children}</b>
            </>
          )}
        </Slottable>
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
