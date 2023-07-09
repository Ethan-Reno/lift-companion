import { compareAsc } from "date-fns";
import { Set, Workout } from "../../schemas/WorkoutSchema";
import { Exercise } from "../../schemas/ExerciseSchema";
import { X_AXIS_TYPE, Y_AXIS_TYPE } from "./LineChart";
import { ChartData, ChartDataset } from "chart.js";

export const getExerciseChartData = (
  exercises: Exercise[],
  axes: {
    x: X_AXIS_TYPE,
    y: Y_AXIS_TYPE,
  },
) => {
  const getTotalSetValue = (sets: Set[]) => {
    return sets.reduce((total: number, set: Set) => total + (set.reps * set.value), 0);
  };

  const getOneRepMaxValue = (sets: Set[]) => {
    const sortedSets = sets.sort((a: Set, b: Set) => (b.value * b.reps) - (a.value * a.reps));
    // NOTE: I'll want further refinement based on the research
    // Determine if I want to pick a different set, or omit altogether, if there is "bad" data, e.g. 50 reps at 10 lbs
    if (sortedSets[0]) return Math.round(sortedSets[0].value * (36 / (37 - sortedSets[0].reps)));
    return 0;
  };

  const chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  exercises.forEach((exercise: Exercise) => {
    if (!exercise.workouts) {
      return;
    }
    const dataset: ChartDataset<'line'> = {
      label: exercise.name,
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    };

    // Sort workouts by date
    exercise.workouts.sort((a: Workout, b: Workout) => compareAsc(a.createdAt, b.createdAt))
      .forEach((workout: Workout, index: number) => {
        const date = workout.createdAt;
        // Add date to labels if it doesn't exist
        if (!chartData.labels?.includes(date)) {
          chartData.labels?.push(date);
        }
        // Add data point
        dataset.data.push({
          x: axes.x === X_AXIS_TYPE.DATE ? date.getTime() : index + 1,
          y: axes.y === Y_AXIS_TYPE.TOTAL_VALUE ? getTotalSetValue(workout.sets) : getOneRepMaxValue(workout.sets),
        });
      }
    );
    // Add dataset to chart data
    chartData.datasets.push(dataset);
  });
  return chartData;
};
