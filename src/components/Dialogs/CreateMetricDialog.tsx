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
import { CreateCategoricalMetricInputs, createCategoricalMetricSchema } from '../../schemas/CategoricalMetricSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../../hooks/useToast';
import { CATEGORICAL_SCALE } from '../../schemas/CategoricalMetricSchema';

export const CreateMetricDialog = () => {
  const { toast } = useToast();
  const [ isOpen, setIsOpen ] = useState(false);
  const { setShouldRefetch } = useStore();
  const [ submittedValues, setSubmittedValues ] = useState<CreateCategoricalMetricInputs | null>(null);

  const { mutate, isLoading } = api.categoricalMetric.create.useMutation({
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
    const form = useForm<CreateCategoricalMetricInputs>({
      resolver: zodResolver(createCategoricalMetricSchema),
      defaultValues: submittedValues || {
        name: '',
        description: '',
        scale: CATEGORICAL_SCALE.enum.ordinal,
        options: [],
      },
    });
    const values: CreateCategoricalMetricInputs = form.watch();
    // const isNumericScale = values.scale === CATEGORICAL_SCALE.enum.ratio || values.scale === CATEGORICAL_SCALE.enum.interval;

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "options",
    });
    
    const onSubmit = (values: CreateCategoricalMetricInputs) => {
      setSubmittedValues(values);
      mutate(values);
    };

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
          <Form.Field
            control={form.control}
            name="description"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Description</Form.Label>
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
                  <Select onValueChange={(value) => field.onChange(value)} defaultValue={CATEGORICAL_SCALE.enum.ordinal}>
                    <Form.Control>
                      <Select.Trigger className='capitalize'>
                        <Select.Value />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {Object.keys(CATEGORICAL_SCALE.enum).map(scale => (
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
              {/* {isNumericScale && (
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
              )} */}
              <Button onClick={() => remove(index)}>Remove Option</Button>
            </div>
          ))}
          <Dialog.Footer className="gap-y-4">
            <Button
              type="button"
              onClick={() => append({
                label: "",
                // value: isNumericScale ? 0 : values.options.length + 1,
                value: values.options.length + 1,
              })}
            >
              Add Option
            </Button>
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
