import React from 'react';
import { Line } from 'react-chartjs-2';
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

export enum X_AXIS_TYPE {
  DATE = 'date',
  NUMBER = 'number',
}

export enum Y_AXIS_TYPE {
  TOTAL_VALUE = 'totalValue',
  ONE_REP_MAX = 'oneRepMax',
}

interface LineChartProps {
  data: ChartData<'line'>;
  axes: {
    x: X_AXIS_TYPE;
    y: Y_AXIS_TYPE;
  };
  title: string;
}

export const LineChart = ({ data, axes, title }: LineChartProps) => {

  // Options needs to be in the same component as the chart
  // Due to the date-fns adapter being kind of weird
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'linear',
        ticks: {
          stepSize: 1,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
      },
      line: {
        tension: 0.1,
      }
    },
  };

  // Override default options based on props
  if (axes.x === X_AXIS_TYPE.DATE) {
    options.scales = {  
      ...options.scales,
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    };
  }

  return <Line options={options} data={data} />;
};
