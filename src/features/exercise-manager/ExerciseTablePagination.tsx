import { type Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "good-nice-ui";

interface ExerciseTablePaginationProps<TData> {
  table: Table<TData>
}

export function ExerciseTablePagination<TData>({
  table,
}: ExerciseTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className="h-8 w-8 p-0 flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center justify-center text-sm font-medium">
        {table.getState().pagination.pageIndex + 1} of{" "}{pageCount}
      </div>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0 flex"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
