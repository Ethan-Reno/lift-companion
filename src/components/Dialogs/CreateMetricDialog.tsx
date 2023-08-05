import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Form,
  FormProvider,
  Input,
} from 'good-nice-ui'; 
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMetricInputs, createMetricSchema } from '../../schemas/MetricSchema';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"
import { useStore } from '../../store/store';
import { useToast } from '../../hooks/useToast';

export const CreateMetricDialog = () => {
  const { toast } = useToast();
  const [ isOpen, setIsOpen ] = useState(false);
  const { setShouldRefetch } = useStore();
  const [submittedValues, setSubmittedValues] = useState<CreateMetricInputs | null>(null);

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
        label1: 'bad',
        label2: 'fine',
        label3: 'average',
        label4: 'good',
        label5: 'great',
      },
    });
    
    const onSubmit = (values: CreateMetricInputs) => {
      setSubmittedValues(values);
      mutate(values);
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
          {/* TODO: Add form fields for labels */}
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
