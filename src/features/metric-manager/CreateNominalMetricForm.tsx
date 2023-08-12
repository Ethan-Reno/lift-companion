import { Button, Dialog, Form, FormProvider, Input, XIcon } from 'good-nice-ui';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BaseMetricInputs, CreateNominalMetricInputs, createNominalMetricSchema } from '../../schemas/MetricSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { useToast } from '../../hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scale } from '@prisma/client';
import { Loader2, PlusIcon } from 'lucide-react';

export interface CreateNominalMetricFormProps {
  baseValues: BaseMetricInputs;
  setIsOpen: (isOpen: boolean) => void;
  setActiveTab: (activeTab: Scale | string) => void;
}

export const CreateNominalMetricForm = ({
  baseValues,
  setIsOpen,
  setActiveTab,
}: CreateNominalMetricFormProps) => {
  const [submittedValues, setSubmittedValues] = useState<CreateNominalMetricInputs | null>(null);
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

  const form = useForm<CreateNominalMetricInputs>({
    resolver: zodResolver(createNominalMetricSchema),
    defaultValues: submittedValues || {
      ...baseValues,
      options: [{
        label: "",
        value: 1,
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  
  const onSubmit = (values: CreateNominalMetricInputs) => {
    setSubmittedValues(values);
    mutate(values);
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex flex-col gap-6'>
          <Form.FieldSet className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div className="flex gap-3" key={field.id}>
                <Form.Field
                  control={form.control}
                  name={`options.${index}.label`}
                  render={({ field }) => (
                    <Form.Item className="flex items-center gap-3 grow mt-0">
                      <Form.Label className='text-lowContrast-foreground'>Label:</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />
                <Button size='icon' variant='ghost' onClick={() => remove(index)}>
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
            variant="secondary"
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
