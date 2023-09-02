import { Button, Card, DropdownMenu, Select, Separator } from 'good-nice-ui';
import React, { useState } from 'react';
import { Metric, hasOptions } from '../../schemas/MetricSchema';
import { MoreHorizontal } from 'lucide-react';
import { MetricActions } from './MetricActions';

export interface CategorialMetricCardProps {
  metric: Metric;
}

export const CategorialMetricCard = ({
  metric,
}: CategorialMetricCardProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <Card className='w-full'>
      <Card.Header>
        <div className='flex flex-row items-center justify-between pb-0 space-y-0'>
          <Card.Title>{metric.name}</Card.Title>
          <MetricActions id={metric.id} />
        </div>
        <Card.Description>{metric.description}</Card.Description>
      </Card.Header>
      <Card.Content>
        {/* <span className='capitalize'>{`${metric.scale} scale`}</span> */}
        Options:
        {hasOptions(metric) && (
          <Select defaultValue={metric.options[0]?.label} onValueChange={(value) => setSelectedOption(value)}>
            <Select.Trigger className="mt-0 capitalize bg-background">
              <Select.Value />
            </Select.Trigger>
            <Select.Content className='capitalize'>
              {metric.options.map(option => (
                <Select.Item
                  key={option.id}
                  value={option.label}
                >
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        )}
      </Card.Content>
    </Card>
  );
};
