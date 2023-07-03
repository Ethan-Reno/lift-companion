import React from 'react';
import { Line } from 'react-chartjs-2';
import { Workout, Set } from '../../schemas/WorkoutSchema';
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Exercise } from '../../schemas/ExerciseSchema';
import { compareAsc } from 'date-fns';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExerciseLineChartProps {
  data: Exercise[];
  isDateMode?: boolean;
}

export const ExerciseLineChart = ({ data, isDateMode }: ExerciseLineChartProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent Exercises',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  };

  const labels: any[] = [];
  const chartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  data.forEach((exercise: Exercise) => {
    if (!exercise.workouts) {
      return;
    }
    const dataset = {
      label: exercise.name,
      data: [] as any,
      borderColor: 'rgb(75, 192, 192)',
      borderBackground: 'rgba(75, 192, 192, 0.2)',
    };

    exercise.workouts.sort((a: Workout, b: Workout) => compareAsc(a.createdAt, b.createdAt))
      .forEach((workout: Workout) => {
        const date = workout.createdAt;
        if (!labels.includes(date)) {
          labels.push(date);
        }
        dataset.data.push({
          x: date,
          y: workout.sets.reduce((total: number, set: any) => total + (set.reps * set.value), 0)
        });
      });
    chartData.datasets.push(dataset);
  });

  chartData.labels = labels;

  return <Line options={options} data={chartData} />;
};