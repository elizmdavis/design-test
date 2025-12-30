"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, Maximize2, Minimize2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-[hsl(var(--wex-component-dialog-overlay-bg)/var(--wex-component-dialog-overlay-opacity))]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// ============================================================
// Dialog Content variants
// ============================================================
const dialogContentVariants = cva(
  [
    "fixed z-50 grid gap-4 p-6 shadow-lg duration-200 sm:rounded-lg",
    "bg-wex-dialog-bg text-wex-dialog-fg border border-wex-dialog-border",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  ],
  {
    variants: {
      position: {
        center: [
          "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        ].join(" "),
        top: [
          "left-[50%] top-4 translate-x-[-50%]",
          "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        ].join(" "),
        bottom: [
          "left-[50%] bottom-4 translate-x-[-50%]",
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        ].join(" "),
        left: [
          "left-4 top-[50%] translate-y-[-50%]",
          "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        ].join(" "),
        right: [
          "right-4 top-[50%] translate-y-[-50%]",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        ].join(" "),
      },
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-lg",
        lg: "w-full max-w-2xl",
        xl: "w-full max-w-4xl",
        full: "w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-none",
      },
    },
    defaultVariants: {
      position: "center",
      size: "md",
    },
  }
)

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Enable maximize/restore functionality */
  maximizable?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, position, size, maximizable, ...props }, ref) => {
  const [isMaximized, setIsMaximized] = React.useState(false)

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          dialogContentVariants({
            position: isMaximized ? "center" : position,
            size: isMaximized ? "full" : size,
          }),
          className
        )}
        {...props}
      >
        {children}
        <div className="absolute right-4 top-4 flex items-center gap-1">
          {maximizable && (
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-wex-dialog-close-hover-bg focus:outline-none focus:ring-2 focus:ring-wex-dialog-focus-ring focus:ring-offset-2 p-1"
            >
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              <span className="sr-only">{isMaximized ? "Restore" : "Maximize"}</span>
            </button>
          )}
          <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-wex-dialog-close-hover-bg focus:outline-none focus:ring-2 focus:ring-wex-dialog-focus-ring focus:ring-offset-2 p-1 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-wex-dialog-header-fg",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-wex-dialog-footer-fg",
      className
    )}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
