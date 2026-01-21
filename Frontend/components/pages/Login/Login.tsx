"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Car } from "lucide-react"
import { useNotification } from "@/contexts/notification-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { addNotification } = useNotification()
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@example\.com$/.test(email);
  const minLength = 8;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    // const validateCrentials = validateCredentials(email, password)
    // if (validateCrentials && validateCrentials.message) {
    //   addNotification({
    //     type: "error",
    //     title: "Validation Error",
    //     message: validateCrentials.message,
    //   })
    //   return
    // }
    if (!isValidEmail) {
      addNotification({
        type: "error",
        title: "Invalid Email",
        message: "Please use a work email",
      })
    }

    if (password.length < minLength) {
      addNotification({
        type: "error",
        title: "Invalid Password",
        message: `Password must be at least ${minLength} characters long.`,
      })
    }

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
      addNotification({
        type: "success",
        title: "Login Successful",
        message: "Welcome to the Admin Dashboard!",
      })
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Car className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <CardDescription>Sign in to manage car rental listings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo credentials:</strong>
              <br />
              Email: admin@example.com
              <br />
              Password: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
