"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import { useFavorites } from "@/components/favorites-provider";
import { useProductModal } from "@/components/product-modal-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { openModal } = useProductModal();

  const isFav = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      color: product.color,
      image: product.images[0]?.url, // Use image.url
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFav) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openModal(product)}
    >
      <div
        className={cn(
          "rounded-lg p-4 flex items-center justify-center h-48 mb-4 relative overflow-hidden transition-all",
          isHovered ? "shadow-lg" : ""
        )}
        style={{ backgroundColor: product.color }}
      >
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
        <Image
          src={product.images[0]?.url || "/placeholder.svg"} // Use image.url
          alt={product.images[0]?.alt_text || product.name} // Use image.alt_text
          width={60}
          height={120}
          className="object-contain z-10"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-all",
            isHovered ? "bg-opacity-10 opacity-100" : ""
          )}
        >
          <div className="flex space-x-2">
            <Button size="icon" variant="secondary" className="rounded-full" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 text-primary" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full" onClick={handleToggleFavorite}>
              <Heart className={cn("w-5 h-5", isFav ? "fill-red-500 text-red-500" : "text-primary")} />
            </Button>
          </div>
        </div>
      </div>
      <h3 className="font-medium text-foreground">{product.name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-primary font-bold">${product.price}</p>
        {product.originalPrice && (
          <p className="text-muted-foreground line-through text-sm">${product.originalPrice}</p>
        )}
      </div>
    </div>
  );
}