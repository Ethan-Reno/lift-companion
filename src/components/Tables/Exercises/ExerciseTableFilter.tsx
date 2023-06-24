import * as React from "react";
import { type Column } from "@tanstack/react-table";
import { type LucideIcon, PlusCircle } from "lucide-react";
import { Badge, Button, DropdownMenu, Popover } from "good-nice-ui";

interface ExerciseTableFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string
    value: string
    icon?: LucideIcon
  }[];
}

export function ExerciseTableFilter<TData, TValue>({
  column,
  title,
  options,
}: ExerciseTableFilter<TData, TValue>) {
  // const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  console.log(selectedValues);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px] p-0" align="start">
        <DropdownMenu>
          
        </DropdownMenu>
      </Popover.Content>
    </Popover>
  );
}
