import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex w-full rounded-md px-3 py-2 text-sm shadow-sm transition-colors",
    "border border-wex-textarea-border bg-wex-textarea-bg text-wex-textarea-fg",
    "placeholder:text-wex-textarea-placeholder",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wex-textarea-focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-[var(--wex-component-textarea-disabled-opacity)]",
  ],
  {
    variants: {
      textareaSize: {
        sm: "min-h-[60px] text-xs",
        md: "min-h-[100px]",
        lg: "min-h-[150px] text-base",
      },
    },
    defaultVariants: {
      textareaSize: "md",
    },
  }
)

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size">,
    VariantProps<typeof textareaVariants> {
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, textareaSize, autoResize, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    const handleResize = React.useCallback(() => {
      const textarea = textareaRef.current
      if (textarea && autoResize) {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [autoResize])

    React.useEffect(() => {
      handleResize()
    }, [handleResize, props.value])

    return (
      <textarea
        className={cn(
          textareaVariants({ textareaSize }),
          autoResize && "resize-none overflow-hidden",
          className
        )}
        ref={(node) => {
          textareaRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        onInput={autoResize ? handleResize : undefined}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
