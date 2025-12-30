import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    // Layout
    "flex w-full rounded-md px-3 py-2 text-sm shadow-sm transition-colors",
    // Layer 3 tokens - text
    "text-wex-input-fg",
    // Layer 3 tokens - placeholder
    "placeholder:text-wex-input-placeholder",
    // Focus ring
    "focus-visible:outline-none focus-visible:ring-1",
    // Disabled states
    "disabled:cursor-not-allowed",
    "disabled:bg-wex-input-disabled-bg",
    "disabled:text-wex-input-disabled-fg",
    "disabled:border-wex-input-disabled-border",
    "disabled:opacity-[var(--wex-component-input-disabled-opacity)]",
    // File input
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-wex-input-bg",
          "border border-wex-input-border",
          "hover:border-wex-input-border-hover",
          "focus-visible:border-wex-input-border-focus",
          "focus-visible:ring-wex-input-focus-ring",
        ].join(" "),
        filled: [
          "bg-[hsl(var(--wex-component-input-filled-bg))]",
          "border border-transparent",
          "hover:bg-[hsl(var(--wex-component-input-filled-hover-bg))]",
          "focus-visible:border-wex-input-border-focus",
          "focus-visible:ring-wex-input-focus-ring",
        ].join(" "),
      },
      inputSize: {
        sm: "h-8 text-xs",
        md: "h-11",
        lg: "h-12 text-base",
      },
      invalid: {
        true: [
          "border-[hsl(var(--wex-component-input-invalid-border))]",
          "focus-visible:border-[hsl(var(--wex-component-input-invalid-border))]",
          "focus-visible:ring-[hsl(var(--wex-component-input-invalid-focus-ring))]",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      invalid: false,
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, invalid, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-wex-input-placeholder">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, invalid }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            aria-invalid={invalid || undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-wex-input-placeholder">
              {rightIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, invalid }), className)}
        ref={ref}
        aria-invalid={invalid || undefined}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
