import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

const Alert = AlertDialogPrimitive.Root;
const AlertTrigger = AlertDialogPrimitive.Trigger;
const AlertPortal = AlertDialogPrimitive.Portal;
const AlertCancel = AlertDialogPrimitive.Cancel;
const AlertAction = AlertDialogPrimitive.Action;

const AlertOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      className
    )}
    {...props}
  />
));
AlertOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertPortal>
    <AlertOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg border",
        className
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertPortal>
));
AlertContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
AlertTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-2", className)}
    {...props}
  />
));
AlertDescription.displayName = AlertDialogPrimitive.Description.displayName;

export {
  Alert,
  AlertTrigger,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCancel,
  AlertAction,
};
