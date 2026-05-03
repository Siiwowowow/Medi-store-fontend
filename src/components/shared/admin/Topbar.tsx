// src/components/admin/Topbar.tsx

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Command, Bell, User, ShieldCheck, ChevronDown, Pill, ShoppingBag, Store, Tags, Users } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === "Escape" && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen]);

  const getPageTitle = () => {
    if (pathname?.includes("/dashboard")) return "Dashboard";
    if (pathname?.includes("/sellers/pending")) return "Pending Seller Approvals";
    if (pathname?.includes("/sellers")) return "Sellers Management";
    if (pathname?.includes("/users")) return "User Management";
    if (pathname?.includes("/medicines")) return "Medicine Catalog";
    if (pathname?.includes("/orders")) return "Order Management";
    if (pathname?.includes("/categories")) return "Categories";
    return "Admin Panel";
  };

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-[256px] right-0 h-[64px] bg-white border-b-[1.5px] border-gray-200 z-30">
        <div className="px-6 flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden w-9 h-9 rounded-[8px] bg-shop_light_bg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <motion.h1
                key={getPageTitle()}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[18px] font-bold text-darkColor"
              >
                {getPageTitle()}
              </motion.h1>
              <p className="text-[11px] text-lightColor mt-0.5">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-[8px] bg-shop_light_bg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Bell className="w-4 h-4 text-lightColor" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-shop_orange rounded-full animate-pulse" />
            </button>

            <div className="w-px h-5 bg-gray-200" />

            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-shop_dark_green flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-[13px] font-semibold text-darkColor">{user?.name || "Admin"}</p>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-shop_orange" />
                  <span className="text-[9px] text-lightColor">{user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}</span>
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-lightColor hidden md:block" />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isCommandPaletteOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setIsCommandPaletteOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[600px] max-w-[90vw]"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <Command className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search commands..."
                    className="flex-1 outline-none text-sm text-darkColor"
                    autoFocus
                  />
                  <kbd className="text-[10px] text-lightColor bg-gray-100 px-2 py-1 rounded">ESC</kbd>
                </div>
                <div className="p-2 max-h-[400px] overflow-y-auto">
                  <p className="text-[10px] font-bold uppercase text-gray-400 px-3 py-2">Quick Actions</p>
                  <div className="space-y-1">
                    {[
                      { icon: Users, label: "View All Users", path: "/admin/users" },
                      { icon: Store, label: "Pending Seller Approvals", path: "/admin/sellers/pending", badge: "!" },
                      { icon: ShoppingBag, label: "Recent Orders", path: "/admin/orders" },
                      { icon: Pill, label: "Manage Medicines", path: "/admin/medicines" },
                      { icon: Tags, label: "Manage Categories", path: "/admin/categories" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.path}
                        onClick={() => setIsCommandPaletteOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] font-bold bg-shop_orange text-white px-2 py-0.5 rounded-full animate-pulse">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}