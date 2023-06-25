import * as React from "react"
import { Column } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import { Command, Popover, Separator, Button, Badge, CheckIcon } from 'good-nice-ui';
import clsx from "clsx";

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
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
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
        <Command>
          <Command.List>
            <Command.Group>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <Command.Item
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={clsx(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon size={16} />
                    </div>
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </Command.Item>
                )
              })}
            </Command.Group>
            {selectedValues.size > 0 && (
              <>
                <Command.Separator />
                <Command.Group>
                  <Command.Item
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </Command.Item>
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  );
}
