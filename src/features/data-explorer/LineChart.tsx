import React from 'react';
import { Line } from 'react-chartjs-2';
import { Workout, Set } from '../../schemas/WorkoutSchema';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Recent Exercises',
    },
  },
};

export const ExerciseLineChart = ({ data }: any) => {
  const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)'];
  const finalData: ChartData<'line'> = {
    labels: Array.from({ length: data.length }, (_, i) => `Data Point ${i + 1}`),
    datasets: [],
  };

  data.forEach((exercise: any, index: number) => {
    finalData.datasets.push({
      label: exercise.exercise.name,
      data: exercise.workouts.map((workout: Workout) => {
        return workout.sets.reduce((acc: number, set: Set) => {
          return acc + set.value;
        }, 0);
      }),
      borderColor: colors[index],
      backgroundColor: colors[index],
    });
  });

  return <Line data={finalData} />;
};
