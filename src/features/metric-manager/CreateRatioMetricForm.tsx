import { Button, Dialog, Form, Input, Slider } from 'good-nice-ui';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { type BaseMetricInputs, type CreateRatioMetricInputs, createRatioMetricSchema } from '../../schemas/MetricSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Scale } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CreateRatioMetricFormProps {
  baseValues: BaseMetricInputs;
  setIsOpen: (isOpen: boolean) => void;
  setActiveTab: (activeTab: Scale | string) => void;
}

export const CreateRatioMetricForm = ({
  baseValues,
  setIsOpen,
  setActiveTab,
}: CreateRatioMetricFormProps) => {
  const [submittedValues, setSubmittedValues] = useState<CreateRatioMetricInputs | null>(null);
  const { setShouldRefetch } = useStore();
  const { mutate, isLoading } = api.metric.createRatio.useMutation({
    onSettled: () => {
      setIsOpen(false);
      setShouldRefetch(true);
      setSubmittedValues(null);
    },
  });

  const [sliderValue, setSliderValue] = useState(0);
  const defaultValues = {
    ...baseValues,
    max: 100,
    step: 1,
  }
  const form = useForm<CreateRatioMetricInputs>({
    resolver: zodResolver(createRatioMetricSchema),
    defaultValues: submittedValues || defaultValues,
  });
  
  const onSubmit = (values: CreateRatioMetricInputs) => {
    setSubmittedValues(values);
    mutate(values);
  };
  
  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex gap-4'>
          <Form.Field
            control={form.control}
            name="max"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Maximum</Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    type="number"
                    className='bg-background'
                    value={field.value !== null ? field.value : ""} 
                    onFocus={(event) => event.target.select()}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        field.onChange(null);  // Set field to null if value is empty string
                      } else {
                        field.onChange(parseInt(e.target.value));
                      }
                    }}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="step"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Step</Form.Label>
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
        </div>
        <div className="flex flex-col gap-2">
          <span>Preview: </span>
          <div className='flex gap-2'>
            <div className='relative basis-4/5'>
              <Slider
                className='z-10'
                value={[sliderValue]}
                onValueChange={(value) => setSliderValue(value[0]!)}
                min={0}
                max={form.getValues().max || defaultValues.max}
                step={form.getValues().step}
              />
            </div>
            <Input
              type='number'
              className='basis-1/5'
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
            />
          </div>
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
