import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "P-Mart",
  description: "Find Tech Services Easily",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
            <head>
        <link rel="icon" href="https://www.svgrepo.com/show/247531/recycle-trash.svg"  />
      </head>
      <body className={inter.className}>
          <Providers>
        
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'