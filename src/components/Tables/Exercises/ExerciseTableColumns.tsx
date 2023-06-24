import { type ColumnDef } from "@tanstack/react-table";
import { type ExerciseSchema } from "../../../schemas/ExerciseSchema";
import { ExerciseTableColumnHeader } from "./ExerciseTableColumnHeader";
import { ExerciseTableRowActions } from "./ExerciseTableRowActions";
import { Badge } from "good-nice-ui";

export const exerciseColumns: ColumnDef<ExerciseSchema>[] = [
  // Not sure if this is the best solution:
  // Including an empty and hidden column to have access to the exercise id
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
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
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
        <div className="flex items-center">
          <Badge variant={status === 'Inactive' ? 'destructive' : 'default'}>{row.getValue("status")}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "measurement",
    header: "Measurement",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("measurement")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("unit")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.getValue("id");
      console.log(id);
      return (
        <ExerciseTableRowActions id={row.getValue("id")} />
      );
    },
  },
];
