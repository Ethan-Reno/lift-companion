import React from "react";
import { Button, Dialog, DropdownMenu } from "good-nice-ui";
import { Exercise } from "../../schemas/ExerciseSchema";
import { Dumbbell, LineChart, MoreHorizontal, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { UpdateExerciseDialog } from "../../components/Dialogs/UpdateExerciseDialog";
import { DELETE_TYPE, DeleteExerciseDialog } from "../../components/Dialogs/DeleteExerciseDialog";
import { useStore } from "../../store/store";

interface ExerciseTableRowActionsProps {
  data: Exercise;
}

export function ExerciseTableRowActions({
  data
}: ExerciseTableRowActionsProps) {
  const [dialogType, setDialogType] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const { setInitialExerciseId } = useStore();
  const { id, status } = data;

  const getDialogContent = () => {
    switch (dialogType) {
      case 'update':
        return <UpdateExerciseDialog data={data} setIsOpen={setIsDialogOpen} />;
      case 'softDelete':
        return <DeleteExerciseDialog id={id} deleteType={DELETE_TYPE.SOFT_DELETE} setIsOpen={setIsDialogOpen} />;
      case 'hardDelete':
        return <DeleteExerciseDialog id={id} deleteType={DELETE_TYPE.HARD_DELETE} setIsOpen={setIsDialogOpen} />;
      default:
        return null;
    }
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
          <DropdownMenu.Item className='p-2'>
            <Link href='/workout' onClick={() => setInitialExerciseId(id)} className='flex items-center'>
              <Dumbbell className="mr-2 h-3.5 w-3.5 text-primary" />
              Start Workout
              <span className="sr-only">View details</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className='p-2'>
            <Link href={`/exercises/${id}`} className='flex items-center'>
              <LineChart className="mr-2 h-3.5 w-3.5 text-primary" />
              View Data
              <span className="sr-only">View details</span>
            </Link>
          </DropdownMenu.Item>
          <Dialog.Trigger asChild onClick={(): void => setDialogType('update')}>
            <DropdownMenu.Item className='p-2'>
              <Pen className="mr-2 h-3.5 w-3.5 text-primary" />
              Edit
              <span className="sr-only">Edit exercise</span>
            </DropdownMenu.Item>
          </Dialog.Trigger>
          <Dialog.Trigger
            asChild
            onClick={(): void => setDialogType(status === 'deleted' ? 'hardDelete' : 'softDelete')}
          >
            <DropdownMenu.Item className='p-2'>
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
