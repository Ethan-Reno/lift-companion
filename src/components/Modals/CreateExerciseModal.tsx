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

export const createExerciseSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  measurement: z.enum(['Weight', 'Distance', 'Time']),
  unit: z.enum(['Pound', 'Kilogram', 'Meter', 'Mile', 'Kilometer', 'Second', 'Minute', 'Hour']),
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
        measurement: "Weight",
        unit: "Pound",
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
                  <Input {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="measurement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Measurement</FormLabel>
                <div className='flex items-center gap-2'>
                  <Select onValueChange={field.onChange} defaultValue="Weight">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a measurement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Weight">Weight</SelectItem>
                      <SelectItem value="Distance">Distance</SelectItem>
                      <SelectItem value="Time">Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="whitespace-nowrap">x Reps</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO: Refactor to display only units for selected measurement */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="Pound">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pound">Pound</SelectItem>
                      <SelectItem value="Kilogram">Kilogram</SelectItem>
                      <SelectItem value="Meter">Meter</SelectItem>
                      <SelectItem value="Mile">Mile</SelectItem>
                      <SelectItem value="Kilometer">Kilometer</SelectItem>
                      <SelectItem value="Second">Second</SelectItem>
                      <SelectItem value="Minute">Minute</SelectItem>
                      <SelectItem value="Hour">Hour</SelectItem>
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant='primary'
            type='submit'
            disabled={createExercise.isLoading}
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
