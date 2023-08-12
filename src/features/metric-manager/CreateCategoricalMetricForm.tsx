import { Button, Dialog, Form, FormProvider, Input, XIcon } from 'good-nice-ui';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BaseMetricInputs, CreateNominalMetricInputs, CreateOrdinalMetricInputs, createNominalMetricSchema, createOrdinalMetricSchema } from '../../schemas/MetricSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { useToast } from '../../hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scale } from '@prisma/client';
import { ArrowDown, ArrowUp, Loader2, PlusIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CreateCategoricalMetricFormProps {
  baseValues: BaseMetricInputs;
  setIsOpen: (isOpen: boolean) => void;
  setActiveTab: (activeTab: Scale | string) => void;
}

export const CreateCategoricalMetricForm = ({
  baseValues,
  setIsOpen,
  setActiveTab,
}: CreateCategoricalMetricFormProps) => {
  const [submittedValues, setSubmittedValues] = useState<CreateNominalMetricInputs | CreateOrdinalMetricInputs | null>(null);
  const { setShouldRefetch } = useStore();
  const { toast } = useToast();
  const { mutate, isLoading } = api.metric.createNominal.useMutation({
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
      setSubmittedValues(null);
    },
    onError: (error) => {
      toast({
        title: 'Error!',
        description: error.message,
        variant: 'destructive',
      })
    }
  });

  const form = useForm<CreateNominalMetricInputs | CreateOrdinalMetricInputs>({
    resolver: zodResolver(createNominalMetricSchema || createOrdinalMetricSchema),
    defaultValues: submittedValues || {
      ...baseValues,
      options: [
        {
          label: "",
          value: 1,
        },
        {
          label: "",
          value: 2,
        }
      ],
    },
  });

  const { setValue } = form;

  const { fields, append, remove, swap } = useFieldArray({
    control: form.control,
    name: "options",
  });

  console.log(fields);
  
  const onSubmit = (values: CreateNominalMetricInputs | CreateOrdinalMetricInputs) => {
    setSubmittedValues(values);
    mutate(values);
  };


  const handleSwap = (currentIndex: number, direction: "up" | "down") => {
    let swapIndex = currentIndex;
    if (direction === "up" && currentIndex > 0) {
      swapIndex = currentIndex - 1;
    } else if (direction === "down" && currentIndex < fields.length - 1) {
      swapIndex = currentIndex + 1;
    }
    swap(currentIndex, swapIndex);
  
    // Update the values of the swapped items
    setValue(`options.${currentIndex}.value`, currentIndex + 1);
    setValue(`options.${swapIndex}.value`, swapIndex + 1);
  };
  
  const renderOrdinalControlButtons = (index: number) => (
    <div className='flex relative'>
      {index === 0 && <Form.Label className='absolute -top-5 ml-1 text-lowContrast-foreground'>Rank</Form.Label>}
      <Button
        type="button"
        size="icon"
        variant="outline"
        className='rounded-none rounded-l-md bg-transparent'
        onClick={() => handleSwap(index, "up")}
        disabled={index === 0}
      >
        <ArrowUp size={18} className={cn('text-lowContrast-foreground', index === 0 && 'opacity-0')}/>
      </Button>
      <Button
        type="button"
        className='rounded-none rounded-r-md bg-transparent'
        size="icon"
        variant="outline"
        onClick={() => handleSwap(index, "down")}
        disabled={index === fields.length - 1}
      >
        <ArrowDown size={18} className={cn('text-lowContrast-foreground', index === fields.length - 1 && 'opacity-0')}/>
      </Button>
    </div>
  );

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex flex-col gap-6'>
          <Form.FieldSet className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div className="flex gap-3 items-start" key={field.id}>
                <span className="mt-2 ml-5 text-lowContrast-foreground">{`${index + 1}.`}</span>
                {baseValues.scale === Scale.ordinal && renderOrdinalControlButtons(index)}
                <Form.Field
                  control={form.control}
                  name={`options.${index}.label`}
                  render={({ field }) => (
                    <Form.Item className='grow relative'>
                      {index === 0 && <Form.Label className='absolute -top-5 ml-1 text-lowContrast-foreground'>Label</Form.Label>}
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                <Button size='icon' variant='ghost' onClick={() => remove(index)} disabled={index <= 1}>
                  <XIcon size={22} className="text-red-500"/>
                </Button>
              </div>
            ))}
          </Form.FieldSet>
          <Button
            type="button"
            variant='outline'
            className='w-fit self-center text-foreground'
            size='sm'
            onClick={() => append({
              label: "",
              value: fields.length + 1,
            })}
          >
            <PlusIcon size={18} className='mr-2 text-primary' />
            Add Option
          </Button>
        </div>
        <Dialog.Footer className="gap-y-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setActiveTab('')}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            variant='default'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>Create</>
            )}
          </Button>
        </Dialog.Footer>
      </Form>
    </FormProvider>
  );
};
