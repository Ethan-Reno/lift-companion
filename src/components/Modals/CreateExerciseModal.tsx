import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'lift-companion-ui'; 
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../../utils/api';
import { Loader2 } from "lucide-react"

const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  //meausrement enum is required
  measurements: z.enum(['WeightRep', 'DistanceRep', 'TimeRep']),
  primaryUnit: z.enum(['POUND', 'KILOGRAM', 'METER', 'MILE', 'KILOMETER', 'YARD', 'SECOND', 'MINUTE', 'HOUR']),
});

export const CreateExerciseModal = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const createExercise = api.exercise.create.useMutation({
    onMutate: () => console.log('mutating'),
    onSettled: () => {setIsOpen(false)},
  });
  
  const CreateExerciseForm = () => {
    const form = useForm<z.infer<typeof createExerciseSchema>>({
      resolver: zodResolver(createExerciseSchema),
      defaultValues: {
        name: "",
        description: "",
        measurements: "WeightRep",
        primaryUnit: "POUND",
      },
    });
    
    const onSubmit = (values: z.infer<typeof createExerciseSchema>) => {
      createExercise.mutate(values);
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="measurements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Measurement</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="WeightRep">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a measurement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WeightRep">Weight x Reps</SelectItem>
                    <SelectItem value="DistanceRep">Distance x Reps</SelectItem>
                    <SelectItem value="TimeRep">Time x Reps</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO: Refactor to display only units for selected measurement */}
          <FormField
            control={form.control}
            name="primaryUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="POUND">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="POUND">Pound</SelectItem>
                    <SelectItem value="KILOGRAM">Kilogram</SelectItem>
                    <SelectItem value="METER">Meter</SelectItem>
                    <SelectItem value="MILE">Mile</SelectItem>
                    <SelectItem value="KILOMETER">Kilometer</SelectItem>
                    <SelectItem value="YARD">Yard</SelectItem>
                    <SelectItem value="SECOND">Second</SelectItem>
                    <SelectItem value="MINUTE">Minute</SelectItem>
                    <SelectItem value="HOUR">Hour</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={createExercise.isLoading}
            className='justify-end'
          >
            {createExercise.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>Create</>
            )}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Exercise</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateExerciseForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
