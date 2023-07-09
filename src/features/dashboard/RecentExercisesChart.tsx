import React from 'react';
import { api } from '../../utils/api';
import { LineChart, X_AXIS_TYPE, Y_AXIS_TYPE } from '../data-explorer/LineChart';
import { getExerciseChartData } from '../data-explorer/getExerciseChartData';
import { X } from 'lucide-react';
import { Button, Label, Select } from 'good-nice-ui';

export const RecentExercisesChart = () => {
  const { data, isLoading } = api.exercise.getAllExercisesWithCompletedWorkouts.useQuery();
  const [ xAxisType, setXAxisType ] = React.useState<X_AXIS_TYPE>(X_AXIS_TYPE.DATE);
  const [ yAxisType, setYAxisType ] = React.useState<Y_AXIS_TYPE>(Y_AXIS_TYPE.TOTAL_VALUE);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  const axes = {
    x: xAxisType,
    y: yAxisType,
  }

  return data &&
    <div className="flex flex-col gap-8">
      <div className='flex flex-col gap-6'>

        <div className="flex gap-3 items-center">
          <Label>X Axis:</Label>
          <Select
            onValueChange={(value) => setXAxisType(value as X_AXIS_TYPE)}
            defaultValue={xAxisType}
          >
            <Select.Trigger className='w-32'>{xAxisType}</Select.Trigger>
            <Select.Content>
              <Select.Item value={X_AXIS_TYPE.DATE}>
                Date
              </Select.Item>
              <Select.Item value={X_AXIS_TYPE.NUMBER}>
                Number
              </Select.Item>
            </Select.Content>
          </Select>
        </div>

        <div className="flex gap-3 items-center">
          <Label>Y Axis:</Label>
          <Select
            onValueChange={(value) => setYAxisType(value as Y_AXIS_TYPE)}
            defaultValue={yAxisType}
          >
            <Select.Trigger className='w-32'>{yAxisType}</Select.Trigger>
            <Select.Content>
              <Select.Item value={Y_AXIS_TYPE.TOTAL_VALUE}>
                Total Value
              </Select.Item>
              <Select.Item value={Y_AXIS_TYPE.ONE_REP_MAX}>
                One Rep Max
              </Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>

      <LineChart
        data={getExerciseChartData(data, axes)}
        axes={axes}
        title='Recent Exercises'
      />
    </div>
}
