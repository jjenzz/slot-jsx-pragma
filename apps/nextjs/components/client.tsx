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
  asChild,
  children,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Button asChild>
      <Comp {...props}>
        <span>ICON</span>
        <b>
          bold <Slottable>{children}</Slottable>
        </b>
      </Comp>
    </Button>
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
