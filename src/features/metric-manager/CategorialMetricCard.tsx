import { Card, Select, Separator } from 'good-nice-ui';
import React, { useState } from 'react';
import { Metric, hasOptions } from '../../schemas/MetricSchema';

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
        <Card.Title>{metric.name}</Card.Title>
        <Card.Description>{metric.description}</Card.Description>
      </Card.Header>
      <Card.Content>
        <span className='capitalize'>{`${metric.scale} scale`}</span>
        Preview:
        {hasOptions(metric) && (
          <Select defaultValue={metric.options[0]?.label} onValueChange={(value) => setSelectedOption(value)}>
            <Select.Trigger className="mt-0 capitalize">
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
