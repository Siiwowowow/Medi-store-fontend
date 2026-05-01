/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/seller/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Pill, 
  PlusCircle, 
  ShoppingBag, 
  Store, 
  Lock, 
  LogOut,
  Home,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface NavItem {
  name: string;
  icon: any;
  path: string;
  orangeIcon?: boolean;
  badge?: boolean;
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/seller/dashboard" },
  { name: "My Medicines", icon: Pill, path: "/seller/medicines" },
  { name: "Add Medicine", icon: PlusCircle, path: "/seller/medicines/add", orangeIcon: true },
  { name: "Incoming Orders", icon: ShoppingBag, path: "/seller/orders", badge: true },
  { name: "Shop Profile", icon: Store, path: "/seller/profile" },
  { name: "Change Password", icon: Lock, path: "/seller/change-password" },
];

function SellerSidebarComponent() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const pendingOrdersCount = 3;

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] bg-white border-r border-gray-100 flex flex-col">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#063c28] flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="text-[#063c28] text-lg font-bold">MediStore</span>
        </div>
      </div>

      {/* User Card */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fcf0e4] flex items-center justify-center">
            <span className="text-[#063c28] font-bold text-sm">
              {user?.name?.charAt(0) || "S"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Seller"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            <span className="inline-block text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1">
              Seller
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Dashboard Section */}
        <div className="mb-6">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            MAIN
          </div>
          {navItems.slice(0, 1).map((item, i) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={i}
                href={item.path}
                prefetch={true}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5",
                  active ? "bg-[#063c28] text-white" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cn("w-5 h-5", active ? "text-white" : "text-gray-400")} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Inventory Section */}
        <div className="mb-6">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            INVENTORY
          </div>
          {navItems.slice(1, 3).map((item, i) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={i}
                href={item.path}
                prefetch={true}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5",
                  active ? "bg-[#063c28] text-white" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5", 
                  active ? "text-white" : "text-gray-400",
                  item.orangeIcon && !active && "text-[#fb6c08]"
                )} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Orders Section */}
        <div className="mb-6">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            ORDERS
          </div>
          {navItems.slice(3, 4).map((item, i) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={i}
                href={item.path}
                prefetch={true}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5",
                  active ? "bg-[#063c28] text-white" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cn("w-5 h-5", active ? "text-white" : "text-gray-400")} />
                <span className="text-sm font-medium">{item.name}</span>
                {item.badge && pendingOrdersCount > 0 && (
                  <span className="ml-auto w-5 h-5 bg-[#fb6c08] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {pendingOrdersCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            ACCOUNT
          </div>
          {navItems.slice(4, 6).map((item, i) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={i}
                href={item.path}
                prefetch={true}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5",
                  active ? "bg-[#063c28] text-white" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cn("w-5 h-5", active ? "text-white" : "text-gray-400")} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section - Home Button & Sign Out */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        {/* Home Button - Go to Main Website */}
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">Go to Home</span>
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(SellerSidebarComponent);