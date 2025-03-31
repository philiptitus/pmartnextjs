export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  images: string[]
  category: string
  stock: number
  rating: number
  reviews: number
  isNew?: boolean
  isFeatured?: boolean
  color: string
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  slug: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  avatar?: string
}

export const categories = [
  
];

export const products = [


];


export const users: User[] = [
 
]

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId)
}

export const getFeaturedProducts = () => {
  return products.filter((product) => product.isFeatured)
}

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id)
}

export const getCategoryBySlug = (slug: string) => {
  return categories.find((category) => category.slug === slug)
}

export const getCategoryById = (id: string) => {
  return categories.find((category) => category.id === id)
}

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery),
  )
}