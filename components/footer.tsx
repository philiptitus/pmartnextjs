"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Loader } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1500)
  }

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center">
              <Image
                src="https://www.svgrepo.com/show/247531/recycle-trash.svg"
                alt="PhilCart"
                width={40}
                height={40}
                className="mr-2"
              />
              <h3 className="text-xl font-bold">PhilCart</h3>
            </div>
            <p className="text-primary-foreground/80 mb-4 mt-2">Crafting Digital Excellence for all things tech</p>
            <div className="flex space-x-3">
              <a href="https://www.mrphilip.cv/" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-4 py-2 rounded-md flex items-center text-sm">
                <span className="mr-2">Website</span>
              </a>
              <a href="https://linkedin.com/in/philiptitus" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-4 py-2 rounded-md flex items-center text-sm">
                <span className="mr-2">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/" className="hover:text-primary-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-primary-foreground">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-foreground">
                    Contact Me
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-bold mb-4">Subscribe to Newsletter</h4>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground mb-4">
                    You have successfully subscribed to the newsletter.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="bg-black text-white px-4 py-2 rounded-md">
                    Subscribe Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 mb-2 border border-primary-foreground/20 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : "Subscribe"}
                  </button>
                </form>
              )}
            </div> */}
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm mb-4 md:mb-0">© {currentYear} Philip Titus. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="https://www.mrphilip.cv/privacy/" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}