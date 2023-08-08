import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { CreateWorkoutInputs } from '../../schemas/WorkoutSchema';
import { Button, Dialog, XIcon, Form, Select, Popover, Command, Checkbox } from 'good-nice-ui';
import { MinusIcon, Plus } from 'lucide-react';
import { CategoricalMetric } from '../../schemas/CategoricalMetricSchema';

export interface MetricsFormSectionProps {
  form: UseFormReturn<CreateWorkoutInputs>;
  categoricalMetrics: CategoricalMetric[];
}

export const MetricsFormSection = ({
  form,
  categoricalMetrics,
}: MetricsFormSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workoutMetrics',
  });
  const [isClearMetricsDialogOpen, setIsClearMetricsDialogOpen] = useState(false);

  const toggleMetricsSelection = (toggledMetric: CategoricalMetric, isSelected: boolean) => {
    if (isSelected) {
      remove(
        fields.findIndex((field) =>
          toggledMetric.options.some((option) => option.id === field.categoricalMetricId)
        )
      );
    } else {
      append({ categoricalMetricId: toggledMetric.id, value: toggledMetric.options[0]!.value });
    }
  };

  console.log('fields', fields);

  return (
    <div className="flex flex-col relative pb-5 px-3 gap-6" id='metricsContainer'>
      {fields.length === 0 ? (
        <p className='pt-6 px-5 text-muted-foreground'>
          Enrich your data by adding metrics to your workouts. We will look for relationships between these metrics and your progress over time.
        </p>
      ) : (
        <div className="flex flex-col gap-4 pt-6">
          {fields.map((item, index) => {
            const metric = categoricalMetrics.find((metric) => metric.id === item.categoricalMetricId);
            if (metric) {
              return (
                <div className='flex gap-2 items-end' key={item.id}>
                  <Form.Field
                    control={form.control}
                    name={`workoutMetrics[${index}].value` as any}
                    render={({ field }) => (
                      <Form.Item className="grow relative flex items-end gap-2 m-0">
                        <Form.Label
                          className="capitalize text-lowContrast-foreground mb-3 ml-5 w-2/5"
                        >
                          {`${metric.name}:`}
                        </Form.Label>
                        <Select defaultValue={item.value.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                          <Select.Trigger className="mt-0 capitalize">
                            <Select.Value />
                          </Select.Trigger>
                          <Select.Content className='capitalize'>
                            {metric.options.map(option => (
                              <Select.Item
                                key={option.id}
                                value={option.value.toString()}
                              >
                                {option.label}
                              </Select.Item>
                            ))}
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
      <div className='flex justify-center gap-6'>
        <Popover>
          <Popover.Trigger asChild>
            <Button
              type="button"
              variant='outline'
              className='w-fit self-center text-foreground'
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
                  {categoricalMetrics.map((metric: CategoricalMetric) => {
                    const isSelected = fields.some((field) => field.categoricalMetricId === metric.id);
                    return (
                      <div className='relative' key={metric.id}>
                        <Command.Item
                          onSelect={() => toggleMetricsSelection(metric, isSelected)}
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
          </Popover.Content>
        </Popover>
        {fields.length > 0 && (
          <Dialog open={isClearMetricsDialogOpen} onOpenChange={setIsClearMetricsDialogOpen}>
            <Dialog.Trigger asChild>
              <Button
                type="button"
                variant='outline'
                className='w-fit self-center text-foreground'
                size='sm'
              >
                <MinusIcon size={18} className='mr-2 text-destructive' />
                Clear All
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Clear All Metrics?</Dialog.Title>
              <Dialog.Description className='text-lowContrast-foreground'>
                Are you sure you want to clear all metrics? This will remove all of the data you have entered.
              </Dialog.Description>
              <Dialog.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setIsClearMetricsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    remove();
                    setIsClearMetricsDialogOpen(false);
                  }}
                >
                  Clear
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        )}
      </div>
    </div>
  );
};
