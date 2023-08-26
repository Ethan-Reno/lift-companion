import { Button, Dialog, Form, FormProvider, Input, Separator, Slider } from 'good-nice-ui';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BaseMetricInputs, CreateIntervalMetricInputs, createIntervalMetricSchema } from '../../schemas/MetricSchema';
import { useStore } from '../../store/store';
import { api } from '../../utils/api';
import { useToast } from '../../hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scale } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CreateIntervalMetricFormProps {
  baseValues: BaseMetricInputs;
  setIsOpen: (isOpen: boolean) => void;
  setActiveTab: (activeTab: Scale | string) => void;
}

export const CreateIntervalMetricForm = ({
  baseValues,
  setIsOpen,
  setActiveTab,
}: CreateIntervalMetricFormProps) => {
  const [submittedValues, setSubmittedValues] = useState<CreateIntervalMetricInputs | null>(null);
  const [zeroPercentage, setZeroPercentage] = useState(0);
  const { setShouldRefetch } = useStore();
  const { toast } = useToast();
  const { mutate, isLoading } = api.metric.createInterval.useMutation({
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
  

  const [sliderValue, setSliderValue] = useState(0);

  const form = useForm<CreateIntervalMetricInputs>({
    resolver: zodResolver(createIntervalMetricSchema),
    defaultValues: submittedValues || {
      ...baseValues,
      min: 0,
      max: 100,
      step: 1,
    },
  });

  useEffect(() => {
    const calculateZeroPercentage = () => {
      const min = form.getValues().min;
      const max = form.getValues().max;
      return (0 - min) / (max - min) * 100;
    }
    setZeroPercentage(calculateZeroPercentage());
  }, [form.getValues().min, form.getValues().max]);
  
  const onSubmit = (values: CreateIntervalMetricInputs) => {
    setSubmittedValues(values);
    mutate(values);
  };

  // const getZeroPercentage = () => {
  //   const min = form.getValues().min!;
  //   const max = form.getValues().max!;
  //   return (0 - min) / (max - min) * 100;
  // }
  
  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex gap-4'>
          <Form.Field
            control={form.control}
            name="min"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Minimum</Form.Label>
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
                min={form.getValues().min}
                max={form.getValues().max}
                step={form.getValues().step}
              />
              <Separator className={cn('absolute -top-2 h-6 w-0.5 -translate-x-1/2', `left-[${zeroPercentage}%]`)} />
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
