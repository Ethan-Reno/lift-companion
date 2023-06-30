import { Separator, buttonVariants } from "good-nice-ui";
import Link from "next/link";
import React from "react"

export default function Custom404() {
  return (
    <div className="flex pt-14 justify-center items-center gap-8">
      <span className="font-bold text-7xl">404</span>
      <Separator orientation="vertical" className="h-28"/>
      <div className="flex flex-col gap-3">
        <span>Page Not Found</span>
        <Link
          href="/"
          className={buttonVariants({ variant: "outline" })}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}