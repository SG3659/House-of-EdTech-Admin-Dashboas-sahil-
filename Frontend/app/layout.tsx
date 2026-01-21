import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NotificationProvider } from "@/contexts/notification-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Notifications } from "@/components/notifications"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard - Car Rental Management",
  description: "Internal dashboard for managing car rental listings",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <AuthProvider>
          <NotificationProvider>
            <Notifications />
            {children}
          </NotificationProvider>
        </AuthProvider>

      </body>
    </html>
  )
}
