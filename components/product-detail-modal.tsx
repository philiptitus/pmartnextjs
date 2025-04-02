"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, Star, ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { type Product } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import { useFavorites } from "@/components/favorites-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!product) return null;

  const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      images: product.images,
    });
    onClose();
  };

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        color: product.color,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-auto max-h-[90vh] sm:max-h-[95vh]">
        <DialogTitle className="sr-only">Product Details: {product.name}</DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:text-gray-900 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-fit">
          {/* Product Images */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6">
            <div className="relative h-64 md:h-80 mb-4">
              <Image
                src={product.images[activeImage]?.url || "/placeholder.svg"}
                alt={product.images[activeImage]?.alt_text || product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "border-2 rounded w-16 h-16 flex-shrink-0 relative",
                    activeImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600",
                  )}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt_text || `${product.name} - Image ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            <div className="mb-4">
              {product.isNew && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">New</span>
              )}
              <h2 className="text-2xl font-bold text-foreground mb-1">{product.name}</h2>
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground",
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-primary mr-2">${product.price}</span>
              </div>
              <p className="text-foreground mb-4">{product.description}</p>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Features:</p>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 text-gray-600 hover:text-primary"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 text-gray-600 hover:text-primary"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground ml-4">{product.stock} available</span>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={cn(isFav ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" : "")}
                >
                  <Heart className={cn("h-4 w-4", isFav ? "fill-red-500 text-red-500" : "")} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}