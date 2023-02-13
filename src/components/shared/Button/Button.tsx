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
            "bg-white text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900" : !props.isTransparent,
            "bg-transparent text-zinc-700 dark:text-zinc-100": props.isTransparent
          },
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          // Register all radix states
          "group",
          "radix-state-open:bg-zinc-200 dark:radix-state-open:bg-zinc-900",
          "radix-state-on:bg-zinc-200 dark:radix-state-on:bg-zinc-900",
          "radix-state-instant-open:bg-zinc-200 radix-state-delayed-open:bg-zinc-200"
        )}
      >
        {children}
      </button>
  )
});

Button.displayName = "Button";

export default Button;
