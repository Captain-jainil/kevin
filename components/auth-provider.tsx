"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  phone: string
  role: "patient" | "doctor" | "admin"
  village?: string
  specialization?: string
  verified: boolean
}

interface AuthContextType {
  user: User | null
  login: (phone: string, password: string, role: "patient" | "doctor") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const storedUser = localStorage.getItem("rural-health-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (phone: string, password: string, role: "patient" | "doctor"): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on role
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === "patient" ? "Ram Kumar" : "Dr. Simran Kaur",
      phone,
      role,
      village: role === "patient" ? "Nabha" : undefined,
      specialization: role === "doctor" ? "General Medicine" : undefined,
      verified: true,
    }

    setUser(mockUser)
    localStorage.setItem("rural-health-user", JSON.stringify(mockUser))
    setIsLoading(false)

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rural-health-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
