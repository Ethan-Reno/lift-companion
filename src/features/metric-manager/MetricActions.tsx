import { Button, Dialog, DropdownMenu } from 'good-nice-ui';
import { MoreHorizontal, Pen, Trash } from 'lucide-react';
import React from 'react';
import { DeleteDialog } from '../../components/DeleteDialog';

export interface MetricActionsProps {
  id: string;
}

export const MetricActions = ({ id }: MetricActionsProps) => {
  const [dialogType, setDialogType] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const getDialogContent = () => {
    switch (dialogType) {
      case 'update':
        // return <UpdateExerciseDialog data={data} setIsOpen={setIsDialogOpen} />;
      case 'delete':
        return <DeleteDialog id={id} setIsOpen={setIsDialogOpen} type="metric" />;
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
            aria-labelledby="sr-only"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only" id="sr only">Open menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='end'>
          <DropdownMenu.Label className="text-lowContrast-foreground">Actions</DropdownMenu.Label>
          <DropdownMenu.Separator />
            <Dialog.Trigger asChild onClick={(): void => setDialogType('update')}>
              <DropdownMenu.Item>
                <Pen className="mr-2 h-3.5 w-3.5 text-primary" />
                Edit
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
  )
};