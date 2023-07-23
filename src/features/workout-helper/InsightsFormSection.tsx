import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, Dialog, DropdownMenu, Form, Label, Popover, ScrollArea, Select, XIcon } from 'good-nice-ui';
import { Info, PlusIcon } from 'lucide-react';
import { CreateWorkoutInputs, InsightValueEnum } from '../../schemas/WorkoutSchema';
import { toTitleCase } from '../../utils/toTitleCase';

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
        form.setValue(`insights.0.${insight}`, undefined);
        const { [insight]: removed, ...rest } = prev;
        return rest;
      } else {
        form.setValue(`insights.0.${insight}`, 'average');
        return { ...prev, [insight]: 'average' };
      }
    });
  };

  const addAllInsights = () => {
    const insightsToAdd: SelectedInsights = {};
    insights.forEach((insight) => {
      if (!(insight in selectedInsights)) {
        insightsToAdd[insight] = 'average';
      }
    });
    setSelectedInsights(prev => ({ ...prev, ...insightsToAdd }));
  };

  const allInsightsAdded = insights.every((insight) => insight in selectedInsights);
  // Use Object.keys to handle the selectedInsights object
  // const isAnyInsightSelected = Object.keys(selectedInsights).length > 0;

  return (
    <div className="flex flex-col relative pb-5 px-3 gap-6" id='insightsContainer'>
      {Object.keys(selectedInsights).length === 0 ? (
        <p className='pt-6 px-5 text-muted-foreground'>Enrich your data by adding insights to your workouts. We will look for relationships between these insights and your progress over time.</p>
      ) : (
        <div className="flex flex-col gap-4 pt-12">
          {/* <div className='flex gap-2 absolute top-6 right-6 ml-2  items-center'>
            <Label className='capitalize text-lowContrast-foreground'>Workout Insights</Label>
            <Popover>
              <Popover.Trigger>
                <Info className="h-4 w-4 text-primary hover:text-primary-hover" />
              </Popover.Trigger>
              <Popover.Content>
                <p className="text-lowContrast-foreground">
                  Enrich your data by adding insights to your workouts. We will look for relationships between these insights and your progress over time.
                </p>
              </Popover.Content>
            </Popover>
          </div> */}
          {Object.keys(selectedInsights).map((insightKey) => (
            <div className='flex gap-2 items-end' key={insightKey}>
              <Form.Field
                control={form.control}
                name={`insights.0.${insightKey}` as any}
                render={({ field }) => (
                  <Form.Item
                    className="grow relative flex items-end gap-2 m-0"
                  >
                    <Form.Label className="capitalize text-lowContrast-foreground mb-3 ml-5">{`${insightKey}:`}</Form.Label>
                    <Select
                      value={field.value}
                      onValueChange={value => field.onChange(value)}
                    >
                      <Select.Trigger className="mt-0">
                        <Select.Value />
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
              <Dialog>
                <Dialog.Trigger asChild>
                  <Button type="button" variant="ghost" size="icon" className='min-w-[40px]'>
                    <XIcon size={22} className="text-red-500"/>
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>Delete Insight</Dialog.Header>
                  <Dialog.Description>
                    <p className="text-lowContrast-foreground">Are you sure you want to delete this insight?</p>
                  </Dialog.Description>
                  <Dialog.Footer>
                    <Button variant="secondary" onClick={() => console.log('test')}>Cancel</Button>
                    <Button variant="destructive" onClick={() => toggleInsight(insightKey as InsightKeys)}>Delete</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
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
            className='w-fit self-center'
          >
            <PlusIcon size={18} className='mr-2' />
            Add
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label className="text-lowContrast-foreground">Insights</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem
            className='p-2 pl-8'
            checked={allInsightsAdded}
            onClick={addAllInsights}
          >
            All
          </DropdownMenu.CheckboxItem>
          {insights.map((insight) => (
            <DropdownMenu.CheckboxItem
              key={insight}
              className='p-2 pl-8'
              checked={insight in selectedInsights}
              onClick={() => toggleInsight(insight)}
            >
              {toTitleCase(insight)}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
