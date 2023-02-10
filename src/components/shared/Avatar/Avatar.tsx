import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import React, { Fragment } from "react";

enum Variant {
  Circle,
  Rounded,
}

type AvatarProps = {
  variant: Variant;
  image: string;
  name: string;
};

const Avatar = ({
  variant,
  image,
  name,
}: AvatarProps) => {
  return (
    <Fragment>
      <AvatarPrimitive.Root
        className="relative inline-flex h-8 w-8"
      >
        <AvatarPrimitive.Image
          src={image}
          alt="Avatar"
          className={clsx(
            "h-full w-full object-cover",
            {
              [Variant.Circle]: "rounded-full",
              [Variant.Rounded]: "rounded",
            }[variant]
          )}
        />
        <AvatarPrimitive.Fallback
          className={clsx(
            "flex h-full w-full items-center justify-center bg-white dark:bg-gray-800",
            {
              [Variant.Circle]: "rounded-full",
              [Variant.Rounded]: "rounded",
            }[variant]
          )}
          delayMs={600}
        >
          <span className="text-sm font-medium uppercase text-gray-700 dark:text-gray-400">
            {name.charAt(0).toUpperCase()}
          </span>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </Fragment>
  );
};

Avatar.variant = Variant;

export default Avatar;
