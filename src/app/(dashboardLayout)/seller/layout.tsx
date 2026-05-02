// src/app/(dashboardLayout)/seller/layout.tsx

"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import SellerSidebar from "@/components/layout/SellerSideBar";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isSellerApproved } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push("/login");
      else if (user.role !== "SELLER") router.push("/");
      else if (!isSellerApproved && pathname !== "/seller/pending-approval") 
        router.push("/seller/pending-approval");
      else if (isSellerApproved && pathname === "/seller/pending-approval")
        router.push("/seller/dashboard");
    }
  }, [user, isLoading, isSellerApproved, router, pathname]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== "SELLER") return null;

  // Pending approval page renders full-screen without sidebar
  const isPendingPage = pathname === "/seller/pending-approval";
  if (!isSellerApproved && isPendingPage) {
    return <>{children}</>;
  }

  // Block all other pages for unapproved sellers
  if (!isSellerApproved) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerSidebar />
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 z-50 lg:hidden">
            <SellerSidebar />
          </div>
        </>
      )}

      <main className="lg:ml-[260px] min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}