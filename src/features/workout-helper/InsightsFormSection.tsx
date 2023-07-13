import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, DropdownMenu, Form, ScrollArea, Select, XIcon } from 'good-nice-ui';
import { PlusIcon } from 'lucide-react';
import { CreateWorkoutInputs, InsightValueEnum } from '../../schemas/WorkoutSchema';

const insights = ['mood', 'sleepQuality', 'energyLevel', 'warmupQuality'] as const;
type InsightKeys = typeof insights[number]; // 'mood' | 'sleepQuality' | 'energyLevel' | 'warmupQuality'

export type SelectedInsights = {
  [K in InsightKeys]?: InsightValueEnum | null;
}

type InsightsFormSectionProps = {
  form: UseFormReturn<CreateWorkoutInputs>;
  selectedInsights: SelectedInsights;
  setSelectedInsights: React.Dispatch<React.SetStateAction<SelectedInsights>>;
};

export const InsightsFormSection = ({
  form,
  selectedInsights,
  setSelectedInsights
}: InsightsFormSectionProps) => {
  const toggleInsight = (insight: InsightKeys) => {
    setSelectedInsights(prev => {
      if (prev[insight]) {
        form.setValue(`insights.0.${insight}`, undefined); // adjusted the setValue path
        const { [insight]: removed, ...rest } = prev;
        return rest;
      } else {
        form.setValue(`insights.0.${insight}`, 'average'); // adjusted the setValue path and corrected the enum reference
        return { ...prev, [insight]: 'average' };
      }
    });
  };

  // Use Object.keys to handle the selectedInsights object
  const isAnyInsightSelected = Object.keys(selectedInsights).length > 0;

  return (
    <div className="flex flex-col gap-3" id='insightsContainer'>
      {Object.keys(selectedInsights).length === 0 ? (
        <div className='flex flex-col gap-2'>
          <h3>No insights added.</h3>
          <p className='text-sm'>Adding insights to your workouts will give you more information about what is influencing your performance</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.keys(selectedInsights).map((insightKey) => (
            <div className='flex gap-2 items-end' key={insightKey}>
              <Form.Field
                control={form.control}
                name={`insights.0.${insightKey}` as any}
                render={({ field }) => (
                  <Form.Item
                    className="grow"
                  >
                    <Form.Label>{insightKey}</Form.Label>
                    <Select
                      value={field.value}
                      onValueChange={value => field.onChange(value)}
                    >
                      <Select.Trigger>
                        <Select.Value/>
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value={'belowAverage'}>Below Average</Select.Item>
                        <Select.Item value={'average'}>Average</Select.Item>
                        <Select.Item value={'aboveAverage'}>Above Average</Select.Item>
                      </Select.Content>
                    </Select>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => toggleInsight(insightKey as InsightKeys)}>
                <XIcon size={22} className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
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
              checked={insight in selectedInsights}
              onClick={() => toggleInsight(insight)}
            >
              {insight}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
