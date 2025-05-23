"use client"

import { type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const location = useLocation()

  // Split items into platform and admin sections
  const platformItems = items.filter(
    (item) =>
      item.title !== "User Management" &&
      item.title !== "Stock Management"
  )

  const adminItems = items.filter(
    (item) =>
      item.title === "User Management" ||
      item.title === "Stock Management"
  )

  const renderGroup = (label: string, groupItems: typeof items) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {groupItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.url

          return (
            <SidebarMenuItem key={item.title} className={isActive ? "active" : ""}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link to={item.url} className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )

  return (
    <>
      {renderGroup("Platform", platformItems)}
      {adminItems.length > 0 && renderGroup("Admin", adminItems)}
    </>
  )
}
