/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/seller/orders/page.tsx

"use client";

import { useState } from "react";

import { Search, ChevronDown, Package, MapPin } from "lucide-react";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/Seller/StatusBadge";
import { useSellerOrders } from "@/services/useSellerOrders";

const statusTabs = [
  { label: "All", value: "all", dot: "gray" },
  { label: "Placed", value: "pending", dot: "amber" },
  { label: "Processing", value: "processing", dot: "blue" },
  { label: "Shipped", value: "shipped", dot: "indigo" },
  { label: "Delivered", value: "delivered", dot: "green" },
  { label: "Cancelled", value: "cancelled", dot: "red" },
];

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const { data, isLoading } = useSellerOrders({ status: activeStatus === "all" ? undefined : activeStatus, search });

  if (isLoading) return <OrdersSkeleton />;

  const orders = data?.orders || [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[22px] font-bold text-gray-900">Incoming Orders</h1>
        <div className="flex gap-2">
          <input type="date" className="h-9 rounded-lg border border-gray-200 text-sm px-3" />
          <span className="text-gray-400 self-center">—</span>
          <input type="date" className="h-9 rounded-lg border border-gray-200 text-sm px-3" />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveStatus(tab.value)}
            className={`flex-shrink-0 bg-white border rounded-xl px-5 py-3 flex items-center gap-3 transition-all ${
              activeStatus === tab.value ? "border-[#063c28] bg-[#fcf0e4]" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`w-2 h-2 rounded-full bg-${tab.dot}-500`} />
            <div>
              <span className="text-lg font-bold text-gray-900">{orders.filter((o: { status: string; }) => tab.value === "all" || o.status === tab.value.toUpperCase()).length}</span>
              <span className="text-[10px] uppercase text-gray-400 ml-2">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 h-9">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none w-full"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
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
              {orders.map((order: any) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <td className="text-sm text-gray-500 py-3.5 px-4 font-mono">#{order.orderNumber?.slice(-8)}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-500">{order.customerName?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
                          <p className="text-[10px] text-gray-400">{order.customerPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-500 py-3.5 px-4">{order.items?.length || 0} items</td>
                    <td className="text-sm font-bold text-gray-900 py-3.5 px-4">{formatCurrency(order.totalAmount)}</td>
                    <td className="text-sm text-gray-500 py-3.5 px-4">{formatTimeAgo(order.createdAt)}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={order.status} /></td>
                    <td className="py-3.5 px-4">
                      <button className="border border-[#063c28] text-[#063c28] rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1 hover:bg-[#063c28]/5 transition-colors">
                        Update Status
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50/50 border-t border-gray-100">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <h4 className="text-[11px] font-bold uppercase text-gray-400 mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {order.items?.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-gray-400" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{item.medicineName}</p>
                                    <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{formatCurrency(item.totalPrice)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[11px] font-bold uppercase text-gray-400 mb-3">Delivery Info</h4>
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <p className="text-xs text-gray-600">{order.shippingAddress}</p>
                              </div>
                              {order.customerPhone && (
                                <div className="flex items-start gap-2 mt-2">
                                  <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                                  <p className="text-xs text-gray-600">{order.customerPhone}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded"></div>
      <div className="flex gap-3">
        {[...Array(6)].map((_, i) => <div key={i} className="w-24 h-16 bg-gray-200 rounded-xl"></div>)}
      </div>
      <div className="h-96 bg-white rounded-2xl"></div>
    </div>
  );
}