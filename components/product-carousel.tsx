"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeaturedProducts } from "@/app/store/actions"
import type { RootStateType, AppDispatch } from "@/app/store/store"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"

export function ProductCarousel() {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredProducts, loading, error } = useSelector(
    (state: RootStateType) => state.featuredProducts
  )

  // Use featuredProducts from Redux or fallback to fake data if there's an error
  const displayProducts =  featuredProducts

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Determine items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 5
    }
    return 5 // Default for SSR
  }

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide())

  // Update items per slide on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate total number of slides
  const totalSlides = Math.ceil(displayProducts?.length / itemsPerSlide)

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides, isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Remove the error return and use fallback data instead
  if (error) {
    console.error("Error loading featured products:", error)
    // It will continue to render with fallback data
  }

  if (!displayProducts || displayProducts.length === 0) {
    return <div>No products found</div>
  }

  // Update the render code to use displayProducts instead of featuredProducts
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={carouselRef}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {displayProducts
                  .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-md z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-md z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "bg-primary w-4" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

