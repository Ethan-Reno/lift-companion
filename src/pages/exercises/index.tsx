import { type NextPage } from "next";
import React from "react";
import { api } from "../../utils/api";
import { ExerciseTable } from "../../components/Tables/Exercises/ExerciseTable";
import { exerciseColumns } from "../../components/Tables/Exercises/ExerciseTableColumns";
import Link from "next/link";
import { buttonVariants } from "lift-companion-ui";
import { clsx } from "clsx";
import { ArrowBigLeft } from "lucide-react";

const Exercises: NextPage = () => {
  const { data: exercises, isLoading } = api.exercise.getAll.useQuery();

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-6 items-center">
        <Link
          href="/"
          className={clsx(
            "",
            buttonVariants({ variant: "outline", size: "sm" })
          )}
        >
          <ArrowBigLeft className="h-4 w-4"/>
        </Link>
        <span className="text-2xl">Exercise Manager</span>
      </div>
      {isLoading && <div>Fetching exercises...</div>}
      {exercises && <ExerciseTable data={exercises} columns={exerciseColumns} />}
    </div>
  );
};

export default Exercises;
