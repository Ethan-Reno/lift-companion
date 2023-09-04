import React, { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button, Dialog, Form, Input, Popover, Select, Separator, XIcon } from 'good-nice-ui';
import { Info, MinusIcon, PlusIcon } from 'lucide-react';
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
  const [isRemoveSetDialogOpen, setIsRemoveSetDialogOpen] = useState(false);
  const [isClearSetsDialogOpen, setIsClearSetsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col pt-12 pb-5 px-3 gap-3" id='setContainer'>
      <div className="flex relative flex-col gap-6">
        <Form.FieldSet className="flex flex-col gap-4">
          {fields.map((item, index) => (
            <div key={item.id} className='flex gap-2 items-end'>
              <span className="mb-2 ml-5 text-lowContrast-foreground">{`${index + 1}.`}</span>
              <Form.Field
                control={form.control}
                name={`sets.${index}.value` as const}
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
                name={`sets.${index}.reps` as const}
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
                name={`sets.${index}.rpe` as const}
                render={({ field }) => (
                  <Form.Item>
                    {index === 0 && (
                      <div className='flex gap-2 absolute -top-5 ml-1 items-center'>
                        <Form.Label className='text-lowContrast-foreground'>RPE</Form.Label>
                        <Popover>
                          <Popover.Trigger>
                            <Info className="h-4 w-4 text-primary hover:text-primary-hover" />
                          </Popover.Trigger>
                          <Popover.Content className="text-lowContrast-foreground">
                            RPE stands for Rate of Perceived Exertion. It is a way of measuring how hard you are working on a scale of 1-10.
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
                          {Array.from({ length: 10 }, (_, index) => (
                            <Select.Item value={String(index + 1)} key={index + 1}>
                              {index + 1}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Dialog open={isRemoveSetDialogOpen} onOpenChange={setIsRemoveSetDialogOpen}>
                <Dialog.Trigger asChild>
                  <Button type="button" variant="ghost" size="icon" className='min-w-[40px]'>
                    <XIcon size={22} className="text-red-500"/>
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Title>Delete Set</Dialog.Title>
                  <Dialog.Description className="text-lowContrast-foreground">
                    Are you sure you want to delete this set?
                  </Dialog.Description>
                  <Dialog.Footer>
                    <Button variant="secondary" onClick={() => setIsRemoveSetDialogOpen(false)}>Cancel</Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        remove(index);
                        setIsRemoveSetDialogOpen(false);
                      }}
                    >
                      Delete
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </div>
          ))}
        </Form.FieldSet>
        <div className='flex justify-center gap-6'>
          <Button
            type="button"
            variant='outline'
            className='w-fit self-center text-foreground'
            size='sm'
            onClick={() => append({ 
              reps: 0,
              value: 0,
              rpe: 1,
              epley1rm: 0,
              brzycki1rm: 0,
              wathen1rm: 0,
            })}
          >
            <PlusIcon size={18} className='mr-2 text-primary' />
            Add Set
          </Button>
          {fields.length > 0 && (
            <Dialog open={isClearSetsDialogOpen} onOpenChange={setIsClearSetsDialogOpen}>
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
                <Dialog.Title>Clear All Sets?</Dialog.Title>
                <Dialog.Description className='text-lowContrast-foreground'>
                  Are you sure you want to clear all sets? This will remove all of the data you have entered.
                </Dialog.Description>
                <Dialog.Footer>
                  <Button variant="secondary" onClick={() => setIsClearSetsDialogOpen(false)}>Cancel</Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      remove();
                      setIsClearSetsDialogOpen(false);
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
    </div>
  );
};
