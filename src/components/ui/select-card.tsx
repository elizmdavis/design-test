import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export interface SelectCardProps {
  // Core content
  title: string
  subtext?: string
  description?: string
  icon?: React.ReactNode
  
  // Selection
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
  selectionType?: "radio" | "checkbox"
  disabled?: boolean
  value?: string // For radio group integration
  
  // View link
  viewLabel?: string
  onViewClick?: (e: React.MouseEvent) => void
  viewHref?: string
  
  // Styling
  className?: string
}

const SelectCard = React.forwardRef<HTMLDivElement, SelectCardProps>(
  (
    {
      title,
      subtext,
      description,
      icon,
      selected = false,
      onSelectedChange,
      selectionType = "radio",
      disabled = false,
      value,
      viewLabel,
      onViewClick,
      viewHref,
      className,
      ...props
    },
    ref
  ) => {
    const handleCardClick = () => {
      if (disabled) return
      
      // Radio mode: always set to true when clicked
      // Checkbox mode: toggle the current state
      if (selectionType === "radio") {
        onSelectedChange?.(true)
      } else {
        onSelectedChange?.(!selected)
      }
    }

    const handleViewClick = (e: React.MouseEvent) => {
      e.stopPropagation() // Prevent card selection
      onViewClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return
      
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        handleCardClick()
      }
    }

    const cardId = React.useId()

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-pressed={selected}
        aria-disabled={disabled}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex gap-2 rounded-lg border-2 bg-background p-4 transition-all cursor-pointer",
          "hover:border-primary/50 hover:bg-accent/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          selected && [
            "border-primary",
            "hover:border-primary",
          ],
          disabled && [
            "opacity-50 cursor-not-allowed",
            "hover:border-border hover:bg-background",
          ],
          !selected && !disabled && "border-border",
          className
        )}
        {...props}
      >
        {/* Left: Icon Section - aligned with title */}
        {icon && (
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-top justify-center text-muted-foreground rounded-full">
              {icon}
            </div>
          </div>
        )}

        {/* Middle: Content Section */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            {/* Title */}
            <div className="flex-1">
              <h3 className="font-semibold leading-tight text-base">
                {title}
              </h3>
            </div>

            {/* Top Right: Selection Control */}
            <div className="flex-shrink-0">
              {selectionType === "checkbox" ? (
                <Checkbox
                  checked={selected}
                  disabled={disabled}
                  onCheckedChange={(checked) => {
                    if (!disabled) {
                      onSelectedChange?.(checked as boolean)
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-labelledby={cardId}
                />
              ) : (
                <div 
                  className={cn(
                    "flex items-center justify-center h-5 w-5 rounded-full border-2 transition-colors",
                    selected ? "border-primary bg-primary" : "border-input",
                    disabled && "opacity-50"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {selected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-background" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Subtext */}
          {subtext && (
            <p className="mt-1 text-sm text-muted-foreground">
              {subtext}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="mt-2 text-sm text-foreground">
              {description}
            </p>
          )}

          {/* Bottom Left: View Link */}
          {(viewLabel && (viewHref || onViewClick)) && (
            <div className="mt-3">
              {viewHref ? (
                <a
                  href={viewHref}
                  onClick={handleViewClick}
                  className={cn(
                    "text-sm font-medium text-primary hover:underline inline-flex items-center gap-1",
                    disabled && "pointer-events-none opacity-50"
                  )}
                >
                  {viewLabel}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleViewClick}
                  disabled={disabled}
                  className={cn(
                    "text-sm font-medium text-primary hover:underline inline-flex items-center gap-1",
                    disabled && "pointer-events-none opacity-50"
                  )}
                >
                  {viewLabel}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        <span id={cardId} className="sr-only">
          {title}
        </span>
      </div>
    )
  }
)

SelectCard.displayName = "SelectCard"

export { SelectCard }

