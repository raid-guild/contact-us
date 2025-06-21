"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Calendar } from "@/components/ui/calendar";
import { ProgressBar } from "@/components/ui/progress";
import {
  Alert,
  AlertTrigger,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCancel,
  AlertAction,
} from "@/components/ui/alert";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "@/components/ui/toast";
import { CommandPalette } from "@/components/ui/command-palette";
import { Button } from "@/components/ui/button";

export default function DataDisplayPage() {
  // Table data
  const tableRows = [
    { name: "Alice", role: "Admin", status: "Active" },
    { name: "Bob", role: "Member", status: "Inactive" },
    { name: "Carol", role: "Member", status: "Active" },
    { name: "Dave", role: "Guest", status: "Pending" },
  ];

  // DataTable data
  const dataTableColumns: DataTableColumn<(typeof tableRows)[0]>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  // Calendar
  const [date, setDate] = useState("");

  // Progress
  const [progress, setProgress] = useState(60);

  // Toast
  const [showToast, setShowToast] = useState(false);

  // Command Palette
  const [cmdOpen, setCmdOpen] = useState(false);
  const commands = [
    {
      label: "Go to Home",
      value: "home",
      onSelect: () => (window.location.href = "/"),
    },
    {
      label: "Go to Components",
      value: "components",
      onSelect: () => (window.location.href = "/components"),
    },
    {
      label: "Go to Navigation",
      value: "navigation",
      onSelect: () => (window.location.href = "/navigation"),
    },
    {
      label: "Go to Data Display",
      value: "data-display",
      onSelect: () => (window.location.href = "/data-display"),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-foreground">
            Data Display Components
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Phase 3: Tables, Calendar, Progress, Alerts, Toasts, Command Palette
          </p>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Table</CardTitle>
            <CardDescription>Dark theme, striped rows</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Team Members</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Data Table</CardTitle>
            <CardDescription>Sortable, filterable table</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={dataTableColumns}
              data={tableRows}
              filterKey="name"
            />
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Calendar</CardTitle>
            <CardDescription>Date picker</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar value={date} onChange={setDate} />
            {date && (
              <div className="mt-2 text-sm text-muted-foreground">
                Selected: {date}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ProgressBar */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Progress</CardTitle>
            <CardDescription>Progress indicator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ProgressBar value={progress} className="w-64" />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                -
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                +
              </Button>
              <span className="ml-2 text-sm">{progress}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Alert</CardTitle>
            <CardDescription>Alert dialog for critical actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertTrigger>
              <AlertContent>
                <AlertTitle>Are you absolutely sure?</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. This will permanently delete
                  your account.
                </AlertDescription>
                <div className="mt-4 flex gap-2 justify-end">
                  <AlertCancel asChild>
                    <Button variant="outline">Cancel</Button>
                  </AlertCancel>
                  <AlertAction asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertAction>
                </div>
              </AlertContent>
            </Alert>
          </CardContent>
        </Card>

        {/* Toast */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Toast</CardTitle>
            <CardDescription>Toast notification</CardDescription>
          </CardHeader>
          <CardContent>
            <ToastProvider swipeDirection="right">
              <Button onClick={() => setShowToast(true)} variant="moloch">
                Show Toast
              </Button>
              <ToastViewport />
              {showToast && (
                <Toast
                  open={showToast}
                  onOpenChange={setShowToast}
                  duration={3000}
                >
                  <ToastTitle>Success!</ToastTitle>
                  <ToastDescription>
                    Your action was successful.
                  </ToastDescription>
                  <ToastAction altText="Close" asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowToast(false)}
                    >
                      Close
                    </Button>
                  </ToastAction>
                  <ToastClose />
                </Toast>
              )}
            </ToastProvider>
          </CardContent>
        </Card>

        {/* Command Palette */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Command Palette</CardTitle>
            <CardDescription>Quick navigation and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setCmdOpen(true)}>
              Open Command Palette
            </Button>
            <CommandPalette
              open={cmdOpen}
              onOpenChange={setCmdOpen}
              commands={commands}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
