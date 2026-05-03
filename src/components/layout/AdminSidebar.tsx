// src/components/admin/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  Pill,
  ShoppingBag,
  Tags,
  Settings,
  Shield,
  LogOut,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  {
    section: "CORE",
    items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }],
  },
  {
    section: "PEOPLE",
    items: [
      { name: "All Users", icon: Users, path: "/admin/users" },
      { name: "Sellers", icon: Store, path: "/admin/sellers" },
      { name: "Pending Approval", icon: UserCheck, path: "/admin/sellers/pending", orange: true },
    ],
  },
  {
    section: "COMMERCE",
    items: [
      { name: "Medicines", icon: Pill, path: "/admin/medicines" },
      { name: "Categories", icon: Tags, path: "/admin/categories" },
      { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    ],
  },
  {
    section: "ANALYTICS",
    items: [
      { name: "Revenue", icon: TrendingUp, path: "/admin/revenue" },
      { name: "Risk Reports", icon: AlertTriangle, path: "/admin/risk" },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { name: "Settings", icon: Settings, path: "/admin/settings" },
      { name: "Audit Logs", icon: Shield, path: "/admin/audit" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-shop_dark_green flex flex-col shadow-2xl transition-all duration-300",
      isCollapsed ? "w-[72px]" : "w-[256px]"
    )}>
      {/* Logo Section */}
      <div className={cn(
        "px-5 pt-6 pb-5 border-b border-white/10 flex items-center",
        isCollapsed ? "justify-center px-3" : "justify-between"
      )}>
        <div className={cn("flex items-center gap-2.5", isCollapsed && "justify-center")}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-[8px] bg-shop_orange/20 flex items-center justify-center flex-shrink-0"
          >
            <span className="text-shop_orange text-sm font-bold">M</span>
          </motion.div>
          {!isCollapsed && (
            <div>
              <Link href={"/"}>
                <span className="text-white text-base font-bold">MediStore</span>
                <p className="text-[9px] text-white uppercase tracking-wider">Admin Panel</p>
              </Link>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/40 hover:text-white/80 transition-colors"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

     

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        {navItems.map((section, idx) => (
          <div key={idx} className="mb-5">
            {!isCollapsed && (
              <div className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[.14em] text-white">
                {section.section}
              </div>
            )}
            {section.items.map((item, i) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5 relative group",
                    active
                      ? "bg-shop_orange/12 text-white"
                      : "text-white  hover:text-white",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : ""}
                >
                  {active && !isCollapsed && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-shop_orange rounded-r-full"
                    />
                  )}
                  <Icon
                    className={cn(
                      "w-[17px] h-[17px] flex-shrink-0 transition-colors",
                      active ? "text-shop_orange" : "text-white  group-hover:text-white/60"
                    )}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="text-[13px] font-medium">{item.name}</span>
                      {item.orange && (
                        <span className="ml-auto text-[9px] font-bold bg-shop_orange text-white px-1.5 py-0.5 rounded-full animate-pulse">
                          !
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={cn("p-4 border-t border-white/10", isCollapsed && "px-3")}>
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Sign Out" : ""}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}