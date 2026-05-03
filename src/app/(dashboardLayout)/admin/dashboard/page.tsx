/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/admin/dashboard/page.tsx

"use client";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { Users, Store, Pill, ShoppingBag, DollarSign, TrendingUp, Tags, UserCheck, ArrowRight, Activity, FileText, Settings } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

// Shadcn UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Custom Shared
import { StatusBadge } from "@/components/shared/admin/StatusBadge";

export default function AdminDashboardPage() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = {
    totalUsers: data?.users?.total || 0,
    customers: data?.users?.customers || 0,
    totalSellers: data?.users?.sellers || 0,
    pendingSellers: data?.users?.pendingSellers || 0,
    totalMedicines: data?.products?.total || 0,
    totalOrders: data?.orders?.total || 0,
    totalRevenue: data?.revenue?.total || 0,
    pendingOrders: data?.orders?.pending || 0,
    completionRate: data?.orders?.completionRate || 0,
    growth: data?.revenue?.growth || "+0%",
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-shop_dark_green tracking-tight"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground mt-1"
          >
            Manage customers, sellers, products, and categories all in one place.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button className="bg-shop_orange hover:bg-[#e05d00] text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </motion.div>
      </div>

      {/* Primary Metrics (Shadcn Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <div className="p-2 bg-blue-50 rounded-md">
              <Users className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-shop_dark_green">{stats.customers}</div>
            <Link href="/admin/users" className="text-xs text-blue-500 hover:underline flex items-center mt-1">
              View all customers <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </CardContent>
        </Card>

        {/* Active Sellers */}
        <Card className="border-l-4 border-l-shop_light_green shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Sellers</CardTitle>
            <div className="p-2 bg-green-50 rounded-md">
              <Store className="w-4 h-4 text-shop_light_green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-shop_dark_green">{stats.totalSellers}</div>
            <Link href="/admin/sellers" className="text-xs text-shop_light_green hover:underline flex items-center mt-1">
              Manage sellers <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </CardContent>
        </Card>

        {/* Total Products/Medicines */}
        <Card className="border-l-4 border-l-purple-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Medicines</CardTitle>
            <div className="p-2 bg-purple-50 rounded-md">
              <Pill className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-shop_dark_green">{stats.totalMedicines}</div>
            <Link href="/admin/medicines" className="text-xs text-purple-500 hover:underline flex items-center mt-1">
              Control (Edit/Delete) <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="border-l-4 border-l-shop_orange shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <div className="p-2 bg-shop_light_pink rounded-md">
              <ShoppingBag className="w-4 h-4 text-shop_orange" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-shop_dark_green">{stats.totalOrders}</div>
            <Link href="/admin/orders" className="text-xs text-shop_orange hover:underline flex items-center mt-1">
              View all orders <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics / Management Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Categories Control */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Tags className="w-5 h-5 text-teal-500" />
              Categories
            </CardTitle>
            <CardDescription>Manage all medicine categories</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
              <Link href="/admin/categories">Manage Categories</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Seller Approvals */}
        <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
          {stats.pendingSellers > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
              {stats.pendingSellers} Pending
            </div>
          )}
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              Seller Approvals
            </CardTitle>
            <CardDescription>Review, approve or reject sellers</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline" className="w-full text-amber-600 border-amber-200 hover:bg-amber-50">
              <Link href="/admin/sellers/pending">Review Sellers</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Medicine Control */}
        <Card className="hover:shadow-md transition-shadow bg-shop_dark_green text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Settings className="w-5 h-5 text-shop_light_green" />
              Medicine Control
            </CardTitle>
            <CardDescription className="text-white/70">Full control: Get, Edit, Delete</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full bg-shop_light_green hover:bg-[#2d7d2d] text-white border-none">
              <Link href="/admin/medicines">Open Control Panel</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Two Column Layout for Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Recent Orders */}
        <Card className="lg:col-span-2 shadow-sm border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <CardTitle className="text-base text-shop_dark_green">Recent Orders</CardTitle>
              <CardDescription>Latest customer transactions</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-shop_orange hover:text-[#e05d00] hover:bg-shop_light_pink">
              <Link href="/admin/orders">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-shop_light_bg/50">
                <TableRow>
                  <TableHead className="text-xs uppercase text-muted-foreground">Order ID</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Customer</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Status</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.recentOrders?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                      No recent orders found.
                    </TableCell>
                  </TableRow>
                )}
                {data?.recentOrders?.slice(0, 5).map((order: any, idx: number) => (
                  <TableRow key={order.id} className="hover:bg-shop_light_bg/40">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{order.orderNumber?.slice(-8)}
                    </TableCell>
                    <TableCell className="font-medium text-shop_dark_green text-sm">
                      {order.customerName}
                    </TableCell>
                    <TableCell className="font-semibold text-shop_dark_green text-sm">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="link" size="sm" className="text-shop_orange p-0 h-auto">
                        <Link href={`/admin/orders/${order.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column - Pending Sellers & Status */}
        <div className="space-y-6">
          
          {/* Pending Sellers Card */}
          <Card className="shadow-sm border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-3 border-b border-amber-100">
              <CardTitle className="text-sm text-amber-800 flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-600" />
                Pending Seller Approvals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {data?.pendingSellers?.length === 0 && (
                  <p className="text-xs text-amber-700 text-center py-2">No pending approvals.</p>
                )}
                {data?.pendingSellers?.slice(0, 3).map((seller: any) => (
                  <div key={seller.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-amber-200">
                      <Store className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-shop_dark_green leading-tight">{seller.shopName}</p>
                      <p className="text-[10px] text-muted-foreground">{seller.user?.email}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100 h-7 px-2 text-xs">
                      <Link href={`/admin/sellers/${seller.id}`}>Review</Link>
                    </Button>
                  </div>
                ))}
              </div>
              
              {data?.pendingSellers && data.pendingSellers.length > 0 && (
                <div className="mt-4 pt-3 border-t border-amber-100 text-center">
                  <Link href="/admin/sellers/pending" className="text-xs font-semibold text-amber-700 hover:underline">
                    View All {stats.pendingSellers} Pending Approvals
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Revenue Overview Mini */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-shop_dark_green flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-shop_light_green" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-shop_dark_green">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total platform revenue</p>
                </div>
                <Badge variant={stats.growth.includes("+") ? "default" : "destructive"} className={stats.growth.includes("+") ? "bg-shop_light_green/10 text-shop_light_green hover:bg-shop_light_green/20" : ""}>
                  {stats.growth}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-shop_dark_green text-white border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 bg-shop_light_green rounded-full animate-pulse shadow-[0_0_8px_rgba(59,156,60,0.8)]" />
                <span className="text-sm font-semibold text-shop_light_green">System Online</span>
              </div>
              <p className="text-xs text-white/60">Last synced: {new Date().toLocaleTimeString()}</p>
              <p className="text-xs text-white/60 mt-1">Platform routing & metrics running smoothly.</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-white border border-gray-200 rounded-xl"></div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-white border border-gray-200 rounded-xl"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-white border border-gray-200 rounded-xl"></div>
        <div className="space-y-6">
          <div className="h-64 bg-white border border-gray-200 rounded-xl"></div>
          <div className="h-32 bg-shop_dark_green rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}