import React from "react";

type Props = Partial<Pick<React.ComponentProps<"button">,
  "children" |
  "disabled" |
  "type" |
  "onKeyDown" |
  "onPointerDown"
>> & {
  onClick?: () => void;
  isLoading?: boolean;
  variant: 'primary' | 'secondary' | 'text' | 'transparent';
  className?: string;
  href?: string;
  target?: string;
  size: 'default' | 'fit' | 'block';
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    const {
      type,
      variant,
      className,
      size,
      isLoading,
      disabled,
      onClick,
      onKeyDown,
      onPointerDown,
    } = props;

    const display = 'flex flex-row items-center'
    const padding = 'px-4 py-2';
    const shadow = {
      primary: 'shadow-md shadow-black',
      secondary: 'shadow-md shadow-black',
      text: 'shadow-md shadow-black',
      transparent: 'shadow-none',
    };
    const textColor = {
      primary: 'text-zinc-900',
      secondary: 'text-zinc-200',
      text: 'text-zinc-100 hover:text-zinc-100',
      transparent: 'text-zinc-200',
    };
    const backgroundColor = {
      primary: 'bg-zinc-300 hover:bg-zinc-400',
      secondary: 'bg-zinc-800 hover:bg-zinc-900',
      text: 'bg-light-button hover:bg-blue-500 dark:bg-gray-800 dark:hover:bg-blue-500',
      transparent: 'bg-transparent'
    };
    const border = {
      primary: 'border-zinc-300 border-2 rounded-md',
      secondary: 'border-2 border-zinc-600 rounded-md',
      text: 'border-none',
      transparent: 'border-none',
    };
    const sizeOptions = {
      default: 'p-5',
      fit: 'w-fit h-fit',
      block: 'block w-full',
    }
    const disabledStyle = disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'transition ease-in-out duration-300 hover:cursor-pointer';
  
    let baseClasses = [
      display,
      border[variant],
      backgroundColor[variant],
      textColor[variant],
      sizeOptions[size],
      shadow[variant],
      padding,
      disabledStyle,
    ];
  
    if (className) {
      baseClasses = [...baseClasses, ...className.split(' ')];
    }

    return (
      <button
        ref={ref}
        type={type}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onClick={onClick}
        disabled={isLoading || disabled}
        className={baseClasses.join(' ')}
      >
        {isLoading ? 'Processing...' : children}
      </button>
  )
});

Button.displayName = "Button";

export default Button;
