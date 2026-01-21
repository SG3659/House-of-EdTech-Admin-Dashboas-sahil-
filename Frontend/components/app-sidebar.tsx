"use client"

import { Car, LayoutDashboard, LogOut, Activity } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Listings",
    url: "/dashboard/listings",
    icon: Car,
  },
  {
    title: "Audit Logs",
    url: "/dashboard/audit",
    icon: Activity,
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()



  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <Car className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{user?.user.name}</p>
              <p className="text-xs text-muted-foreground">{user?.user.email}</p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
