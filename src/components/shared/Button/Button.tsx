import React from "react";
import { clsx } from "clsx";

type Props = Partial<Pick<React.ComponentProps<"button">,
  "children" |
  "disabled" |
  "type" |
  "onKeyDown" |
  "onPointerDown"
>> & {
  onClick?: () => void;
  isTransparent?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        onKeyDown={props.onKeyDown}
        onPointerDown={props.onPointerDown}
        onClick={props.onClick}
        className={clsx(
          "inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
          {
            "bg-white text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900" : !props.isTransparent,
            "bg-transparent text-neutral-700 dark:text-neutral-100": props.isTransparent
          },
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          // Register all radix states
          "group",
          "radix-state-open:bg-neutral-200 dark:radix-state-open:bg-neutral-900",
          "radix-state-on:bg-neutral-200 dark:radix-state-on:bg-neutral-900",
          "radix-state-instant-open:bg-neutral-200 radix-state-delayed-open:bg-neutral-200"
        )}
      >
        {children}
      </button>
  )
});

Button.displayName = "Button";

export default Button;
