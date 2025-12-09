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
      <span>left</span> <Slottable>{props.children}</Slottable> <span>right</span>
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
  children,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props}>
      <span>left</span> <Slottable>{children}</Slottable> <span>right</span>
    </Comp>
  );
};

export const ButtonNestedSlottable = ({
  children,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp {...props}>
      <span>left</span>
      <b>
        bold <Slottable>{children}</Slottable>
      </b>
      <span>right</span>
    </Comp>
  );
};

export const IconButtonNestedSlottable = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const Comp = props.asChild ? Slot : React.Fragment;
  return (
    <Button {...props}>
      <Comp>
        <span>ICON</span>
        <b>
          bold <Slottable>{children}</Slottable>
        </b>
      </Comp>
    </Button>
  );
};
