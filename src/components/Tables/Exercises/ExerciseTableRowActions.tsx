import { type Row } from "@tanstack/react-table"
import React from "react";
import { Pen, Trash } from "lucide-react"
import {
  Button,
  Dialog,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "lift-companion-ui";
import { exerciseSchema } from "../../../schemas/ExerciseSchema";
import { useMutation } from "@tanstack/react-query";

interface ExerciseTableRowActionsProps<TData> {
  row: Row<TData>
}

export function ExerciseTableRowActions<TData>({
  row,
}: ExerciseTableRowActionsProps<TData>) {
  const exercise = exerciseSchema.parse(row.original);

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
      <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </Dialog>
    </div>
  );
}
