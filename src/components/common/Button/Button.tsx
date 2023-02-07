import React, { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  buttonStyle?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  className?: string;
  size?: 'default' | 'fit' | 'block';
  onClick?: () => void;
  isLoading?: boolean;
}

export default function Button ({
  children,
  type = 'button',
  buttonStyle = 'primary',
  className = '',
  disabled = false,
  size = 'fit',
  onClick,
  isLoading,
}: ButtonProps) {
  const fontStyle = 'font-bold';

  const padding = 'px-4 py-2';

  const shadow = 'shadow-md shadow-black';

  const textColor = {
    primary: 'text-zinc-900',
    secondary: 'text-zinc-200',
    text: 'text-zinc-100 hover:text-zinc-100',
  };

  const backgroundColor = {
    primary: 'bg-zinc-300 hover:bg-zinc-400',
    secondary: 'bg-zinc-800 hover:bg-zinc-900',
    text: 'bg-light-button hover:bg-blue-500 dark:bg-gray-800 dark:hover:bg-blue-500',
  };

  const border = {
    primary: 'border-zinc-300 border-2 rounded-md',
    secondary: 'border-2 border-zinc-600 rounded-md',
    text: 'border-none',
  };

  const sizeOptions = {
    default: 'w-5 h-5',
    fit: 'w-fit h-fit',
    block: 'block w-full',
  }

  const disabledStyle = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'transition ease-in-out duration-300 hover:cursor-pointer';

  let baseClasses = [
    fontStyle,
    border[buttonStyle],
    backgroundColor[buttonStyle],
    textColor[buttonStyle],
    sizeOptions[size],
    shadow,
    padding,
    disabledStyle,
  ];

  if (className) {
    baseClasses = [...baseClasses, ...className.split(' ')];
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses.join(' ')}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
}
