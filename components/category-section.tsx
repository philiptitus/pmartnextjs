"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "@/app/store/actions"
import type { RootStateType, AppDispatch } from "@/app/store/store"

interface Category {
  id: string | number
  name: string
  slug: string
  icon: string
}

export function CategorySection() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { categories , loading, error } = useSelector(
    (state: RootStateType) => state.categories
  )

  // Use categories from Redux or fallback to fake data if there's an error
  const displayCategories=  categories 

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`)
  }

  if (loading) {
    return <div>Loading categories...</div>
  }


  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {displayCategories?.map((category: Category) => (
        <div
          key={category.id}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => handleCategoryClick(category.slug)}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-background rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:bg-primary/10 transition-colors">
            <span className="text-2xl">{category.icon}</span>
          </div>
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  )
}

