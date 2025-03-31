// Place this code in: app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/components/cart-provider'
import { ProductModalProvider } from '@/components/product-modal-provider'
import { FavoritesProvider } from '@/components/favorites-provider'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import store from './store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Provider store={store}>

    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <FavoritesProvider>
        <CartProvider>
          <ProductModalProvider>
            <Toaster position="top-center" />
            {children}
          </ProductModalProvider>
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
    </Provider>
  )
}