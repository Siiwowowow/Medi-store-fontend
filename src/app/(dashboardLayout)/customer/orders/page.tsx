/* eslint-disable react-hooks/immutability */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import { IOrder, IOrderResponse, IOrderItem } from "@/types/customer.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  FileText,
  RotateCcw,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Eye,
  Loader2,
  CreditCard,
  Banknote,
  Calendar,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCustomerOrders, cancelOrder, initiatePayment } from "@/services/customer.service";
import dayjs from "dayjs";

import { Suspense } from "react";

function OrdersContent() {
  const [activeTab, setActiveTab] = useState("all");

  const { data: orderResponse, isLoading, refetch } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => getCustomerOrders(),
  });

  const orders = orderResponse?.orders ?? [];

  const handleCancelOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      try {
        await cancelOrder(orderId);
        refetch();
      } catch (error) {
        console.error("Failed to cancel order:", error);
      }
    }
  };

  const handleInitiatePayment = async (orderId: string) => {
    try {
      const res = await initiatePayment(orderId, "STRIPE");
      if (res.success && res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
    }
  };

  const filteredOrders = orders.filter((o: IOrder) => {
    if (activeTab === "all") return true;
    if (activeTab === "paid") return o.payment?.status === "COMPLETED";
    if (activeTab === "cod") return o.payment?.paymentMethod === "COD";
    if (activeTab === "cancelled") return o.status === "CANCELLED";
    if (activeTab === "success") return ["PROCESSING", "SHIPPED", "DELIVERED"].includes(o.status);
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "PROCESSING":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200"><Package className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "SHIPPED":
        return <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
      case "DELIVERED":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200"><CheckCircle className="w-3 h-3 mr-1" /> Delivered</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status?: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case "FAILED":
        return <Badge className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Unpaid</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[#151515] tracking-tight">Order Management</h1>
          <p className="text-sm text-gray-500 font-medium">Track, manage and view details of your purchases</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order #" 
              className="h-12 pl-12 pr-6 rounded-2xl border border-gray-100 text-sm focus:outline-none focus:ring-4 focus:ring-[#063c28]/5 w-full md:w-72 font-medium"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-gray-100 hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Tabs & Table */}
      <Card className="border-none shadow-xl rounded-[40px] overflow-hidden bg-white">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-1.5 h-14 w-full md:w-auto inline-flex shadow-sm">
              {[
                { value: "all", label: "All Orders", icon: Package },
                { value: "success", label: "Success", icon: CheckCircle },
                { value: "paid", label: "Paid", icon: CreditCard },
                { value: "cod", label: "COD", icon: Banknote },
                { value: "cancelled", label: "Cancelled", icon: XCircle },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  className="rounded-xl data-[state=active]:bg-[#063c28] data-[state=active]:text-white text-sm font-bold px-6 h-full transition-all gap-2"
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-[#fb6c08] animate-spin" />
                <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Loading Orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-20 text-center space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-10 h-10 text-gray-200" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#151515]">No orders found</h3>
                  <p className="text-sm text-gray-500 font-medium">Try changing your filters or browse the shop for products.</p>
                </div>
                <Link href="/shop">
                  <Button className="bg-[#fb6c08] hover:bg-[#e05e06] text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-orange-500/20">
                    Browse Medicines
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="hover:bg-transparent border-gray-100">
                      <TableHead className="w-[180px] py-6 pl-8 text-xs font-black uppercase tracking-widest text-gray-400">Order Details</TableHead>
                      <TableHead className="py-6 text-xs font-black uppercase tracking-widest text-gray-400">Date</TableHead>
                      <TableHead className="py-6 text-xs font-black uppercase tracking-widest text-gray-400">Status</TableHead>
                      <TableHead className="py-6 text-xs font-black uppercase tracking-widest text-gray-400">Payment</TableHead>
                      <TableHead className="py-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Amount</TableHead>
                      <TableHead className="py-6 pr-8 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="group border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <TableCell className="py-6 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-110 transition-transform">
                              <Package className="w-6 h-6 text-[#063c28]" />
                            </div>
                            <div>
                              <p className="text-[15px] font-black text-[#151515] leading-none mb-1">{order.orderNumber}</p>
                              <p className="text-[11px] text-gray-500 font-medium">{order.items.length} items ordered</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <p className="text-sm font-bold text-gray-600">{dayjs(order.createdAt).format("MMM D, YYYY")}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="space-y-1.5">
                            {getPaymentBadge(order.payment?.status)}
                            <p className="text-[10px] font-black text-gray-400 flex items-center gap-1">
                              {order.payment?.paymentMethod === "STRIPE" ? <CreditCard className="w-3 h-3" /> : <Banknote className="w-3 h-3" />}
                              {order.payment?.paymentMethod}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 text-right">
                          <p className="text-lg font-black text-[#063c28]">৳{Number(order.totalAmount)}</p>
                        </TableCell>
                        <TableCell className="py-6 pr-8 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === "PENDING" && order.payment?.status !== "COMPLETED" && (
                              <Button 
                                onClick={() => handleInitiatePayment(order.id)}
                                size="sm" 
                                className="h-10 bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-xl shadow-sm font-bold text-xs"
                              >
                                Pay Now
                              </Button>
                            )}
                            <Link href={`/customer/orders/${order.id}`}>
                              <Button variant="outline" size="sm" className="h-10 rounded-xl border-gray-200 hover:bg-white hover:border-[#063c28] hover:text-[#063c28] font-bold text-xs transition-all">
                                <Eye className="w-4 h-4 mr-2" /> Details
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default function CustomerOrdersPage() {
  return (
    <Suspense fallback={
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#fb6c08] animate-spin" />
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Initializing Dashboard...</p>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}