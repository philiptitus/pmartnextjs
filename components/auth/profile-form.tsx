"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ProfileFormProps {
  onClose: () => void
}

export function ProfileForm({ onClose }: ProfileFormProps) {
  const { user, updateProfile, logout } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSuccess(false)
    setIsLoading(true)

    try {
      await updateProfile({ name })
      setIsSuccess(true)
    } catch (err) {
      setError("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!user) return null

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
          <Image
            src={user.avatar || "/placeholder.svg?height=100&width=100"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert className="bg-primary/10 text-primary border-primary">
            <AlertDescription>Profile updated successfully</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
          <Button type="button" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </form>
    </div>
  )
}

