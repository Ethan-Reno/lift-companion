import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, DropdownMenu, Form, ScrollArea, Select, XIcon } from 'good-nice-ui';
import { PlusIcon } from 'lucide-react';
import { createWorkoutSchema } from '../../schemas/WorkoutSchema';
import { z } from 'zod';

interface InsightsFormSectionProps {
  form: UseFormReturn<z.infer<typeof createWorkoutSchema>>;
}

export const InsightsFormSection = ({ form }: InsightsFormSectionProps) => {
  const insights = ['mood', 'sleepQuality', 'energyLevel', 'warmupQuality'];
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);

  const toggleInsight = (insight: string) => {
    setSelectedInsights(prev => {
      if (prev.includes(insight)) {
        form.setValue(`insights.${insight}` as any, undefined);
        return prev.filter(i => i !== insight);
      } else {
        form.setValue(`insights.${insight}` as any, 'average');
        return [...prev, insight];
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 w-1/2" id='insightsContainer'>
      <div className="flex gap-6 items-center">
        <h1>Insights</h1>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button
              type="button"
              size="sm"
              variant='link'
              className='w-fit'
            >
              <PlusIcon size={18} className='mr-2' />
              Add
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {insights.map((insight) => (
              <DropdownMenu.CheckboxItem
                key={insight}
                checked={selectedInsights.includes(insight)}
                onClick={() => toggleInsight(insight)}
              >
                {insight}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
      <ScrollArea className="border rounded-md max-h-[540px]" id="insights">
        {selectedInsights.length === 0 ? (
          <div className='flex flex-col p-6 gap-3'>
            <h3>No insights added.</h3>
            <p className='text-sm'>Adding insights to your workouts will give you more information about what is influencing your performance</p>
          </div>
        ) : (
          <div className="flex flex-col p-6 gap-8">
            {selectedInsights.map((insight) => (
              <div className='flex gap-2 items-end'>
                <Form.Field
                  control={form.control}
                  name={`insights.${insight}` as any}
                  render={({ field }) => (
                    <Form.Item className="flex-grow">
                      <Form.Label>{insight}</Form.Label>
                      <Select
                        value={field.value}
                        onValueChange={value => field.onChange(value)}
                      >
                        <Select.Trigger>
                          <Select.Value placeholder="Select one" />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="belowAverage">Below Average</Select.Item>
                          <Select.Item value="average">Average</Select.Item>
                          <Select.Item value="aboveAverage">Above Average</Select.Item>
                        </Select.Content>
                      </Select>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => toggleInsight(insight)}>
                  <XIcon size={22} className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};