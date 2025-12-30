import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "grid place-content-center peer shrink-0 rounded-sm border shadow",
    "border-wex-checkbox-border bg-wex-checkbox-bg",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wex-checkbox-focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-[var(--wex-component-checkbox-disabled-opacity)]",
    "data-[state=checked]:bg-wex-checkbox-checked-bg data-[state=checked]:text-wex-checkbox-checked-fg",
  ],
  {
    variants: {
      checkboxSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      checkboxSize: "md",
    },
  }
)

const checkIconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "size">,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checkboxSize, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ checkboxSize }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className={checkIconSizes[checkboxSize || "md"]} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
