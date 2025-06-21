import * as React from "react";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
}

export function Calendar({ value, onChange, className }: CalendarProps) {
  return (
    <div className={cn("inline-block rounded-lg bg-muted p-4", className)}>
      <label className="block text-sm font-medium mb-2 text-muted-foreground">
        Select a date
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moloch-500 focus-visible:ring-offset-2"
      />
    </div>
  );
}
