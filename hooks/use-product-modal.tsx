"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/lib/data"
import { ProductDetailModal } from "@/components/product-detail-modal"

interface ProductModalContextType {
  openProductModal: (product: Product) => void
  closeProductModal: () => void
}

const ProductModalContext = createContext<ProductModalContextType>({
  openProductModal: () => {},
  closeProductModal: () => {},
})

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsOpen(true)
  }

  const closeProductModal = () => {
    setIsOpen(false)
  }

  return (
    <ProductModalContext.Provider
      value={{
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
      <ProductDetailModal product={selectedProduct} isOpen={isOpen} onClose={closeProductModal} />
    </ProductModalContext.Provider>
  )
}

export function useProductModal() {
  const context = useContext(ProductModalContext)

  if (!context) {
    throw new Error("useProductModal must be used within a ProductModalProvider")
  }

  return context
}

