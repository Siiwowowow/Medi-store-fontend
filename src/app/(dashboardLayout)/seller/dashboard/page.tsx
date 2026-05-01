/* eslint-disable react/no-unescaped-entities */
// src/app/(dashboardLayout)/seller/dashboard/page.tsx
"use client";
import Link from "next/link";
import { useSellerDashboard } from "@/hooks/useSellerDashboard";
import { useAuth } from "@/providers/AuthProvider";
import { 
  Pill, 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  ChevronDown,
  PlusCircle
} from "lucide-react";
import { formatCurrency, formatTimeAgo, getGreeting } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/Seller/StatusBadge";
import { StatCard } from "@/components/shared/Seller/StatCard";

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useSellerDashboard();
  
  if (isLoading) return <DashboardSkeleton />;

  const stats = {
    totalMedicines: data?.totalMedicines || 0,
    totalOrders: data?.totalOrders || 0,
    pendingOrders: data?.pendingOrders || 0,
    todayRevenue: data?.todayRevenue || 0,
  };

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="bg-[#063c28] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">
            {getGreeting()}, {user?.shopName || "Seller"} 👋
          </h1>
          <p className="text-[#fcf0e4]/65 text-sm mt-1">Here's your store overview for today</p>
        </div>
        <Link
          href="/seller/medicines/add"
          className="bg-[#fb6c08] text-white h-10 px-5 rounded-xl font-semibold text-sm flex items-center gap-2 flex-shrink-0 hover:bg-[#e05d00] transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Medicine
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Medicines"
          value={stats.totalMedicines}
          icon={Pill}
          iconBg="bg-[#fcf0e4]"
          iconColor="text-[#063c28]"
          trend={{ value: "5 new this week", isPositive: true }}
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          iconBg="bg-gray-100"
          iconColor="text-gray-600"
          subtext="All time orders"
        />
        <StatCard
          label="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          subtext={stats.pendingOrders > 0 ? "Requires action" : "All processed"}
        />
        <StatCard
          label="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          icon={DollarSign}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend={{ value: "vs yesterday", isPositive: true }}
        />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
          <Link href="/seller/orders" className="text-[#fb6c08] text-sm hover:underline">
            View All →
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 rounded-xl">
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Order ID</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Customer</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Items</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Total</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Date</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Status</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentOrders?.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="text-sm text-gray-600 py-3.5 px-4 font-mono">#{order.orderNumber?.slice(-8)}</td>
                  <td className="text-sm font-medium text-gray-900 py-3.5 px-4">{order.customerName}</td>
                  <td className="text-sm text-gray-500 py-3.5 px-4">{order.items?.length || 0} items</td>
                  <td className="text-sm font-semibold text-gray-900 py-3.5 px-4">{formatCurrency(order.totalAmount)}</td>
                  <td className="text-sm text-gray-500 py-3.5 px-4">{formatTimeAgo(order.createdAt)}</td>
                  <td className="py-3.5 px-4"><StatusBadge status={order.status} /></td>
                  <td className="py-3.5 px-4">
                    <button className="border border-[#063c28] text-[#063c28] rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1 hover:bg-[#063c28]/5 transition-colors">
                      Update Status
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      {data?.lowStockMedicines && data.lowStockMedicines.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-[18px] h-[18px] text-amber-600" />
            <h3 className="text-sm font-bold text-amber-800">Low Stock Alert</h3>
            <span className="text-xs text-amber-600 ml-auto">{data.lowStockMedicines.length} items need restocking</span>
          </div>
          <div className="mt-3 space-y-2">
            {data.lowStockMedicines.slice(0, 3).map((medicine) => (
              <div key={medicine.id} className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-100">
                  <Pill className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 flex-1">{medicine.name}</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                  Only {medicine.stock} left
                </span>
                <button className="border border-amber-300 text-amber-700 text-xs rounded-lg px-3 py-1.5 hover:bg-amber-100 transition-colors">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-32 bg-gray-200 rounded-2xl"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100"></div>)}
      </div>
      <div className="h-96 bg-white rounded-2xl border border-gray-100"></div>
    </div>
  );
}