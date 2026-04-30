"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import SellerSideBar from "@/components/layout/SellerSideBar"
import { useAuth } from "@/providers/AuthProvider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isSellerApproved } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // No user -> login
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Not seller -> home
      if (user.role !== 'SELLER') {
        router.push('/');
        return;
      }
      
      // Seller approved -> allow access
      if (isSellerApproved) {
        // If on pending page, redirect to dashboard
        if (pathname === '/seller/pending-approval') {
          router.push('/seller/dashboard');
        }
        return;
      }
      
      // Seller not approved -> show pending page only
      if (!isSellerApproved && pathname !== '/seller/pending-approval') {
        router.push('/seller/pending-approval');
        return;
      }
    }
  }, [user, isLoading, isSellerApproved, router, pathname]);

  // ✅ Add logging for debugging
  useEffect(() => {
    if (!isLoading && user) {
      console.log(`[SellerLayout] User: ${user.name}, Role: ${user.role}, Approved: ${isSellerApproved}, Path: ${pathname}`);
    }
  }, [user, isLoading, isSellerApproved, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // If seller is not approved and on the pending page, allow rendering WITHOUT the sidebar
  if (user?.role === 'SELLER' && !isSellerApproved && pathname === '/seller/pending-approval') {
    return <>{children}</>;
  }

  // If not a seller or not approved (and not on pending page), don't render the dashboard layout
  // The useEffect above handles the redirect
  if (!user || user.role !== 'SELLER' || !isSellerApproved) {
    return null;
  }

  return (
    <SidebarProvider>
      <SellerSideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/seller/dashboard">Seller</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}