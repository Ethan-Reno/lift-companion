import { type ColumnDef } from "@tanstack/react-table";
import { ExerciseStatusEnum, type Exercise, MeasurementEnum } from "../../schemas/ExerciseSchema";
import { ExerciseTableColumnHeader } from "./ExerciseTableColumnHeader";
import { ExerciseTableRowActions } from "./ExerciseTableRowActions";
import { Badge, Skeleton, Tooltip, TooltipProvider } from "good-nice-ui";

export const exerciseColumns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null
  },
  {
    accessorKey: "description",
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
        <TooltipProvider>
          <Tooltip>
            <Tooltip.Trigger>
              <span className="max-w-[500px] truncate font-medium cursor-default">
                {row.getValue("name")}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {row.getValue("description")}
            </Tooltip.Content>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <ExerciseTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: ExerciseStatusEnum = row.getValue("status");
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
      const measurement: MeasurementEnum = row.getValue("measurement");
      return (
        <div className="flex items-center">
          <span>{measurement}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ExerciseTableRowActions
          data={{
            id: row.getValue("id"),
            name: row.getValue("name"),
            description: row.getValue("description"),
            status: row.getValue("status"),
            measurement: row.getValue("measurement"),
          }}
        />
      );
    },
  },
];

// TODO: Properly type the column parameter
export const getExerciseLoadingColumns = (column: any) => {
  if (column.id === "actions") {
    return <div className="flex justify-end">
      <Skeleton className="w-10 h-10" />
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
