import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
  onLeftIconClick?: () => void
}

const FloatLabel = React.forwardRef<HTMLInputElement, FloatLabelProps>(
  (
    {
      label,
      className,
      error = false,
      leftIcon,
      rightIcon,
      onRightIconClick,
      onLeftIconClick,
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const inputRef = React.useRef<HTMLInputElement>(null)
    
    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    React.useEffect(() => {
      if (inputRef.current) {
        setHasValue(!!inputRef.current.value)
      }
    }, [props.value, props.defaultValue])

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      props.onChange?.(e)
    }

    const isActive = isFocused || hasValue
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className="relative w-full">
        <input
          ref={combinedRef}
          id={inputId}
          type={type}
          className={cn(
            "peer h-14 w-full rounded-md border border-input bg-transparent px-3 pb-2 pt-6 text-base shadow-sm transition-colors",
            "placeholder:text-transparent",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error &&
              "border-destructive focus-visible:ring-destructive",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 origin-left transition-all duration-200 pointer-events-none",
            "text-sm text-muted-foreground",
            leftIcon && "left-10",
            isActive && [
              "top-2 translate-y-0 scale-75",
              "text-xs",
              isFocused && !error && "text-primary",
            ],
            error && "text-destructive",
            props.disabled && "opacity-50"
          )}
        >
          {label}
        </label>
        {leftIcon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors",
              isFocused && !error && "text-primary",
              error && "text-destructive",
              onLeftIconClick && "cursor-pointer hover:text-foreground",
              props.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={props.disabled ? undefined : onLeftIconClick}
            role={onLeftIconClick ? "button" : undefined}
            tabIndex={onLeftIconClick && !props.disabled ? 0 : undefined}
          >
            {leftIcon}
          </div>
        )}
        {rightIcon && (
          <div
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors",
              isFocused && !error && "text-primary",
              error && "text-destructive",
              onRightIconClick && "cursor-pointer hover:text-foreground",
              props.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={props.disabled ? undefined : onRightIconClick}
            role={onRightIconClick ? "button" : undefined}
            tabIndex={onRightIconClick && !props.disabled ? 0 : undefined}
          >
            {rightIcon}
          </div>
        )}
        {error && props["aria-describedby"] && (
          <span id={`${inputId}-error`} className="sr-only">
            Error
          </span>
        )}
      </div>
    )
  }
)

FloatLabel.displayName = "FloatLabel"

export { FloatLabel }

