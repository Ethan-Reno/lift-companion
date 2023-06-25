import { type Row } from "@tanstack/react-table"
import React from "react";
import { Pen, Trash } from "lucide-react"
import { Button, Tooltip, TooltipProvider } from "good-nice-ui";
import { DELETE_TYPE, DeleteExericseModal } from "../../Modals/DeleteExerciseModal";

interface ExerciseTableRowActionsProps {
  id: string;
  status: string;
}

export function ExerciseTableRowActions({
  id,
  status
}: ExerciseTableRowActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <TooltipProvider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>Edit</p>
          </Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <Tooltip.Trigger>
            <DeleteExericseModal
              id={id}
              deleteType={status === 'deleted' ? DELETE_TYPE.HARD_DELETE : DELETE_TYPE.SOFT_DELETE}
            />
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>Delete</p>
          </Tooltip.Content>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
