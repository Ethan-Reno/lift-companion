'use client'

import { signOut } from "next-auth/react";
import { type FC } from "react";

export const Dashboard: FC = () => {
  return (
    <div className="flex flex-col">
      {/* <RecentExercisesGrid /> */}
      <button
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
};
