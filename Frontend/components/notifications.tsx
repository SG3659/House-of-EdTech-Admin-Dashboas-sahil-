"use client"

import { useNotification } from "@/contexts/notification-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colorMap = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
}

export function Notifications() {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type]
        return (
          <Alert key={notification.id} className={`${colorMap[notification.type]} shadow-lg`}>
            <Icon className="h-4 w-4" />
            <AlertTitle className="flex items-center justify-between">
              {notification.title}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeNotification(notification.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertTitle>
            {notification.message && <AlertDescription>{notification.message}</AlertDescription>}
          </Alert>
        )
      })}
    </div>
  )
}
