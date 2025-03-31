"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/app/store/actions";
import { RootStateType } from "@/app/store/reducers";
import { cn } from "@/lib/utils";
import { useProductModal } from "@/components/product-modal-provider";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products: results } = useSelector((state: RootStateType) => state.products);
  const { openModal } = useProductModal();

  useEffect(() => {
    if (query.trim().length > 1) {
      dispatch(searchProducts(query)); // Dispatch the search action
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleProductClick = (productId: string) => {
    const product = results.find((p) => p.id === productId);
    if (product) {
      openModal(product);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "border rounded-md py-2 px-4 pl-10 w-full md:w-64 focus:outline-none transition-all",
            isFocused || isOpen ? "border-primary ring-2 ring-primary/20" : "border-gray-300 dark:border-gray-700"
          )}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-[400px] overflow-auto"
        >
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div
                    className="w-10 h-10 rounded-md flex-shrink-0 relative"
                    style={{ backgroundColor: product.color }}
                  >
                    <img
                      src={product.images[0]?.url || "/placeholder.svg"} // Use image.url
                      alt={product.images[0]?.alt_text || product.name} // Use image.alt_text
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product.name}</h4>
                    <p className="text-primary text-sm font-medium">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}