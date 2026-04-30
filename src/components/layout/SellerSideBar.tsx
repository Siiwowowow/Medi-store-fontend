"use client"

import { 
  IconCategory, 
  IconListDetails, 
  IconLogout, 
  IconPackages, 
  IconPlus, 
  IconUser, 
  IconBuilding, 
  IconHome,
  IconDashboard,      // 👈 NEW
  IconAlertCircle,    // 👈 NEW (Low Stock)
  IconShoppingCart,   // 👈 NEW
  IconChartBar,       // 👈 NEW (Analytics)
  IconSettings        // 👈 NEW
} from "@tabler/icons-react"
import Link from "next/link"

import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"
import { usePathname, useSearchParams } from "next/navigation"
import { useAuth } from "@/providers/AuthProvider"

export default function SellerSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { logout } = useAuth()

  // Helper function to check active state including query params
  const isActive = (path: string, query?: string) => {
    if (query) {
      return pathname === path && searchParams.toString() === query
    }
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconBuilding size={20} />
          </div>
          <span className="truncate">Seller Panel</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* MAIN SECTION */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/seller/dashboard"}>
              <Link href="/seller/dashboard">
                <IconDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* MEDICINE MANAGEMENT SECTION */}
        <div className="px-3 py-2">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Medicine Management
          </h4>
          <SidebarMenu>
            {/* All Medicines */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/medicines"}>
                <Link href="/seller/medicines">
                  <IconPackages size={20} />
                  <span>All Medicines</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Add New Medicine */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/medicines/new"}>
                <Link href="/seller/medicines/new">
                  <IconPlus size={20} />
                  <span>Add Medicine</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Low Stock */}
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/seller/medicines" && searchParams.get("filter") === "low-stock"}
              >
                <Link href="/seller/medicines?filter=low-stock">
                  <IconAlertCircle size={20} />
                  <span>Low Stock</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Categories */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/categories"}>
                <Link href="/seller/categories">
                  <IconCategory size={20} />
                  <span>Categories</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* ORDER MANAGEMENT SECTION */}
        <div className="px-3 py-2">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Order Management
          </h4>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/orders"}>
                <Link href="/seller/orders">
                  <IconShoppingCart size={20} />
                  <span>All Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {/* Filtered Order Links */}
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/seller/orders" && searchParams.get("status") === "pending"}
              >
                <Link href="/seller/orders?status=pending">
                  <IconListDetails size={20} />
                  <span>Pending Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/seller/orders" && searchParams.get("status") === "processing"}
              >
                <Link href="/seller/orders?status=processing">
                  <IconListDetails size={20} />
                  <span>Processing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/seller/orders" && searchParams.get("status") === "shipped"}
              >
                <Link href="/seller/orders?status=shipped">
                  <IconListDetails size={20} />
                  <span>Shipped</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="px-3 py-2">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Analytics
          </h4>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/analytics"}>
                <Link href="/seller/analytics">
                  <IconChartBar size={20} />
                  <span>Revenue Report</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* PROFILE SECTION */}
        <div className="px-3 py-2">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Account
          </h4>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/profile"}>
                <Link href="/seller/profile">
                  <IconUser size={20} />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/seller/settings"}>
                <Link href="/seller/settings">
                  <IconSettings size={20} />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      {/* FOOTER ACTIONS */}
      <SidebarMenu className="p-4 border-t gap-2">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="text-primary hover:text-primary hover:bg-primary/10">
            <Link href="/">
              <IconHome size={20} />
              <span>Go to Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton 
            onClick={logout} 
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <IconLogout size={20} />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  )
}