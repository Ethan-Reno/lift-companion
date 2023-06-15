import { type Row } from "@tanstack/react-table"
import React from "react";
import { Pen, Trash } from "lucide-react"
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "lift-companion-ui";
import { DeleteExericseModal } from "../../Modals/DeleteExerciseModal";

interface ExerciseTableRowActionsProps {
  id: string;
}

export function ExerciseTableRowActions({
  id,
}: ExerciseTableRowActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DeleteExericseModal id={id} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
