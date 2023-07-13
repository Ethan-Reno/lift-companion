import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button, Form, Input, ScrollArea, XIcon } from 'good-nice-ui';
import { PlusIcon } from 'lucide-react';
import { CreateWorkoutInputs } from '../../schemas/WorkoutSchema';

interface SetsFormSectionProps {
  form: UseFormReturn<CreateWorkoutInputs>;
  measurement: string;
}

export const SetsFormSection = ({ form, measurement }: SetsFormSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sets',
  });

  return (
    <div className="flex flex-col gap-3" id='setContainer'>
      <div className="flex flex-col gap-8">
        {fields.map((item, index) => (
          <Form.FieldSet key={item.id} className='flex gap-2 items-end'>
            <span className="mb-2 ml-5">{`${index + 1}.`}</span>
            <Form.Field
              control={form.control}
              name={`sets[${index}].value` as any}
              render={({ field }) => (
                <Form.Item className="grow">
                  <Form.Label>{measurement}</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      type="number"
                      onFocus={(event) => event.target.select()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name={`sets[${index}].reps` as any}
              render={({ field }) => (
                <Form.Item className="grow">
                  <Form.Label>reps</Form.Label>
                  <Form.Control>
                  <Input
                      {...field}
                      type="number"
                      onFocus={(event) => event.target.select()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name={`sets[${index}].rpe` as any}
              render={({ field }) => (
                <Form.Item className="grow">
                  <Form.Label>rpe</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      type="number"
                      onFocus={(event) => event.target.select()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Button type="button" variant="ghost" size="icon" className='min-w-[40px]' onClick={() => remove(index)}>
              <XIcon size={22} className="text-red-500"/>
            </Button>
          </Form.FieldSet>
        ))}
        <Button
          type="button"
          variant='link'
          className='w-fit'
          size='sm'
          onClick={() => append({ reps: 0, value: 0, rpe: 0 })}
        >
          <PlusIcon size={18} className='mr-2' />
          Add
        </Button>
      </div>
    </div>
  );
};
