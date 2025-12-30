import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva("bg-wex-skeleton-bg", {
  variants: {
    shape: {
      rectangle: "rounded-md",
      circle: "rounded-full",
      text: "rounded h-4",
    },
    animation: {
      pulse: "animate-pulse",
      wave: "animate-skeleton-wave",
      none: "",
    },
  },
  defaultVariants: {
    shape: "rectangle",
    animation: "pulse",
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Width (can be number for px or string for any unit) */
  width?: number | string
  /** Height (can be number for px or string for any unit) */
  height?: number | string
}

function Skeleton({
  className,
  shape,
  animation,
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ shape, animation }), className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
}

// ============================================================
// Preset Skeletons
// ============================================================

/** Text line skeleton */
function SkeletonText({ className, ...props }: Omit<SkeletonProps, "shape">) {
  return <Skeleton shape="text" className={cn("w-full", className)} {...props} />
}

/** Circle skeleton (for avatars) */
function SkeletonCircle({ className, width = 40, height = 40, ...props }: Omit<SkeletonProps, "shape">) {
  return <Skeleton shape="circle" width={width} height={height} className={className} {...props} />
}

/** Card skeleton */
function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Skeleton height={200} className="w-full" />
      <Skeleton height={16} className="w-3/4" />
      <Skeleton height={16} className="w-1/2" />
    </div>
  )
}

/** List skeleton */
function SkeletonList({ count = 3, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <SkeletonCircle width={32} height={32} />
          <div className="flex-1 space-y-2">
            <Skeleton height={14} className="w-3/4" />
            <Skeleton height={12} className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard, SkeletonList, skeletonVariants }
