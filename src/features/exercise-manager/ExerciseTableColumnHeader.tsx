import { type Column } from "@tanstack/react-table";
import { ChevronsUpDown, Filter, SortAsc, SortDesc } from "lucide-react";
import { Button, DropdownMenu } from "good-nice-ui";
import { clsx } from "clsx";

interface ExerciseTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function ExerciseTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ExerciseTableColumnHeaderProps<TData, TValue>) {
  const facets = column.getFacetedUniqueValues();
  let selectedValue = column.getFilterValue() as string;

  const sortDropdown = (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        <DropdownMenu.Label className="text-lowContrast-foreground">Sort</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className='p-2' onClick={() => column.toggleSorting(false)}>
          <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenu.Item>
        <DropdownMenu.Item className='p-2' onClick={() => column.toggleSorting(true)}>
          <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenu.Item>
        {column.getIsSorted() && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onSelect={() => column.clearSorting()}
              className="justify-center text-center p-2"
            >
              Clear sorting
            </DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );

  const filterDropdown = (options: string[]) => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{title}</span>
          {selectedValue ? (
            <Filter className="ml-2 h-4 w-4 text-primary" />
          ) : <Filter className="ml-2 h-4 w-4" />}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label className="text-lowContrast-foreground">Filter</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup
          onValueChange={value => {
            column.setFilterValue(value || undefined)
          }}
          value={selectedValue || ''}
        >
          {options.map((option) => {
            return (
              <DropdownMenu.RadioItem
                key={option}
                value={option}
              >
                <span>{option}</span>
                {facets.get(option) && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {facets.get(option)}
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
              onSelect={() => column.setFilterValue(undefined)}
              className="justify-center text-center p-2"
            >
              Clear filter
            </DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );

  switch(column.id) {
    case 'name':
      return sortDropdown;
    case 'measurement':
      return filterDropdown(['weight', 'distance', 'time']);
    case 'status':
      return filterDropdown(['inactive', 'active', 'deleted']);
    default:
      return <div className={clsx(className)}>{title}</div>
  }
}
