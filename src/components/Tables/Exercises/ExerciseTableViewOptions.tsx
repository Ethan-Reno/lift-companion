import { type Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";
import { Button, DropdownMenu } from "good-nice-ui";

interface ExerciseTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function ExerciseTableViewOptions<TData>({
  table,
}: ExerciseTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 sm:flex"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-[150px]">
        <DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
        <DropdownMenu.Separator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            if (column.id !== 'name' && column.id !== 'id') {
              return (
                <DropdownMenu.CheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenu.CheckboxItem>
              );
            }
          })}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
