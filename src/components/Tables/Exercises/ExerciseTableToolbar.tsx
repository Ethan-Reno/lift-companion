import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button, Input } from "lift-companion-ui";
import { ExerciseTableViewOptions } from "./ExerciseTableViewOptions";
// import { ExerciseTableFilter } from "./ExerciseTableFilter";

interface ExerciseTableToolbarProps<TData> {
  table: Table<TData>
}

export function ExerciseTableToolbar<TData>({
  table,
}: ExerciseTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter exercises..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <ExerciseTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("measurement") && (
          <ExerciseTableFacetedFilter
            column={table.getColumn("measurement")}
            title="Measurement"
            options={measurements}
          />
        )}
        {table.getColumn("unit") && (
          <ExerciseTableFacetedFilter
            column={table.getColumn("unit")}
            title="Unit"
            options={units}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <ExerciseTableViewOptions table={table} />
    </div>
  );
}
