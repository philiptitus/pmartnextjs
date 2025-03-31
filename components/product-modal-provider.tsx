'use client'

import { createContext, useContext, ReactNode, useState } from 'react'
import type { Product } from '@/lib/data'
import { ProductDetailModal } from '@/components/product-detail-modal'

interface ProductModalContextType {
  selectedProduct: Product | null
  isOpen: boolean
  openModal: (product: Product) => void
  closeModal: () => void
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined)

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (product: Product) => {
    setSelectedProduct(product)
    setIsOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIsOpen(false)
  }

  return (
    <ProductModalContext.Provider
      value={{
        selectedProduct,
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      <ProductDetailModal product={selectedProduct} isOpen={isOpen} onClose={closeModal} />
    </ProductModalContext.Provider>
  )
}

export function useProductModal() {
  const context = useContext(ProductModalContext)
  if (context === undefined) {
    throw new Error('useProductModal must be used within a ProductModalProvider')
  }
  return context
} 