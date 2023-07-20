import { compareAsc } from "date-fns";
import { Set, Workout } from "../../schemas/WorkoutSchema";
import { X_AXIS_TYPE, Y_AXIS_TYPE } from "./LineChart";
import { ChartData, ChartDataset } from "chart.js";
import { Exercise } from "../../schemas/ExerciseSchema";

export const getExerciseChartData = (
  data: Exercise | Exercise[],
  axes: {
    x: X_AXIS_TYPE,
    y: Y_AXIS_TYPE,
  },
): ChartData<'line'> => {
  const getTotalSetValue = (sets: Set[]) => sets.reduce((total, set) => total + (set.reps * set.value), 0);

  const getOneRepMaxValue = (sets: Set[]) => {
    const sortedSets = sets.sort((a, b) => (b.value * b.reps) - (a.value * a.reps));
    if (sortedSets[0]) return Math.round(sortedSets[0].value * (36 / (37 - sortedSets[0].reps)));
    return 0;
  };

  const chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  // Ensure data is always an array
  const exercises = Array.isArray(data) ? data : [data];

  exercises.forEach((exercise) => {
    if (!exercise.workouts || exercise.workouts.length === 0) {
      return;
    }

    const dataset: ChartDataset<'line'> = {
      label: exercise.name,
      data: [],
    };

    exercise.workouts.sort((a, b) => compareAsc(a.createdAt, b.createdAt))
      .forEach((workout, index) => {
        const date = workout.createdAt;
        if (!chartData.labels?.includes(date)) {
          chartData.labels?.push(date);
        }
        dataset.data.push({
          x: axes.x === X_AXIS_TYPE.DATE ? date.getTime() : index + 1,
          y: axes.y === Y_AXIS_TYPE.TOTAL_VALUE ? getTotalSetValue(workout.sets) : getOneRepMaxValue(workout.sets),
        });
      });

    chartData.datasets.push(dataset);
  });

  return chartData;
};
