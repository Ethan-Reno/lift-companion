import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Form,
  FormProvider,
  Input,
  Select,
} from 'good-nice-ui'; 
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMetricInputs, createMetricSchema } from '../../schemas/MetricSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../../hooks/useToast';
import { SCALE } from '../../schemas/MetricSchema';
import { CreateMetricOptionInputs } from '../../schemas/MetricOptionSchema';

export const CreateMetricDialog = () => {
  const { toast } = useToast();
  const [ isOpen, setIsOpen ] = useState(false);
  const { setShouldRefetch } = useStore();
  const [ submittedValues, setSubmittedValues ] = useState<CreateMetricInputs | null>(null);
  const [ metricOptions, setMetricOptions ] = useState<CreateMetricOptionInputs[]>([]);

  const { mutate, isLoading } = api.metric.create.useMutation({
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
  
  const CreateMetricForm = () => {
    const form = useForm<CreateMetricInputs>({
      resolver: zodResolver(createMetricSchema),
      defaultValues: submittedValues || {
        name: "",
        scale: SCALE.enum.ordinal,
        options: [],
      },
    });
    const values: CreateMetricInputs = form.watch();

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "options",
    });
    
    const onSubmit = (values: CreateMetricInputs) => {
      setSubmittedValues(values);
      mutate(values);
    };

    const deriveOptionDefaults = () => {
      switch (values.scale) {
        case SCALE.enum.ordinal:
        case SCALE.enum.interval:
          return {
            label: "",
            value: values.options.length + 1,
          }
        case SCALE.enum.ratio:
          return {
            label: "",
            value: 0,
          }
        case SCALE.enum.nominal:
        default:
          return {
            label: "",
            value: undefined,
          }
      }
    };

    console.log(values);

    return (
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Form.Field
            control={form.control}
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Name</Form.Label>
                <Form.Control>
                  <Input {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          {/* TODO add a popover with info about scales */}
          <Form.Field
            control={form.control}
            name="scale"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Scale</Form.Label>
                  <Select onValueChange={(value) => field.onChange(value)} defaultValue={SCALE.enum.ordinal}>
                    <Form.Control>
                      <Select.Trigger className='capitalize'>
                        <Select.Value />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {Object.keys(SCALE.enum).map(scale => (
                        <Select.Item key={scale} value={scale} className="capitalize">
                          {scale}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                <Form.Message />
              </Form.Item>
            )}
          />
          {/* Options Field */}
          {fields.map((field, index) => (
            <div key={field.id}>
              <Form.Field
                control={form.control}
                name={`options.${index}.label`}
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Option Label</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              {/* Show the value only if we need a numerical representation for ratio */}
              {values.scale === SCALE.enum.ratio && (
                <Form.Field
                  control={form.control}
                  name={`options.${index}.value`}
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>Option Value</Form.Label>
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
              )}
              {/* Button to remove this option */}
              <Button onClick={() => remove(index)}>Remove Option</Button>
            </div>
          ))}
          <Dialog.Footer className="gap-y-4">
            <Button type="button" onClick={() => append(deriveOptionDefaults())}>Add Option</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create New</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Title>
          Create Metric
        </Dialog.Title>
        <CreateMetricForm />
      </Dialog.Content>
    </Dialog>
  );
};
