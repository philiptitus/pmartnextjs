"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, X, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProductModal } from "@/components/product-modal-provider";
import { getProductById } from "@/lib/data";

export function FavoritesDropdown() {
  const [open, setOpen] = useState(false);
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const { openModal } = useProductModal();

  const totalFavorites = favorites.length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-6 w-6" />
          {totalFavorites > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalFavorites}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <h3 className="font-medium text-lg mb-4">Your Favorites</h3>
          {favorites.length === 0 ? (
            <div className="text-center py-6">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Your favorites list is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[300px] overflow-auto mb-4">
                {favorites.map((productId) => {
                  const product = getProductById(productId);
                  if (!product) return null;
                  return (
                    <div key={product.id} className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-md flex-shrink-0 relative cursor-pointer"
                        style={{ backgroundColor: product.color }}
                        onClick={() => {
                          openModal(product);
                          setOpen(false);
                        }}
                      >
                        <Image
                          src={product.images[0]?.url || "/placeholder.svg"} // Use image.url
                          alt={product.images[0]?.alt_text || product.name} // Use image.alt_text
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => {
                          openModal(product);
                          setOpen(false);
                        }}
                      >
                        <h4 className="font-medium text-sm truncate">{product.name}</h4>
                        <p className="text-primary text-sm font-medium">${product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                            });
                            removeFavorite(product.id);
                          }}
                          className="text-gray-500 hover:text-primary"
                          title="Add to cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFavorite(product.id)}
                          className="text-gray-500 hover:text-primary"
                          title="Remove from favorites"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}