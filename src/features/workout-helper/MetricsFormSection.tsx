import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { CreateWorkoutInputs } from '../../schemas/WorkoutSchema';
import { Button, Dialog, XIcon, Form, Select, Popover, Command, Checkbox } from 'good-nice-ui';
import { Plus } from 'lucide-react';
import { Metric } from '../../schemas/MetricSchema';
import { api } from '../../utils/api';

export interface MetricsFormSectionProps {
  form: UseFormReturn<CreateWorkoutInputs>;
}

export const MetricsFormSection = ({ form }: MetricsFormSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workoutMetrics',
  });
  const { data: metrics, isLoading } = api.metric.getAll.useQuery();
  
  const toggleMetricsSelection = (toggledMetric: Metric) => {
    const fieldIndex = fields.findIndex(field => field.metricId === toggledMetric.id);
    if (fieldIndex !== -1) {
      remove(fieldIndex);
    } else {
      append({ metricId: toggledMetric.id, value: 3 });
    }
  };

  return (
    <div className="flex flex-col relative pb-5 px-3 gap-6" id='metricsContainer'>
      {fields.length === 0 ? (
        <p className='pt-6 px-5 text-muted-foreground'>
          Enrich your data by adding metrics to your workouts. We will look for relationships between these metrics and your progress over time.
        </p>
      ) : (
        <div className="flex flex-col gap-4 pt-6">
          {fields.map((item, index) => {
            if (isLoading) return <div>Loading...</div>;
            const metric = metrics?.find(metric => metric.id === item.metricId);
            if (metric) {
              return (
                <div className='flex gap-2 items-end' key={item.id}>
                  <Form.Field
                    control={form.control}
                    name={`workoutMetrics[${index}].value` as any}
                    render={({ field }) => (
                      <Form.Item className="grow relative flex items-end gap-2 m-0">
                        <Form.Label className="capitalize text-lowContrast-foreground mb-3 ml-5">{`${metric?.name}:`}</Form.Label>
                        <Select
                          defaultValue='3'
                          onValueChange={(value) => field.onChange(parseInt(value))}
                        >
                          <Select.Trigger className="mt-0 capitalize">
                            <Select.Value />
                          </Select.Trigger>
                          <Select.Content className='capitalize'>
                            <Select.Item value='1'>{metric?.label1}</Select.Item>
                            <Select.Item value='2'>{metric?.label2}</Select.Item>
                            <Select.Item value='3'>{metric?.label3}</Select.Item>
                            <Select.Item value='4'>{metric?.label4}</Select.Item>
                            <Select.Item value='5'>{metric?.label5}</Select.Item>
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
                      <Dialog.Title>Delete Metric</Dialog.Title>
                      <Dialog.Description className="text-lowContrast-foreground">
                        Are you sure you want to delete this metric?
                      </Dialog.Description>
                      <Dialog.Footer>
                        <Button variant="secondary" onClick={() => console.log('test')}>Cancel</Button>
                        <Button variant="destructive" onClick={() => console.log('another test')}>Delete</Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog>
                </div>
              )
            }
          })}
        </div>
      )}
      <Popover>
        <Popover.Trigger asChild>
          <Button
            type="button"
            variant='link'
            className='w-fit self-center text-foreground decoration-primary'
            size='sm'
          >
          <Plus size={18} className='mr-2 text-primary' />
            Add Metric
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-[300px] p-0" align='end'>
          <Command>
            <Command.Input placeholder="Search..." />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group>
                {metrics?.map((metric: Metric) => {
                  const isSelected = fields.some(field => field.metricId === metric.id);
                  return (
                    <div className='relative'>
                      <Command.Item
                        key={metric.id}
                        onSelect={() => toggleMetricsSelection(metric)}
                        className='p-3 pl-9'
                      >
                        {metric.name}
                      </Command.Item>
                      <Checkbox checked={isSelected} className='absolute top-3.5 left-3' />
                    </div>
                  );
                })}
              </Command.Group>
            </Command.List>
          </Command>
          {fields.length > 0 && <div className="w-full gap-2 flex border-t p-2">
            {/* <Button
              variant="outline"
              className="border-lowContrast-foreground bg-transparent w-1/2"
            >
              Add all
            </Button> */}
            {/* TODO: Move this into an alert dialog to confirm clearing */}
            <Button
              variant="outline"
              size='sm'
              className='border-destructive bg-transparent w-full'
              onClick={() => remove()}
            >
              Deselect all
            </Button>
          </div>
        }
        </Popover.Content>
      </Popover>
    </div>
  );
};