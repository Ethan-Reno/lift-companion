import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button, Dialog, Form, Input, Popover, Select, Separator, XIcon } from 'good-nice-ui';
import { Info, PlusIcon } from 'lucide-react';
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
    <div className="flex flex-col pt-12 pb-5 px-3 gap-3" id='setContainer'>
      <div className="flex relative flex-col gap-6">
        {fields.map((item, index) => (
          <Form.FieldSet key={item.id} className='flex gap-2 items-end'>
            <span className="mb-2 ml-5 text-lowContrast-foreground">{`${index + 1}.`}</span>
            <Form.Field
              control={form.control}
              name={`sets[${index}].value` as any}
              render={({ field }) => (
                <Form.Item>
                  {index === 0 && <Form.Label className='absolute -top-5 ml-1 capitalize text-lowContrast-foreground'>{measurement}</Form.Label>}
                  <Form.Control>
                    <Input
                      {...field}
                      type="number"
                      className='bg-background'
                      onFocus={(event) => event.target.select()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <div className="px-1 mb-3 text-lowContrast-foreground">
              <XIcon size={16} />
            </div>
            <Form.Field
              control={form.control}
              name={`sets[${index}].reps` as any}
              render={({ field }) => (
                <Form.Item>
                  {index === 0 && <Form.Label className='absolute -top-5 ml-1 text-lowContrast-foreground'>Reps</Form.Label>}
                  <Form.Control>
                  <Input
                      {...field}
                      type="number"
                      className='bg-background'
                      onFocus={(event) => event.target.select()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Separator orientation="vertical" className="h-8 mb-1 mx-2 bg-muted" decorative />
            <Form.Field
              control={form.control}
              name={`sets[${index}].rpe` as any}
              render={({ field }) => (
                <Form.Item>
                  {index === 0 && (
                    <div className='flex gap-2 absolute -top-5 ml-1 items-center'>
                      <Form.Label className='text-lowContrast-foreground'>RPE</Form.Label>
                      <Popover>
                        <Popover.Trigger>
                          <Info className="h-4 w-4 text-primary hover:text-primary-hover" />
                        </Popover.Trigger>
                        <Popover.Content>
                          <p className="text-lowContrast-foreground">
                            RPE stands for Rate of Perceived Exertion. It is a way of measuring how hard you are working, using a scale of 1-10.
                          </p>
                        </Popover.Content>
                      </Popover>
                    </div>
                  )}
                  <Form.Control>
                    <Select
                      defaultValue={item.rpe.toString() !== '0' ? item.rpe.toString() : '1'}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <Select.Trigger className="w-[60px]">
                        <Select.Value  />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="1">1</Select.Item>
                        <Select.Item value="2">2</Select.Item>
                        <Select.Item value="3">3</Select.Item>
                        <Select.Item value="4">4</Select.Item>
                        <Select.Item value="5">5</Select.Item>
                        <Select.Item value="6">6</Select.Item>
                        <Select.Item value="7">7</Select.Item>
                        <Select.Item value="8">8</Select.Item>
                        <Select.Item value="9">9</Select.Item>
                        <Select.Item value="10">10</Select.Item>
                      </Select.Content>
                    </Select>
                  </Form.Control>
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
                <Dialog.Header>Delete Set</Dialog.Header>
                <Dialog.Description>
                  <p className="text-lowContrast-foreground">Are you sure you want to delete this set?</p>
                </Dialog.Description>
                <Dialog.Footer>
                  <Button variant="secondary" onClick={() => console.log('test')}>Cancel</Button>
                  <Button variant="destructive" onClick={() => remove(index)}>Delete</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          </Form.FieldSet>
        ))}
        <Button
          type="button"
          variant='link'
          className='w-fit self-center'
          size='sm'
          onClick={() => append({ reps: 0, value: 0, rpe: 0 })}
        >
          <PlusIcon size={18} className='mr-2' />
          Add Set
        </Button>
      </div>
    </div>
  );
};
