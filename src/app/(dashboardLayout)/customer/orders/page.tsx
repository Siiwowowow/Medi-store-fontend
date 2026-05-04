/* eslint-disable react/no-unescaped-entities */
// src/app/(dashboardLayout)/customer/orders/page.tsx

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
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCustomerOrders, cancelOrder } from "@/services/customer.service";
import dayjs from "dayjs";

export default function CustomerOrdersPage() {
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

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter((o: IOrder) => {
        if (activeTab === "pending" && o.status === "PENDING") return true;
        if (activeTab === "delivered" && o.status === "DELIVERED") return true;
        if (activeTab === "cancelled" && o.status === "CANCELLED") return true;
        return false;
      });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "SHIPPED":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
      case "DELIVERED":
        return <Badge className="bg-[#059669]/10 text-[#059669] border-[#059669]/20 hover:bg-[#059669]/10"><CheckCircle className="w-3 h-3 mr-1" /> Delivered</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-50"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStepStatus = (completed: boolean, active: boolean) => {
    if (completed) return "bg-[#059669] border-[#059669] text-white";
    if (active) return "bg-white border-[#fb6c08] text-[#fb6c08] ring-4 ring-[#fb6c08]/20";
    return "bg-white border-gray-200 text-gray-400";
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#151515]">My Orders</h1>
          <p className="text-[13px] text-gray-500 mt-1">Track, manage and return your orders</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID..." 
              className="h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#063c28]/20 w-full sm:w-64"
            />
          </div>
          <Button variant="outline" className="h-10 px-3 border-gray-200 rounded-xl hidden sm:flex">
            <Filter className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="bg-white border border-gray-100 rounded-xl p-1 h-12 w-full justify-start min-w-max sm:w-auto inline-flex">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-[#063c28] data-[state=active]:text-white text-sm px-6 h-full transition-all">
              All Orders
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-[#063c28] data-[state=active]:text-white text-sm px-6 h-full transition-all">
              Pending
            </TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-lg data-[state=active]:bg-[#063c28] data-[state=active]:text-white text-sm px-6 h-full transition-all">
              Delivered
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="rounded-lg data-[state=active]:bg-[#063c28] data-[state=active]:text-white text-sm px-6 h-full transition-all">
              Cancelled
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6 space-y-4 outline-none">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 text-[#fb6c08] animate-spin" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card className="border-dashed border-gray-200 shadow-none py-16">
              <CardContent className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-[#151515] mb-1">No orders found</h3>
                <p className="text-sm text-gray-500 max-w-sm mb-6">We couldn't find any orders matching your current filter criteria.</p>
                <Link href="/shop">
                  <Button className="bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-xl">Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order: IOrder) => (
              <Card key={order.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden group">
                <CardHeader className="bg-[#fcf0e4]/30 border-b border-gray-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#151515]">#{order.id.substring(0, 8).toUpperCase()}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <span className="text-xs font-medium text-gray-500 hidden sm:inline">•</span>
                    <span className="text-xs text-gray-500">
                      Placed on {dayjs(order.createdAt).format("MMM D, YYYY")} at {dayjs(order.createdAt).format("h:mm A")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-200 hover:bg-gray-50 rounded-lg hidden sm:flex">
                      <FileText className="w-3.5 h-3.5 mr-1.5" /> Invoice
                    </Button>
                    <Link href={`/customer/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-200 hover:bg-gray-50 text-[#063c28] font-semibold rounded-lg">
                        <Eye className="w-3.5 h-3.5 mr-1.5" /> View Details
                      </Button>
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    
                    {/* Left: Items */}
                    <div className="flex-1 p-5 lg:border-r border-gray-100">
                      <div className="space-y-4">
                        {order.items.map((item: IOrderItem, idx: number) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-2 shrink-0">
                              <Image src={item.medicineImage || "/product-placeholder.jpg"} alt={item.medicineName} width={48} height={48} className="object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[14px] font-semibold text-[#151515] truncate">{item.medicineName}</h4>
                              <p className="text-[11px] text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-[14px] font-bold text-[#063c28]">৳{item.unitPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[13px] text-gray-500 font-medium">Total Amount</span>
                        <span className="text-[18px] font-extrabold text-[#151515]">৳{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Right: Timeline & Actions */}
                    <div className="w-full lg:w-[320px] bg-gray-50/50 p-5 flex flex-col justify-between">
                      {order.status !== "CANCELLED" ? (
                        <div className="mb-6">
                          <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Order Progress</h5>
                          
                          <div className="relative">
                            <div className="absolute left-2.5 top-2.5 bottom-2.5 w-[2px] bg-gray-200"></div>
                            <div className="space-y-6 relative">
                              {/* Placed */}
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${getStepStatus(true, false)}`}>
                                  <CheckCircle className="w-3 h-3" />
                                </div>
                                <div>
                                  <p className={`text-[12px] font-bold text-[#151515]`}>Order Placed</p>
                                </div>
                              </div>
                              
                              {/* Processing */}
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${getStepStatus(order.status === "SHIPPED" || order.status === "DELIVERED", order.status === "PENDING")}`}>
                                  {(order.status === "SHIPPED" || order.status === "DELIVERED") && <CheckCircle className="w-3 h-3" />}
                                </div>
                                <div>
                                  <p className={`text-[12px] font-bold ${order.status !== "PENDING" ? "text-[#151515]" : "text-gray-400"}`}>Processing</p>
                                </div>
                              </div>
                              
                              {/* Shipped */}
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${getStepStatus(order.status === "DELIVERED", order.status === "SHIPPED")}`}>
                                  {order.status === "DELIVERED" && <CheckCircle className="w-3 h-3" />}
                                </div>
                                <div>
                                  <p className={`text-[12px] font-bold ${order.status === "SHIPPED" || order.status === "DELIVERED" ? "text-[#151515]" : "text-gray-400"}`}>Shipped</p>
                                  {order.status === "SHIPPED" && <p className="text-[10px] text-[#fb6c08] font-semibold mt-0.5 animate-pulse">Out for delivery</p>}
                                </div>
                              </div>
                              
                              {/* Delivered */}
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${getStepStatus(order.status === "DELIVERED", false)}`}>
                                  {order.status === "DELIVERED" && <CheckCircle className="w-3 h-3" />}
                                </div>
                                <div>
                                  <p className={`text-[12px] font-bold ${order.status === "DELIVERED" ? "text-[#151515]" : "text-gray-400"}`}>Delivered</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6 flex flex-col items-center justify-center text-center h-full py-8">
                          <XCircle className="w-12 h-12 text-red-200 mb-3" />
                          <p className="text-[13px] font-semibold text-red-600">Order Cancelled</p>
                          <p className="text-[11px] text-gray-500 mt-1 max-w-[200px]">This order was cancelled and payment has been refunded if applicable.</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 mt-auto">
                        {order.status === "SHIPPED" && (
                          <Button className="w-full bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-xl shadow-sm text-xs h-9">
                            Track Live
                          </Button>
                        )}
                        {order.status === "DELIVERED" && (
                          <div className="flex gap-2">
                            <Button className="w-full bg-[#063c28] hover:bg-[#063d29] text-white rounded-xl text-xs h-9 flex-1">
                              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reorder
                            </Button>
                            <Button variant="outline" className="w-full border-gray-200 rounded-xl text-xs h-9 flex-1 text-gray-600 hover:bg-gray-100">
                              Return
                            </Button>
                          </div>
                        )}
                        {order.status === "PENDING" && (
                          <Button 
                            onClick={() => handleCancelOrder(order.id)}
                            variant="outline" 
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl text-xs h-9"
                          >
                            Cancel Order
                          </Button>
                        )}
                        {order.status === "CANCELLED" && (
                          <Button className="w-full bg-[#063c28] hover:bg-[#063d29] text-white rounded-xl text-xs h-9">
                            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Order Again
                          </Button>
                        )}
                        
                        {/* Mobile Invoice Button */}
                        <Button variant="outline" className="w-full border-gray-200 rounded-xl text-xs h-9 sm:hidden mt-2">
                          <FileText className="w-3.5 h-3.5 mr-1.5" /> Download Invoice
                        </Button>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}