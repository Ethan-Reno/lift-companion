'use client'

import { type Exercise } from "@prisma/client";
import { Button, DropdownMenu } from "good-nice-ui";
import { signOut } from "next-auth/react";
import { type FC } from "react";
import 'good-nice-ui/dist/index.css';


export interface DashboardProps {
  exercises: Exercise[];
}

export const Dashboard = ({exercises}: DashboardProps) => {
  return (
    <div className="flex flex-col">
      {exercises.map((exercise) => (
        <div key={exercise.id}>{exercise.name}</div>
      ))}
      {/* <RecentExercisesGrid /> */}
      <Button
        onClick={() => signOut()}
        variant='primary'
      >
        Sign out
      </Button>
      <DropdownMenu>

      </DropdownMenu>
    </div>
  );
};
