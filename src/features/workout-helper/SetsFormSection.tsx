import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button, Form, Input, ScrollArea, XIcon } from 'good-nice-ui';
import { PlusIcon } from 'lucide-react';
import { createWorkoutSchema } from '../../schemas/WorkoutSchema';

interface SetsFormSectionProps {
  form: UseFormReturn<z.infer<typeof createWorkoutSchema>>;
  measurement: string;
}

export const SetsFormSection = ({ form, measurement }: SetsFormSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sets',
  });

  return (
    <div className="flex flex-col gap-3 w-1/2" id='setContainer'>
      <div className="flex gap-6 items-center">
        <h1>Sets</h1>
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
      <ScrollArea className="border rounded-md max-h-[540px]" id="sets">
        <div className="flex flex-col p-6 gap-8">
          {fields.map((item, index) => (
            <Form.FieldSet key={item.id} className='flex gap-2 items-end'>
              <Form.Field
                control={form.control}
                name={`sets[${index}].value` as any}
                render={({ field }) => (
                  <Form.Item className="flex-grow max-w-[115px]">
                    <Form.Label>{measurement}</Form.Label>
                    <Form.Control>
                      <Input
                        {...field}
                        type="number"
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
                  <Form.Item className="flex-grow max-w-[115px]">
                    <Form.Label>reps</Form.Label>
                    <Form.Control>
                    <Input
                        {...field}
                        type="number"
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
                  <Form.Item className="flex-grow max-w-[115px]">
                    <Form.Label>rpe</Form.Label>
                    <Form.Control>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <XIcon size={22} className="text-red-500"/>
              </Button>
            </Form.FieldSet>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
