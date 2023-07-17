import { type Table } from "@tanstack/react-table";
import { Button, DropdownMenu, Input, XIcon } from "good-nice-ui";
import { SlidersHorizontal } from "lucide-react";
import { ExerciseTableFacetedFilter } from "./ExerciseTableFacetedFilter";

interface ExerciseTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ExerciseTableToolbar<TData>({
  table,
}: ExerciseTableToolbarProps<TData>) {
  const isFiltered =
  table.getPreFilteredRowModel().rows.length >
  table.getFilteredRowModel().rows.length;

  const columnsToDisplay = [
    'actions',
    'name',
    'status',
    'description',
    'measurement',
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Name text search */}
        <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] sm:w-[250px]"
        />
        {/* Faceted Filters */}
        {/* Disabled due to hydration error */}
        {/* {table.getColumn("status") && (
          <ExerciseTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={[
              {
                label: "Inactive",
                value: "inactive",
              },
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Deleted",
                value: "deleted",
              }
            ]}
          />
        )}
        {table.getColumn("measurement") && (
          <ExerciseTableFacetedFilter
            column={table.getColumn("measurement")}
            title="Measurement"
            options={[
              {
                label: "Weight",
                value: "weight",
              },
              {
                label: "Distance",
                value: "distance",
              },
              {
                label: "Time",
                value: "time",
              }
            ]}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon size={16} className="ml-2" />
          </Button>
        )}
      </div>
      {/* View Options */}
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 sm:flex"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            View
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" className="w-[150px]">
          <DropdownMenu.Label className="text-lowContrast-foreground">Toggle columns</DropdownMenu.Label>
          <DropdownMenu.Separator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
            .map((column) => {
              if (columnsToDisplay.includes(column.id)) {
                return (
                  <DropdownMenu.CheckboxItem
                    key={column.id}
                    className="capitalize p-2 pl-8"
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
    </div>
  );
}
