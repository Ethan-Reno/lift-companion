import React from "react";
import { Button, Dialog, DropdownMenu, Tooltip, TooltipProvider } from "good-nice-ui";
import { DELETE_TYPE, DeleteExerciseDialog } from "../../Dialogs/DeleteExerciseDialog";
import { UpdateExerciseDialog } from "../../Dialogs/UpdateExerciseDialog";
import { ExerciseSchema } from "../../../schemas/ExerciseSchema";
import { MoreHorizontal, Pen, Search, Trash } from "lucide-react";
import Link from "next/link";

interface ExerciseTableRowActionsProps {
  data: ExerciseSchema;
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
            <Dialog.Trigger asChild>
              <DropdownMenu.Item>
                <Link href={`/exercises/${id}`} className='flex items-center'>
                  <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  View Details
                  <span className="sr-only">View details</span>
                </Link>
              </DropdownMenu.Item>
            </Dialog.Trigger>
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
