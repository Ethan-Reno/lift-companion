import { Column, type ColumnDef } from "@tanstack/react-table";
import { type ExerciseSchema } from "../../../schemas/ExerciseSchema";
import { ExerciseTableColumnHeader } from "./ExerciseTableColumnHeader";
import { ExerciseTableRowActions } from "./ExerciseTableRowActions";
import { Badge, Skeleton } from "good-nice-ui";

export const exerciseColumns: ColumnDef<ExerciseSchema>[] = [
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ExerciseTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <ExerciseTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status === 'inactive' ? 'destructive' : 'default'}>{row.getValue("status")}</Badge>
      );
    },
  },
  {
    accessorKey: "measurement",
    header: ({ column }) => (
      <ExerciseTableColumnHeader column={column} title="Measurement" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("measurement")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ExerciseTableRowActions
          id={row.getValue("id")}
          status={row.getValue("status")}
        />
      );
    },
  },
];

// TODO: Properly type the column parameter
export const getExerciseLoadingColumns = (column: any) => {
  if (column.id === "actions") {
    return <div className="flex justify-end gap-2">
      <Skeleton className="w-[42px] h-9" />
      <Skeleton className="w-[42px] h-9" />
    </div>
  };

  switch (column.accessorKey) {
    case "name":
      return (
        <Skeleton className="max-w-[500px] h-6" />
      );
    case "status":
      return <Skeleton className="w-24 h-6" />;
    case "measurement":
      return <Skeleton className="w-16 h-6" />;
    default:
      return null;
  }
}
