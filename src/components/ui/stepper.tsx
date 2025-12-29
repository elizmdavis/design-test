import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface Step {
  id: string
  label: string
  status: "completed" | "current" | "upcoming"
  substeps?: Step[]
}

export interface StepperProps {
  steps: Step[]
  currentStepId: string
  onStepClick?: (stepId: string) => void
  className?: string
}

interface StepItemProps {
  step: Step
  index: number
  isLast: boolean
  onStepClick?: (stepId: string) => void
  isSubstep?: boolean
  showSubsteps?: boolean
}

const StepItem: React.FC<StepItemProps> = ({
  step,
  index,
  isLast,
  onStepClick,
  isSubstep = false,
  showSubsteps = false,
}) => {
  const handleClick = () => {
    if (onStepClick) {
      onStepClick(step.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  const hasSubsteps = showSubsteps && step.substeps && step.substeps.length > 0

  return (
    <div className={cn("relative flex flex-col", !isLast && !isSubstep && "mb-6")}>
      {/* Step content */}
      <div
        className={cn(
          "flex items-center gap-3 relative z-10",
          onStepClick && "cursor-pointer group"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onStepClick ? 0 : undefined}
        role={onStepClick ? "button" : undefined}
        aria-current={step.status === "current" ? "step" : undefined}
      >
        {/* Step indicator */}
        <div
          className={cn(
            "flex items-center justify-center rounded-full transition-all flex-shrink-0",
            isSubstep ? "h-3.5 w-3.5 text-xs" : "h-6 w-6 text-sm",
            step.status === "completed" && [
              isSubstep
                ? "text-teal-600"
                : "bg-teal-600 text-white border-2 border-teal-600",
            ],
            step.status === "current" && [
              isSubstep
                ? "border-2 border-primary text-primary"
                : "border-2 border-primary text-primary",
              "font-semibold",
            ],
            step.status === "upcoming" && [
              isSubstep
                ? "border border-muted-foreground/40 text-muted-foreground"
                : "bg-muted text-muted-foreground",
            ],
            onStepClick && "group-hover:scale-110"
          )}
        >
          {step.status === "completed" ? (
            isSubstep ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-teal-600 flex items-center justify-center">
                <Check className="h-2 w-2" strokeWidth={3} />
              </div>
            ) : (
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            )
          ) : isSubstep ? (
            // Secondary steps show empty circle (no number)
            <div className="w-3.5 h-3.5" />
          ) : (
            // Primary steps show number
            <span className="font-medium">{index + 1}</span>
          )}
        </div>

        {/* Step label */}
        <div
          className={cn(
            "transition-colors",
            isSubstep ? "text-xs leading-4" : "text-sm leading-6 tracking-tight",
            step.status === "completed" && "text-muted-foreground",
            step.status === "current" && "text-foreground font-semibold",
            step.status === "upcoming" && "text-muted-foreground",
            isSubstep && step.status === "current" && "font-medium",
            onStepClick && "group-hover:text-primary"
          )}
        >
          {step.label}
        </div>
      </div>

      {/* Substeps */}
      {hasSubsteps && (
        <div className="mt-4 pl-9 flex flex-col gap-2 relative">
          {step.substeps!.map((substep, subIndex) => (
            <div key={substep.id} className="relative">
              <StepItem
                step={substep}
                index={subIndex}
                isLast={subIndex === step.substeps!.length - 1}
                onStepClick={onStepClick}
                isSubstep={true}
              />
              {/* Connecting line for substeps - 12px fixed height */}
              {subIndex < step.substeps!.length - 1 && (
                <div
                  className="absolute left-[7px] top-[14px] w-px h-3 bg-border"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Connecting line to next step */}
      {!isLast && !isSubstep && (
        <div
          className={cn(
            "absolute left-3 w-px bg-border",
            hasSubsteps ? "top-6" : "top-6 bottom-0"
          )}
          style={{
            height: hasSubsteps
              ? `calc(100% - 24px + ${step.substeps!.length * 22}px + ${(step.substeps!.length - 1) * 8}px + 16px)`
              : "calc(100% - 24px + 24px)",
          }}
        />
      )}
    </div>
  )
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStepId, onStepClick, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Progress"
        className={cn("w-full", className)}
        {...props}
      >
        {steps.map((step, index) => {
          // Show substeps only if this is the current step
          const showSubsteps =
            step.id === currentStepId && step.status === "current"

          return (
            <StepItem
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              onStepClick={onStepClick}
              showSubsteps={showSubsteps}
            />
          )
        })}
      </nav>
    )
  }
)

Stepper.displayName = "Stepper"

export { Stepper, StepItem }
