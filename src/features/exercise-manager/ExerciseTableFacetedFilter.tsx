import * as React from "react"
import { Column } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import { Separator, Button, Badge, DropdownMenu } from 'good-nice-ui';

interface ExerciseTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
  }[]
};

export function ExerciseTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: ExerciseTableFacetedFilter<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  let selectedValue = column?.getFilterValue() as string;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValue && (
            <div className="space-x-1 flex items-center">
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {options.find(option => option.value === selectedValue)?.label}
              </Badge>
            </div>
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup
          onValueChange={value => {
            column?.setFilterValue(value || undefined)
          }}
          value={selectedValue || ''}
        >
          {options.map((option) => {
            return (
              <DropdownMenu.RadioItem
                key={option.value}
                value={option.value}
              >
                <span>{option.label}</span>
                {facets?.get(option.value) && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {facets.get(option.value)}
                  </span>
                )}
              </DropdownMenu.RadioItem>
            )
          })}
        </DropdownMenu.RadioGroup>

        {selectedValue && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onSelect={() => column?.setFilterValue(undefined)}
              className="justify-center text-center"
            >
              Clear filter
            </DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}