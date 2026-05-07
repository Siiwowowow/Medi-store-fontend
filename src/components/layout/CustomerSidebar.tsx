/* eslint-disable react-hooks/set-state-in-effect */
// src/components/layout/CustomerSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  ShoppingBag, 
  Heart, 
  LogOut,
  Home,
  Bell,
  Package,
  Truck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getCustomerOrders, getCustomerWishlist, getCustomerCart } from "@/services/customer.service";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const navItems = [
  { section: "MAIN", items: [{ name: "Dashboard", icon: LayoutDashboard, path: "/customer/dashboard" }] },
  { 
    section: "SHOPPING", 
    items: [
      { name: "My Cart", icon: ShoppingBag, path: "/customer/cart", badge: "cart" },
      { name: "Wishlist", icon: Heart, path: "/customer/wishlist", badge: "wishlist" },
    ] 
  },
  { 
    section: "ORDERS", 
    items: [
      { name: "All Orders", icon: Package, path: "/customer/orders", badge: "orders" },
      { name: "Track Order", icon: Truck, path: "/customer/orders?status=shipped" },
    ] 
  },
  { 
    section: "ACCOUNT", 
    items: [
      { name: "Profile", icon: User, path: "/customer/profile" },
      { name: "Settings", icon: Settings, path: "/customer/settings" },
    ] 
  },
];

export default function CustomerSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [counts, setCounts] = useState({ orders: 0, wishlist: 0, cart: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchCounts = async () => {
      try {
        const [orders, wishlist, cart] = await Promise.all([
          getCustomerOrders(),
          getCustomerWishlist(),
          getCustomerCart()
        ]);
        setCounts({
          orders: orders?.orders?.length || 0,
          wishlist: wishlist?.length || 0,
          cart: cart?.items?.length || 0
        });
      } catch (error) {
        console.error("Failed to fetch sidebar counts:", error);
      }
    };
    fetchCounts();
  }, []);

  const isActive = (path: string) => {
    if (path.includes("?status")) {
      const basePath = path.split("?")[0];
      return pathname === basePath;
    }
    return pathname === path || pathname?.startsWith(path + "/");
  };

  if (!mounted) return null;

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
        isCollapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#063c28] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 cursor-pointer hidden lg:flex"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div className={cn("px-5 pt-6 pb-4 border-b border-gray-50 flex items-center", isCollapsed ? "justify-center px-0" : "gap-3")}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#063c28] to-[#0a5a3c] flex items-center justify-center shrink-0 shadow-md">
          <span className="text-white text-lg font-black tracking-tighter italic">M</span>
        </div>
        {!isCollapsed && (
          <div className="animate-in fade-in duration-500">
            <span className="text-[#063c28] text-xl font-black tracking-tight leading-none block">MediStore</span>
            <span className="text-[10px] text-[#fb6c08] font-bold uppercase tracking-widest mt-0.5 block">Health Companion</span>
          </div>
        )}
      </div>

      {/* User Card */}
      <div className={cn("px-4 py-4 border-b border-gray-50 bg-gray-50/30", isCollapsed ? "px-0 flex justify-center" : "")}>
        <div className={cn("flex items-center", isCollapsed ? "flex-col gap-2" : "gap-3")}>
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-xl bg-[#fcf0e4] flex items-center justify-center text-[#063c28] font-black text-base">
                {user?.name?.charAt(0) || "C"}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-2">
              <p className="text-sm font-bold text-gray-900 truncate tracking-tight">{user?.name || "Customer"}</p>
              <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#063c28]/5 mt-1">
                <span className="text-[#063c28] text-[9px] font-bold tracking-tight">Verified Patient</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar space-y-4">
        {navItems.map((section, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-black uppercase tracking-[.2em] text-gray-400">
                {section.section}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={i}
                    href={item.path}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden",
                      active 
                        ? "bg-[#063c28] text-white shadow-md shadow-[#063c28]/10" 
                        : "text-gray-600 hover:bg-gray-100/80 hover:text-[#063c28]",
                      isCollapsed ? "justify-center px-0" : ""
                    )}
                  >
                    <Icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", active ? "text-white" : "text-gray-400 group-hover:text-[#063c28]")} />
                    {!isCollapsed && (
                      <span className="text-[13.5px] font-semibold tracking-tight">{item.name}</span>
                    )}
                    
                    {item.badge && (
                      <span className={cn(
                        "rounded-full flex items-center justify-center font-bold transition-all",
                        isCollapsed 
                          ? "absolute top-1 right-1 w-4 h-4 text-[8px]" 
                          : "ml-auto px-2 py-0.5 text-[10px]",
                        active ? "bg-white text-[#063c28]" : "bg-[#fb6c08] text-white"
                      )}>
                        {item.badge === "cart" ? counts.cart : item.badge === "wishlist" ? counts.wishlist : counts.orders}
                      </span>
                    )}

                    {active && !isCollapsed && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#fb6c08]"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className={cn("p-4 border-t border-gray-50 space-y-1.5", isCollapsed ? "px-0 flex flex-col items-center" : "")}>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all group"
        >
          <Home className="w-5 h-5 shrink-0 group-hover:scale-110" />
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Back to Shop</span>}
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all group"
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:scale-110" />
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Log Out</span>}
        </button>
      </div>
    </aside>
  );
}