'use client'

import { signIn } from "next-auth/react";
import { type FC } from "react";

export const Landing: FC = () => {
  return (
    <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
      <div className="relative">
        <h1 className="flex text-3xl font-bold">Lift Companion</h1>
        <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
      </div>
      <p className="text-md w-72 text-center">An app to track lifting sessions and provide insight on the saved data.</p>
      <button
        onClick={() => signIn("discord")}
      >
        Login
      </button>
    </div>
  );
};