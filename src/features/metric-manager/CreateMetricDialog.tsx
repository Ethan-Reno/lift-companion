import { Button, Dialog, Form, Input, Select, FormProvider } from 'good-nice-ui';
import React, { useState } from 'react';
import { Scale } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { CreateNominalMetricForm } from './CreateNominalMetricForm';
import { BaseMetricInputs, baseMetricInputsSchema } from '../../schemas/MetricSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateMetricDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('base');
  const [submittedValues, setSubmittedValues] = useState<BaseMetricInputs | null>(null);

  const CreateMetricForm = () => {
    const form = useForm<BaseMetricInputs>({
      resolver: zodResolver(baseMetricInputsSchema),
      defaultValues: submittedValues || {
        name: '',
        description: '',
        scale: Scale.nominal,
      },
    });

    const onSubmit = (values: BaseMetricInputs) => {
      setSubmittedValues(values);
      setActiveTab(values.scale);
    }

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
                  <Select value={form.getValues().scale} onValueChange={(value) => field.onChange(value)}>
                    <Form.Control>
                      <Select.Trigger className='capitalize'>
                        <Select.Value />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      {Object.keys(Scale).map(scale => (
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
          <Dialog.Footer className="gap-y-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>
              Next
            </Button>
          </Dialog.Footer>
        </Form>
      </FormProvider>
    )
  };

  const displayTab = () => {
    switch (activeTab) {
      case Scale.nominal:
        return <CreateNominalMetricForm setIsOpen={setIsOpen} setActiveTab={setActiveTab} baseValues={submittedValues!} />
      case 'ordinal':
        return <h1>Ordinal</h1>
      case 'interval':
        return <h1>Interval</h1>
      case 'ratio':
        return <h1>Ratio</h1>
      case 'base':
      default:
        return <CreateMetricForm />;
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button className='w-fit' onClick={() => setIsOpen(true)}>Create New</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Title>
          Create Metric
        </Dialog.Title>
        {displayTab()}
      </Dialog.Content>
    </Dialog>
  );
}
