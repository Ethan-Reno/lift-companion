import React from "react";
import { Button, Dialog, DropdownMenu } from "good-nice-ui";
import { Exercise } from "../../schemas/ExerciseSchema";
import { Dumbbell, LineChart, MoreHorizontal, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { UpdateExerciseDialog } from "../../components/Dialogs/UpdateExerciseDialog";
import { DELETE_TYPE, DeleteExerciseDialog } from "../../components/Dialogs/DeleteExerciseDialog";

interface ExerciseTableRowActionsProps {
  data: Exercise;
}

export function ExerciseTableRowActions({
  data
}: ExerciseTableRowActionsProps) {
  const [dialogType, setDialogType] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
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
    <div className="flex justify-end">
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
          <DropdownMenu.Content align="end" className="w-[160px]">
          <DropdownMenu.Item>
              <Link href={`/workout/${id}`} className='flex items-center'>
                <Dumbbell className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Start Workout
                <span className="sr-only">View details</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href={`/exercises/${id}`} className='flex items-center'>
                <LineChart className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                View Data
                <span className="sr-only">View details</span>
              </Link>
            </DropdownMenu.Item>
            <Dialog.Trigger asChild onClick={(): void => setDialogType('update')}>
              <DropdownMenu.Item>
                <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Edit
                <span className="sr-only">Edit exercise</span>
              </DropdownMenu.Item>
            </Dialog.Trigger>
            <DropdownMenu.Separator />
            <Dialog.Trigger
              asChild
              onClick={(): void => setDialogType(status === 'deleted' ? 'hardDelete' : 'softDelete')}
            >
              <DropdownMenu.Item>
                <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Delete
                <span className="sr-only">Delete exercise</span>
              </DropdownMenu.Item>
            </Dialog.Trigger>
          </DropdownMenu.Content>
        </DropdownMenu>
        {getDialogContent()}
      </Dialog>
    </div>
  );
}
