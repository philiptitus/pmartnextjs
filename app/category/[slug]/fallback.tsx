"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState("featured")

  const category = getCategoryBySlug(slug)
  const products = category ? getProductsByCategory(category.id) : []

  // Sort products based on the selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case "rating":
        return b.rating - a.rating
      default: // featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    }
  })

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [slug])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  if (!category && !isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/shop">Browse All Products</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
              <p className="text-muted-foreground">{category?.description}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border rounded-md text-sm p-1 bg-background"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found in this category</h3>
                <Button asChild className="mt-4">
                  <a href="/shop">Browse All Products</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

