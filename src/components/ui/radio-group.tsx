import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioItemVariants = cva(
  [
    "aspect-square rounded-full border shadow",
    "border-wex-radio-border bg-wex-radio-bg",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-wex-radio-focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-[var(--wex-component-radio-disabled-opacity)]",
  ],
  {
    variants: {
      radioSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      radioSize: "md",
    },
  }
)

const radioIndicatorSizes = {
  sm: "h-2.5 w-2.5",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
}

export interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "size">,
    VariantProps<typeof radioItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, radioSize, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ radioSize }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(radioIndicatorSizes[radioSize || "md"], "fill-wex-radio-checked-fg")} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem, radioItemVariants }
