"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { users, type User } from "@/lib/data"

interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UpdateProfileData {
  name?: string
  avatar?: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: UpdateProfileData) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
})

const USER_STORAGE_KEY = "PhilCart-user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(USER_STORAGE_KEY)
      }
    }
  }, [user, isInitialized])

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid credentials")
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
  }

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    // In a real app, we would make an API call to create the user
    // For this demo, we'll just simulate it
    const newUser: User = {
      id: `u${users.length + 1}`,
      name,
      email,
      password,
    }

    users.push(newUser)

    // Don't log in the user automatically after signup
    // They need to login with their credentials
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (data: UpdateProfileData) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!user) {
      throw new Error("Not authenticated")
    }

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)

    // In a real app, we would make an API call to update the user
    // For this demo, we'll just update the local state
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

