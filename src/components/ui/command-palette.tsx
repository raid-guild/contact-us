import * as React from "react";
import * as Cmdk from "cmdk";

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: { label: string; value: string; onSelect?: () => void }[];
}

export function CommandPalette({
  open,
  onOpenChange,
  commands,
}: CommandPaletteProps) {
  const [search, setSearch] = React.useState("");
  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Cmdk.Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command Palette"
      className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-4 shadow-lg border"
    >
      <Cmdk.Command.Input
        autoFocus
        value={search}
        onValueChange={setSearch}
        placeholder="Type a command..."
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moloch-500 focus-visible:ring-offset-2 mb-2"
      />
      <Cmdk.Command.List className="max-h-60 overflow-y-auto">
        {filtered.length === 0 ? (
          <Cmdk.Command.Empty className="p-2 text-muted-foreground">
            No results found.
          </Cmdk.Command.Empty>
        ) : (
          filtered.map((cmd) => (
            <Cmdk.Command.Item
              key={cmd.value}
              value={cmd.value}
              onSelect={() => {
                cmd.onSelect?.();
                onOpenChange(false);
              }}
              className="cursor-pointer select-none rounded px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              {cmd.label}
            </Cmdk.Command.Item>
          ))
        )}
      </Cmdk.Command.List>
    </Cmdk.Command.Dialog>
  );
}
