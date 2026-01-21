"use client"

import type React from "react"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState } from "@/lib/auth"
import axiosConfig from "@/services/axiosConfig"

interface AuthContextType extends AuthState {
   login: (email: string, password: string) => Promise<boolean>
   logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {

      const savedUser = localStorage.getItem("admin-user")
      if (savedUser) {
         setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
   }, [])

   const login = async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true)

      try {
         const response = await axiosConfig.post("/api/user/login", {
            email,
            password,
         })
         if (response.status === 200) {
            const userData: User = response.data as User;
            setUser(userData);

            if (userData) {
               localStorage.setItem("admin-user", JSON.stringify(userData));
            }
            setIsLoading(false)
            return true
         } else {
            setIsLoading(false)
            return false
         }

      } catch (error) {
         console.error("Login failed:", error)
         setIsLoading(false)
         return false
      }
      // Simulate API call delay
      //  await new Promise((resolve) => setTimeout(resolve, 1000))

      //  if (email === "admin@example.com" && password === "admin123") {
      //    setUser(mockUser)
      //    localStorage.setItem("admin-user", JSON.stringify(mockUser))
      //    setIsLoading(false)
      //    return true
      //  }

      // setIsLoading(false)
      // return false
   }

   const logout = () => {
      setUser(null)
      localStorage.removeItem("admin-user")
   }

   return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
   const context = useContext(AuthContext)
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider")
   }
   return context
}
