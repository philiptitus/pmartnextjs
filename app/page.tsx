"use client"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/product-carousel"
import { CategorySection } from "@/components/category-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">SHORT CONTRACTS</h1>
              <p className="text-lg text-muted-foreground mb-6">
                You can directly buy my services for short term tasks
              </p>
              <Link href="/shop">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://izpkijnmscmbolveusoo.supabase.co/storage/v1/object/public/Galleria/Portfolio/cropped_image.png"
                alt="Smart Watch"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Products</h2>
          <ProductCarousel />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Shop by Category</h2>
          <CategorySection />
        </div>
      </section>

      <Footer />
    </div>
  )
}

