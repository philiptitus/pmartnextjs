'use client'

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { featuredProducts, isLoading, error, fetchFeaturedProducts } = useStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!featuredProducts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No featured products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
} 