import { type NextPage } from "next";
import React from "react";
import { api } from "../../utils/api";
import { ExerciseTable } from "../../components/Tables/Exercises/ExerciseTable";
import { exerciseColumns } from "../../components/Tables/Exercises/ExerciseTableColumns";
import Link from "next/link";
import { buttonVariants } from "lift-companion-ui";
import { clsx } from "clsx";

const Exercises: NextPage = () => {
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery();

  return (
    <div id="ExerciseContainer" className="flex w-screen justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className={clsx(
              "",
              buttonVariants({ variant: "outline" })
            )}
          >
            Back
          </Link>
          <span className="text-2xl">Exercises</span>
        </div>
        {isLoading && <div>Fetching exercises...</div>}
        {exercises && <ExerciseTable data={exercises} columns={exerciseColumns} />}
      </div>
    </div>
  );
};

export default Exercises;
