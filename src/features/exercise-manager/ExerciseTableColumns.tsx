import { type ColumnDef } from "@tanstack/react-table";
import { ExerciseStatusEnum, type Exercise, MeasurementEnum } from "../../schemas/ExerciseSchema";
import { ExerciseTableColumnHeader } from "./ExerciseTableColumnHeader";
import { ExerciseTableRowActions } from "./ExerciseTableRowActions";
import { Badge, Skeleton } from "good-nice-ui";

export const exerciseColumns: ColumnDef<Exercise>[] = [
  {
    id: "actions",
    maxSize: 40,
    cell: ({ row }) => {
      return (
        <ExerciseTableRowActions
          data={{
            id: row.getValue("id"),
            name: row.getValue("name"),
            description: row.getValue("description"),
            status: row.getValue("status"),
            measurement: row.getValue("measurement"),
            createdAt: row.getValue("createdAt"),
            updatedAt: row.getValue("updatedAt"),
          }}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ExerciseTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium cursor-default">
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
      const status: ExerciseStatusEnum = row.getValue("status");
      return (
        <Badge className='capitalize' variant={status === 'inactive' ? 'destructive' : 'default'}>{row.getValue("status")}</Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <ExerciseTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      return (
        <div className="flex items-center">
          <span>{description}</span>
        </div>
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
        <div className="flex items-center capitalize">
          <span>{measurement}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null
  },
  {
    accessorKey: "createdAt",
    header: () => null,
    cell: () => null
  },
  {
    accessorKey: "updatedAt",
    header: () => null,
    cell: () => null
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
