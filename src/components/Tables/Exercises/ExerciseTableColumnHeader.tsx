import { type Column } from "@tanstack/react-table";
import { ChevronsUpDown, SortAsc, SortDesc } from "lucide-react";
import { Button, DropdownMenu } from "good-nice-ui";
import { clsx } from "clsx";

interface ExerciseTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ExerciseTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ExerciseTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={clsx(className)}>{title}</div>
  }
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <div className={clsx("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <SortDesc className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <SortAsc className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item onClick={() => column.toggleSorting(false)}>
            <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => column.toggleSorting(true)}>
            <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
