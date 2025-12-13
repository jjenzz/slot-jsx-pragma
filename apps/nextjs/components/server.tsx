import * as React from 'react';
import { Slot, Slottable } from 'slot-jsx/react';
import * as Client from './client';

export const Link = ({
  asChild = false,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'a';
  return <Comp {...props} />;
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
  return (
    <Button asChild>
      <Link {...props}>{props.children}</Link>
    </Button>
  );
};

export const Button = ({
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
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
    <Client.Button asChild>
      <Comp {...props}>
        <span>ICON</span>
        <b>
          bold <Slottable>{children}</Slottable>
        </b>
      </Comp>
    </Client.Button>
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
      {typeof render === 'function' ? (
        render(props)
      ) : (
        <Slottable as={render}>{props.children}</Slottable>
      )}
    </Comp>
  );
};
