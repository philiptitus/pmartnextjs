'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface FavoriteItem {
  id: string
  name: string
  price: number
  images: any[]
  color?: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load favorites from localStorage on mount
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    if (mounted) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, mounted])

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.id === item.id)) {
        return [...prev, item]
      }
      return prev
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id)
  }

  if (!mounted) {
    return null
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}