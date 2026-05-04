/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/customer/dashboard/page.tsx

"use client";

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ShoppingBag,
  Truck,
  Heart,
  Leaf,
  Star,
  Package,
  FileText,
  UploadCloud,
  ChevronRight,
  TrendingDown,
  Clock,
  CheckCircle,
  MapPin,
  Bell,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCustomerOrders, getCustomerWishlist, removeFromWishlist, addToCart } from "@/services/customer.service";
import dayjs from "dayjs";
import { toast } from "sonner";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  
  const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => getCustomerOrders(),
  });

  const { data: wishlist = [], isLoading: isWishlistLoading, refetch: refetchWishlist } = useQuery({
    queryKey: ["customer-wishlist"],
    queryFn: () => getCustomerWishlist(),
  });

  const handleRemoveFromWishlist = async (wishlistId: string) => {
    try {
      await removeFromWishlist(wishlistId);
      refetchWishlist();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = async (medicineId: string) => {
    try {
      await addToCart(medicineId, 1);
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };
  
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const recentOrders = orders.slice(0, 3);
  const pendingOrdersCount = orders.filter((o: any) => o.status === "PENDING").length;
  const activeOrder = orders.find((o: any) => o.status === "SHIPPED");

  return (
    <div className="space-y-6 pb-20 lg:pb-6 animate-fade-in-up">
      {/* Welcome Hero Card */}
      <Card className="relative overflow-hidden bg-[#063c28] border-none shadow-md">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#fb6c08]/10" />
        <CardContent className="relative z-10 px-6 py-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <Avatar className="h-14 w-14 ring-4 ring-white/20 ring-offset-2 ring-offset-[#063c28] shadow-lg">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-[#fcf0e4] text-xl font-bold text-[#063c28]">
                    {user?.name?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {greeting()}, {user?.name?.split(" ")[0] || "Customer"}! 👋
                  </h2>
                  <p className="text-[13px] text-white/60 font-medium mt-1">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: 'short', day: 'numeric' })} · Take care of yourself today
                  </p>
                </div>
              </div>

              {/* Active Order Strip */}
              {activeOrder ? (
                <div className="mt-3 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 cursor-pointer hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[#fb6c08]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck className="h-5 w-5 text-[#fb6c08]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white flex items-center gap-2">
                      Your order is on the way!
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fb6c08] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fb6c08]"></span>
                      </span>
                    </p>
                    <p className="text-[11px] text-white/50 mt-0.5">Expected soon · #{activeOrder.id.substring(0, 8).toUpperCase()}</p>
                  </div>
                  <Link href={`/customer/orders/${activeOrder.id}`}>
                    <Button variant="link" className="text-[#fb6c08] ml-auto p-0 h-auto font-semibold">
                      Track <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                   <p className="text-[13px] text-white/70">No active orders right now. Time to restock your essentials!</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end justify-between gap-6 min-w-[200px]">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#fb6c08] text-white h-11 px-6 rounded-xl hover:bg-[#e05e06] shadow-[0_4px_16px_rgba(251,108,8,0.3)] transition-all gap-2 text-sm font-semibold">
                  <ShoppingBag className="h-4 w-4" /> Browse Shop
                </Button>
              </Link>

              <div className="flex gap-6 w-full justify-between sm:justify-end">
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-white">{orders.length}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Orders</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-extrabold text-white">{wishlist.length}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Wishlist</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: orders.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50", hover: "hover:border-blue-200" },
          { label: "Pending Orders", value: pendingOrdersCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", hover: "hover:border-amber-200" },
          { label: "Saved Items", value: wishlist.length, icon: Heart, color: "text-red-500", bg: "bg-red-50", hover: "hover:border-red-200" },
          { label: "Total Spent", value: `৳${orders.reduce((acc: number, o: any) => acc + o.totalAmount, 0)}`, icon: TrendingDown, color: "text-[#059669]", bg: "bg-[#059669]/10", hover: "hover:border-[#059669]/30" },
        ].map((stat, i) => (
          <Card key={i} className={`border-gray-100 shadow-sm transition-all duration-200 cursor-pointer ${stat.hover} hover:shadow-md group rounded-2xl`}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-xl font-bold text-[#151515] mt-0.5">{isOrdersLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <Card className="border-gray-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between py-4 px-6">
              <CardTitle className="text-[15px] font-bold text-[#151515] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#063c28]" />
                Recent Orders
              </CardTitle>
              <Link href="/customer/orders">
                <Button variant="link" className="text-[#fb6c08] h-auto p-0 text-xs font-semibold">
                  View All <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {isOrdersLoading ? (
                <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 text-[#fb6c08] animate-spin" /></div>
              ) : recentOrders.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">No recent orders.</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentOrders.map((order: any) => (
                    <div key={order.id} className="p-5 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition-colors">
                      <div className="flex -space-x-3">
                        {order.items?.slice(0,3).map((item: any, i: number) => (
                          <div key={i} className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden z-10">
                            <Image src={item.medicineImage || "/product-placeholder.jpg"} alt="Product" width={40} height={40} className="object-contain p-1" />
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center z-10 text-[10px] font-bold text-gray-500">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono font-medium text-gray-500">#{order.id.substring(0, 8).toUpperCase()}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[11px] text-gray-500">{dayjs(order.createdAt).format("MMM D, YYYY")}</span>
                        </div>
                        <h4 className="text-[14px] font-semibold text-[#151515] truncate">
                          {order.items?.length} items
                        </h4>
                        <div className="mt-2 flex items-center gap-2">
                          {order.status === "SHIPPED" && (
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 text-[10px] gap-1">
                              <Truck className="w-3 h-3" /> Shipped
                            </Badge>
                          )}
                          {order.status === "DELIVERED" && (
                            <Badge className="bg-[#059669]/10 text-[#059669] border-[#059669]/20 hover:bg-[#059669]/10 text-[10px] gap-1">
                              <CheckCircle className="w-3 h-3" /> Delivered
                            </Badge>
                          )}
                          {order.status === "PENDING" && (
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-[10px] gap-1">
                              <Clock className="w-3 h-3" /> Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                        <span className="font-bold text-[#063c28]">৳{order.totalAmount}</span>
                        <div className="flex gap-2">
                          {order.status === "SHIPPED" ? (
                            <Link href={`/customer/orders/${order.id}`}>
                              <Button size="sm" className="bg-[#fb6c08] hover:bg-[#e05e06] text-white h-8 text-xs px-3 shadow-sm">
                                Track
                              </Button>
                            </Link>
                          ) : (
                            <Link href={`/customer/orders/${order.id}`}>
                              <Button size="sm" variant="outline" className="h-8 text-xs px-3 border-gray-200 hover:bg-gray-50 text-gray-700">
                                Details
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wishlist Preview */}
          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="bg-white border-b border-gray-50 py-4 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-[#151515] flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Wishlist Highlights
              </CardTitle>
              <Link href="/customer/wishlist">
                <Button variant="link" className="text-[#fb6c08] h-auto p-0 text-xs font-semibold">
                  See All <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              {isWishlistLoading ? (
                <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-[#fb6c08]" /></div>
              ) : wishlist.length === 0 ? (
                <div className="text-center text-sm text-gray-500 p-4">Your wishlist is empty.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlist.slice(0, 3).map((item: any) => (
                    <div key={item.id} className="group border border-gray-100 rounded-xl p-3 hover:border-[#fb6c08]/30 transition-colors bg-white relative">
                      <button 
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                      </button>
                      <div className="h-24 bg-gray-50 rounded-lg mb-3 flex items-center justify-center p-2">
                        <Image src={item.image || "/product-placeholder.jpg"} alt={item.name} width={60} height={60} className="object-contain" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-[#059669] uppercase tracking-wider">{item.category || "Medicine"}</p>
                        <p className="text-xs font-semibold text-[#151515] line-clamp-1">{item.name}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-bold text-[#063c28] text-sm">৳{item.price}</span>
                          <Button 
                            onClick={() => handleAddToCart(item.medicineId)}
                            size="icon" 
                            className="w-6 h-6 bg-[#fcf0e4] hover:bg-[#fb6c08] text-[#063c28] hover:text-white rounded-md transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Prescription Upload */}
          <Card className="border-gray-100 shadow-sm rounded-2xl bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <FileText className="w-24 h-24 text-blue-500" />
            </div>
            <CardContent className="p-6 relative z-10 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#151515] text-lg mb-2">Order with Prescription</h3>
              <p className="text-xs text-gray-500 mb-5 px-2">
                Have a prescription? Upload it and we will arrange the medicines for you.
              </p>
              
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-5 bg-white mb-4 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                <UploadCloud className="w-8 h-8 text-blue-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                <p className="text-[11px] font-medium text-gray-600">
                  <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[9px] text-gray-400 mt-1">PNG, JPG or PDF (Max 5MB)</p>
              </div>

              <Button className="w-full bg-[#063c28] hover:bg-[#063d29] text-white rounded-xl h-10 shadow-sm">
                Upload & Order
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="bg-white border-b border-gray-50 py-4 px-5">
              <CardTitle className="text-[14px] font-bold text-[#151515] flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                <div className="p-4 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#151515]">Welcome to your dashboard</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">You can track your orders, see wishlist, and more here.</p>
                    <span className="text-[9px] text-gray-400 mt-1 block">Just now</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-gray-50">
                <Button variant="ghost" className="w-full text-xs text-gray-500 hover:text-[#063c28]">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}