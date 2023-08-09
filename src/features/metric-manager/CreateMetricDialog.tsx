import { Button, Dialog, Form, Input, Label, Select, Tabs } from 'good-nice-ui';
import React, { useState } from 'react';
import { CONTINUOUS_SCALE } from '../../schemas/ContinuousMetricSchema';
import { CATEGORICAL_SCALE } from '../../schemas/CategoricalMetricSchema';
import { FormProvider, useForm } from 'react-hook-form';

export const CreateMetricDialog = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ activeTab, setActiveTab ] = useState('base');
  const scales = {...CATEGORICAL_SCALE.enum, ...CONTINUOUS_SCALE.enum};

  const form = useForm({
    // resolver: zodResolver(createCategoricalMetricSchema),
    defaultValues: {
      name: '',
      description: '',
      scale: '',
    },
  });
  const formValues = form.watch();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const CreateMetricForm = () => (
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
                    {Object.keys(scales).map(scale => (
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
      </Form>
    </FormProvider>
  );

  const displayTab = () => {
    switch (activeTab) {
      case 'nominal':
        return <h1>Nominal</h1>
      case 'ordinal':
        return <h1>Ordinal</h1>
      case 'interval':
        return <h1>Interval</h1>
      case 'ratio':
        return <h1>Ratio</h1>
      case 'base':
      default:
        return (
          <>
            <CreateMetricForm />
            <Dialog.Footer className="gap-y-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant='default'
                type="submit"
                onClick={() => {
                  setActiveTab(formValues.scale)
                }}
              >
                Next
              </Button>
            </Dialog.Footer>
          </>
        );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create New</Button>
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