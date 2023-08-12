import React from "react";
import { Button, Dialog, DropdownMenu } from "good-nice-ui";
import { Exercise } from "../../schemas/ExerciseSchema";
import { Archive, Dumbbell, LineChart, MoreHorizontal, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { UpdateExerciseDialog } from "./UpdateExerciseDialog";
import { DeleteExerciseDialog } from "./DeleteExerciseDialog";
import { useStore } from "../../store/store";

interface ExerciseTableRowActionsProps {
  data: Exercise;
}

export function ExerciseTableRowActions({
  data
}: ExerciseTableRowActionsProps) {
  const [dialogType, setDialogType] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const { selectedExercises, setSelectedExercises } = useStore();
  const { id } = data;

  const getDialogContent = () => {
    switch (dialogType) {
      case 'update':
        return <UpdateExerciseDialog data={data} setIsOpen={setIsDialogOpen} />;
      case 'delete':
        return <DeleteExerciseDialog id={id} setIsOpen={setIsDialogOpen} />;
      default:
        return null;
    }
  };

  const setInitialExercise = (exercise: Exercise) => {
    setSelectedExercises([exercise, ...selectedExercises.filter(selectedExercise => selectedExercise.id !== exercise.id)]);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label className="text-lowContrast-foreground">Actions</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href='/workout' onClick={() => setInitialExercise(data)} className='flex items-center'>
              <Dumbbell className="mr-2 h-3.5 w-3.5 text-primary" />
              Start Workout
              <span className="sr-only">View details</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href={`/exercises/${id}`} className='flex items-center'>
              <LineChart className="mr-2 h-3.5 w-3.5 text-primary" />
              View Data
              <span className="sr-only">View details</span>
            </Link>
          </DropdownMenu.Item>
          <Dialog.Trigger asChild onClick={(): void => setDialogType('update')}>
            <DropdownMenu.Item>
              <Pen className="mr-2 h-3.5 w-3.5 text-primary" />
              Edit
              <span className="sr-only">Edit exercise</span>
            </DropdownMenu.Item>
          </Dialog.Trigger>
          <Dialog.Trigger asChild onClick={(): void => setDialogType('archive')}>
            <DropdownMenu.Item>
              <Archive className="mr-2 h-3.5 w-3.5 text-primary" />
              Archive
              <span className="sr-only">Edit exercise</span>
            </DropdownMenu.Item>
          </Dialog.Trigger>
          <Dialog.Trigger
            asChild
            onClick={(): void => setDialogType('delete')}
          >
            <DropdownMenu.Item>
              <Trash className="mr-2 h-3.5 w-3.5 text-primary" />
              Delete
              <span className="sr-only">Delete exercise</span>
            </DropdownMenu.Item>
          </Dialog.Trigger>
        </DropdownMenu.Content>
      </DropdownMenu>
      {getDialogContent()}
    </Dialog>
  );
}
