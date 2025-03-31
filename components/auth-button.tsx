"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth/auth-modal"

export function AuthButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(true)} className="relative">
        <User className="h-6 w-6" />
        {user && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-3 h-3" />
        )}
      </Button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

