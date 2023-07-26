import React, { useEffect, useMemo } from "react";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import { ExerciseTable } from "../../features/exercise-manager/ExerciseTable";
import { exerciseColumns, getExerciseLoadingColumns } from "../../features/exercise-manager/ExerciseTableColumns";
import { useStore } from "../../store/store";
import { Header } from "../../components";

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
      <div className='self-start'>
        <Header isLoading={isLoading}>
          Exercise Manager
        </Header>
      </div>
      <ExerciseTable data={tableData} columns={tableColumns} />
    </div>
  );
};

export default Exercises;
