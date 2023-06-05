import { type ColumnDef } from "@tanstack/react-table";
import { type ExerciseSchema } from "../../../schemas/ExerciseSchema";
import { ExerciseTableColumnHeader } from "./ExerciseTableColumnHeader";
import { ExerciseTableRowActions } from "./ExerciseTableRowActions";

export const exerciseColumns: ColumnDef<ExerciseSchema>[] = [
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
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("status")}</span>
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
          {/* {measurement.icon && (
            <measurement.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
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
          {/* {measurement.icon && (
            <measurement.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{row.getValue("unit")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ExerciseTableRowActions row={row} />,
  },
];
