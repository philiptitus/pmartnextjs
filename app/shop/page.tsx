"use client";

import type React from "react";
import { fetchProducts, fetchCategories } from "@/app/store/actions";
import type { AppDispatch, RootStateType } from "@/app/store/store";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";

export default function ShopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products: productsData = [], loading: productsLoading, error: productsError, totalPages } = useSelector(
    (state: RootStateType) => state.products
);
  const { categories: categoriesData = [], loading: categoriesLoading, error: categoriesError } = useSelector(
    (state: RootStateType) => state.categories
  );
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");
  const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    dispatch(fetchCategories());

  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchProducts(currentPage, selectedCategories, sortOption)); // Fetch products for the current page, categories, and sort option
  }, [dispatch, currentPage, selectedCategories, sortOption]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };



    useEffect(() => {
    if (!productsLoading) {
      setIsFetching(false);
    }
  }, [productsLoading]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Start with the products from the API
    let result = [...productsData];

    // Apply price filter (client-side only)
    result = result.filter((product) => {
      const productPrice = parseFloat(product.price);
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });

    // Apply other filters
    if (currentSearchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(currentSearchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        if (typeof product.category === "object" && product.category.id) {
          return selectedCategories.includes(product.category.id);
        }
        return selectedCategories.includes(product.category);
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high-low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [productsData, currentSearchQuery, selectedCategories, priceRange, sortOption]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
        prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
    setCurrentPage(1); // Reset to the first page
};

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortOption("featured");
    setCurrentSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {productsLoading || categoriesLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : productsError || categoriesError ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Error loading data</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg shadow-sm p-4 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-sm">
                    Clear All
                  </Button>
                </div>

                <Accordion type="multiple" defaultValue={["categories", "price"]}>
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categoriesData?.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryChange(category.id)}
                            />
                            <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={handlePriceChange}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">$</span>
                            <Input
                              type="number"
                              value={priceRange[0]}
                              onChange={(e) =>
                                setPriceRange([Number.parseInt(e.target.value), priceRange[1]])
                              }
                              className="w-20 h-8 text-sm"
                            />
                          </div>
                          <span className="text-sm">to</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">$</span>
                            <Input
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
                              }
                              className="w-20 h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold mb-2 sm:mb-0">
                  {currentSearchQuery ? `Search results for "${currentSearchQuery}"` : "All Products"}
                </h1>

                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border rounded-md text-sm p-1 bg-background"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>

          
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>

      <Footer />
    </div>
  );
}

