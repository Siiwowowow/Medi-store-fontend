/* eslint-disable react-hooks/set-state-in-effect */
// src/app/(dashboardLayout)/admin/layout.tsx

"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminTopbar from "@/components/shared/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isLoading && mounted) {
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        router.push("/");
        return;
      }
    }
  }, [user, isLoading, router, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-shop_light_bg">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-shop_orange border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-shop_light_bg">
      <AdminSidebar />
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 z-50 lg:hidden"
            >
              <AdminSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AdminTopbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:ml-[256px] pt-[64px] min-h-screen"
      >
        <div className="p-6">{children}</div>
      </motion.main>
    </div>
  );
}