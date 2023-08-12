import { Button, Dialog, Form, Input, Select, FormProvider } from 'good-nice-ui';
import React, { useState } from 'react';
import { Scale } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { CreateCategoricalMetricForm } from './CreateCategoricalMetricForm';
import { BaseMetricInputs, baseMetricInputsSchema } from '../../schemas/MetricSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateMetricDialog = () => {
  const [activeTab, setActiveTab] = useState('');
  const [submittedValues, setSubmittedValues] = useState<BaseMetricInputs | null>(null);
  // create new useState where isOpen is default false, and setIsOpen should update setIsOpen to false, setSubmittedValues to null, and setActiveTab to ''
  const [isOpen, setIsOpen] = useState(false);
  const handleSetIsOpen = (value: boolean) => {
    if (!value) {
      setActiveTab('');
      setSubmittedValues(null);
    }
    setIsOpen(value); 
  };
  const defaultValues = {
    name: '',
    description: '',
    scale: Scale.nominal,
  };

  const CreateMetricForm = () => {
    const form = useForm<BaseMetricInputs>({
      resolver: zodResolver(baseMetricInputsSchema),
      defaultValues: submittedValues || defaultValues
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
              variant="outline"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="secondary" type='submit'>
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
      case Scale.ordinal:
        return (
          <CreateCategoricalMetricForm
            setIsOpen={handleSetIsOpen}
            setActiveTab={setActiveTab}
            baseValues={submittedValues!} // TODO remove !
          />
        );
      case 'interval':
        return <h1>Interval</h1>
      case 'ratio':
        return <h1>Ratio</h1>
      case '':
      default:
        return <CreateMetricForm />;
    }
  }

  return (
    // TODO update setIsOpen to clear submitted values and setActive tab to ''
    <Dialog open={isOpen} onOpenChange={handleSetIsOpen}> 
      <Dialog.Trigger asChild>
        <Button className="w-fit" onClick={() => setIsOpen(true)}>
          Create New
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]" tabIndex={-1}>
        <Dialog.Title className='pb-10'>
          Create Metric
        </Dialog.Title>
        {displayTab()}
      </Dialog.Content>
    </Dialog>
  );
}
