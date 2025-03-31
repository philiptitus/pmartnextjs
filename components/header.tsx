"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { CartDropdown } from "@/components/cart-dropdown"
import { FavoritesDropdown } from "@/components/favorites-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/" className="text-primary text-2xl font-bold flex items-center">
              <Image
                src="https://www.svgrepo.com/show/247531/recycle-trash.svg"
                alt="PhilCart"
                width={40}
                height={40}
                className="mr-2"
              />
              PhilCart
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/shop" className="text-foreground hover:text-primary">
                Shop
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center">
              <ThemeToggle />
              <FavoritesDropdown />
              <CartDropdown />
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4 border-b">
                      <Link
                        href="/"
                        className="text-primary text-xl font-bold flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Image
                          src="https://www.svgrepo.com/show/247531/recycle-trash.svg"
                          alt="PhilCart"
                          width={30}
                          height={30}
                          className="mr-2"
                        />
                        PhilCart
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="py-4">
                      <SearchBar />
                    </div>
                    <nav className="flex flex-col space-y-4 py-4">
                      <Link
                        href="/"
                        className="text-foreground hover:text-primary px-2 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        href="/shop"
                        className="text-foreground hover:text-primary px-2 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Shop
                      </Link>
                      <Link
                        href="/contact"
                        className="text-foreground hover:text-primary px-2 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

