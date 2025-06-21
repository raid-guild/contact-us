import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export type DataTableColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type SortDirection = "asc" | "desc";

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  filterKey?: keyof T;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  filterKey,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>("asc");
  const [filter, setFilter] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!filterKey || !filter) return data;
    return data.filter((row) =>
      String(row[filterKey]).toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter, filterKey]);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortDir === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  function handleSort(key: keyof T) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {filterKey && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <div className="relative">
            <input
              className="rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moloch-500 focus-visible:ring-offset-2"
              placeholder={`Search ${String(filterKey)}`}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute right-2 top-1.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={
                  col.sortable ? "cursor-pointer select-none" : undefined
                }
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable &&
                    sortKey === col.key &&
                    (sortDir === "asc" ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    ))}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground"
              >
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render ? col.render(row) : String(row[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
