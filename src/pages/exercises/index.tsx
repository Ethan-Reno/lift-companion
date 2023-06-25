import React, { useEffect, useMemo } from "react";
import { type NextPage } from "next";
import Link from "next/link";
import { buttonVariants } from "good-nice-ui";
import { clsx } from "clsx";
import { ArrowBigLeft } from "lucide-react";
import { api } from "../../utils/api";
import { ExerciseTable } from "../../components/Tables/Exercises/ExerciseTable";
import { exerciseColumns, getExerciseLoadingColumns } from "../../components/Tables/Exercises/ExerciseTableColumns";
import { useStore } from "../../store/store";

const Exercises: NextPage = () => {
  const { shouldRefetch, setShouldRefetch } = useStore();
  const { data: exercises, isLoading, refetch } = api.exercise.getAll.useQuery();

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

  const tableData = useMemo(
    () => (isLoading ? Array(3).fill({}) : exercises || []),
    [isLoading, exercises]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? exerciseColumns.map((column) => ({
            ...column,
            cell: () => {
              return getExerciseLoadingColumns(column);
            },
          }))
        : exerciseColumns,
    [isLoading, exerciseColumns]
  );

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
      <ExerciseTable data={tableData} columns={tableColumns} />
    </div>
  );
};

export default Exercises;
