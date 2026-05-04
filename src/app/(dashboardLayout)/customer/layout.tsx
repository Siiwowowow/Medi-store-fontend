/* eslint-disable react-hooks/set-state-in-effect */
// src/app/(dashboardLayout)/customer/layout.tsx

"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CustomerSidebar from "@/components/layout/CustomerSidebar";
import { Menu, Search, ShoppingBag, Bell, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && mounted) {
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.role !== "CUSTOMER") {
        router.push("/");
        return;
      }
    }
  }, [user, isLoading, router, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
        <div className="w-10 h-10 border-2 border-[#063c28] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== "CUSTOMER") {
    return null;
  }

  const getPageTitle = () => {
    if (pathname?.includes("/dashboard")) return "Dashboard";
    if (pathname?.includes("/profile")) return "My Profile";
    if (pathname?.includes("/orders")) return "My Orders";
    if (pathname?.includes("/wishlist")) return "Wishlist";
    if (pathname?.includes("/reviews")) return "My Reviews";
    if (pathname?.includes("/cart")) return "My Shopping Cart";
    return "Customer Panel";
  };

  const getBreadcrumb = () => {
    const segments = pathname?.split("/").filter(Boolean) || [];
    if (segments.length <= 1) return "Customer / Dashboard";
    const lastSegment = segments[segments.length - 1];
    return `Customer / ${lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}`;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <CustomerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 w-[260px] h-full lg:hidden animate-slide-in-right">
            <CustomerSidebar isCollapsed={false} setIsCollapsed={() => {}} />
          </div>
        </>
      )}

      {/* Topbar */}
      <header 
        className={cn(
          "fixed right-0 top-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-30 transition-all duration-300",
          isCollapsed ? "left-[80px]" : "left-0 lg:left-[260px]"
        )}
      >
        <div className="px-4 lg:px-6 flex items-center justify-between h-full">
          {/* Left - Mobile Menu Button + Page Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h1 className="text-[17px] font-black text-[#151515] tracking-tight">{getPageTitle()}</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{getBreadcrumb()}</p>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-3 h-10 text-[13px] text-gray-500 hover:bg-gray-100 transition-colors border border-gray-100">
              <Search className="w-4 h-4" />
              <span>Search medicines...</span>
              <kbd className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-100 ml-2">⌘K</kbd>
            </button>

            {/* Notification Bell */}
            <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100">
              <Bell className="w-4 h-4 text-gray-500" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#fb6c08] rounded-full ring-2 ring-white"></span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-100 hidden md:block mx-1"></div>

            {/* User Avatar + Name */}
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-all border border-transparent hover:border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-[#fcf0e4] flex items-center justify-center border border-[#fb6c08]/20">
                <span className="text-[#063c28] font-black text-sm">
                  {user?.name?.charAt(0) || "C"}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[12px] font-black text-[#151515] leading-none">
                  {user?.name?.split(" ")[0] || "Customer"}
                </p>
                <p className="text-[9px] text-[#fb6c08] font-bold uppercase mt-0.5 tracking-tighter">Gold Member</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          isCollapsed ? "lg:pl-[80px]" : "lg:pl-[260px]"
        )}
      >
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}