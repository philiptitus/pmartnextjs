"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("relative", className)} {...props} ref={ref}>
      {children}
    </div>
  )
})
Carousel.displayName = "Carousel"

interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("relative flex overflow-hidden snap-x snap-mandatory touch-pan-x scroll-smooth", className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)
CarouselContent.displayName = "CarouselContent"

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("relative w-full flex-shrink-0 snap-start", className)} {...props} ref={ref}>
      {children}
    </div>
  )
})
CarouselItem.displayName = "CarouselItem"

interface CarouselPreviousProps extends React.HTMLAttributes<HTMLButtonElement> {}

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(({ className, ...props }, ref) => {
  return (
    <button
      aria-label="Go to previous slide"
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-gray-800/80 p-1 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors",
        className,
      )}
      {...props}
      ref={ref}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M15 18L9 12L15 6" />
      </svg>
      <span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

interface CarouselNextProps extends React.HTMLAttributes<HTMLButtonElement> {}

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(({ className, ...props }, ref) => {
  return (
    <button
      aria-label="Go to next slide"
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-gray-800/80 p-1 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors",
        className,
      )}
      {...props}
      ref={ref}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M9 18L15 12L9 6" />
      </svg>
      <span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }

