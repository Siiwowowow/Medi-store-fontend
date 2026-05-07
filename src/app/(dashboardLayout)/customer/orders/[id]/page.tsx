/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, cancelOrder, initiatePayment } from "@/services/customer.service";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Phone, 
  CreditCard,
  FileText,
  Loader2,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { generateInvoice } from "@/lib/utils/generateInvoice";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const orderId = id as string;

  const { data: order, isLoading, refetch } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrderById(orderId),
  });

  const handleCancelOrder = async () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      try {
        await cancelOrder(orderId);
        toast.success("Order cancelled successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to cancel order");
      }
    }
  };

  const handlePayNow = async () => {
    try {
      const res = await initiatePayment(orderId, "STRIPE");
      if (res.success && res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      toast.error("An error occurred during payment initiation");
    }
  };

  const handleDownloadInvoice = () => {
    if (!order) return;
    
    generateInvoice({
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone || "N/A",
      shippingAddress: order.shippingAddress,
      items: order.items.map((item: any) => ({
        medicineName: item.medicineName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
      })),
      totalAmount: Number(order.totalAmount),
      paymentMethod: order.payment?.paymentMethod || "N/A",
      paymentStatus: order.payment?.status || "PENDING",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#fb6c08] animate-spin" />
        <p className="text-gray-500 font-medium font-mono text-sm tracking-tighter">FETCHING ORDER DATA...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900">Order not found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the order you're looking for.</p>
        <Button onClick={() => router.push("/customer/orders")} className="bg-[#063c28]">Back to Orders</Button>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Pending", icon: Clock, color: "bg-amber-50 text-amber-700 border-amber-200" };
      case "PROCESSING":
        return { label: "Processing", icon: Package, color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "SHIPPED":
        return { label: "Shipped", icon: Truck, color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      case "DELIVERED":
        return { label: "Delivered", icon: CheckCircle, color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "CANCELLED":
        return { label: "Cancelled", icon: XCircle, color: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { label: status, icon: AlertCircle, color: "bg-gray-50 text-gray-700 border-gray-200" };
    }
  };

  const status = getStatusInfo(order.status);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/customer/orders")}
            className="p-0 hover:bg-transparent text-[#063c28] font-bold gap-2 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Order History
          </Button>
          <h1 className="text-3xl font-black text-[#151515] tracking-tight">
            Order <span className="text-[#fb6c08]">{order.orderNumber}</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Placed on {dayjs(order.createdAt).format("MMMM D, YYYY")} at {dayjs(order.createdAt).format("h:mm A")}
          </p>
        </div>
        <div className="flex gap-3">
          <Badge className={`${status.color} h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-bold border-2`}>
            <status.icon className="w-4 h-4" /> {status.label}
          </Badge>
          
          <Badge className="bg-gray-50 text-gray-700 border-gray-200 h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-bold border-2">
            {order.payment?.paymentMethod === "COD" ? <Banknote className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
            {order.payment?.paymentMethod}
          </Badge>

          {order.payment?.status === "COMPLETED" ? (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-bold border-2">
              <ShieldCheck className="w-4 h-4" /> Paid
            </Badge>
          ) : (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-bold border-2">
              <AlertCircle className="w-4 h-4" /> Unpaid
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Items & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Package className="w-6 h-6 text-[#fb6c08]" /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-6 first:pt-0 last:pb-0 flex gap-6 items-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-3 shrink-0 border border-gray-100">
                      <Image 
                        src={item.medicineImage || "/product-placeholder.jpg"} 
                        alt={item.medicineName} 
                        width={64} 
                        height={64} 
                        className="object-contain" 
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-lg font-bold text-[#151515]">{item.medicineName}</h4>
                      <p className="text-sm text-gray-500 font-medium">Quantity: <span className="text-[#151515] font-bold">{item.quantity}</span></p>
                      <p className="text-sm text-[#fb6c08] font-bold">৳{Number(item.unitPrice)} per unit</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#063c28]">৳{Number(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Timeline */}
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#063c28]" /> Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-100"></div>
                <div className="space-y-10 relative">
                  {[
                    { label: "Order Placed", status: "PENDING", date: order.createdAt, desc: "Your order has been successfully placed." },
                    { label: "Processing", status: "PROCESSING", date: null, desc: "Our pharmacist is preparing your medicines." },
                    { label: "Shipped", status: "SHIPPED", date: null, desc: "Your order is on the way to your location." },
                    { label: "Delivered", status: "DELIVERED", date: order.deliveredAt, desc: "Order has been delivered safely." }
                  ].map((step, idx) => {
                    const isCompleted = order.status === step.status || 
                      (step.status === "PENDING") || 
                      (order.status === "DELIVERED") ||
                      (order.status === "SHIPPED" && (step.status === "PROCESSING" || step.status === "PENDING"));
                    
                    const isActive = order.status === step.status;

                    return (
                      <div key={idx} className="flex gap-6">
                        <div className={`w-8 h-8 rounded-full border-2 z-10 flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isCompleted ? "bg-[#063c28] border-[#063c28] text-white shadow-lg shadow-[#063c28]/20" : 
                          isActive ? "bg-white border-[#fb6c08] text-[#fb6c08] ring-4 ring-orange-50" : 
                          "bg-white border-gray-200 text-gray-300"
                        }`}>
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        <div className="space-y-1">
                          <p className={`font-bold ${isCompleted || isActive ? "text-[#151515]" : "text-gray-400"}`}>{step.label}</p>
                          <p className="text-sm text-gray-500 font-medium max-w-md">{step.desc}</p>
                          {step.date && (
                            <p className="text-xs text-[#fb6c08] font-bold">{dayjs(step.date).format("MMM D, YYYY • h:mm A")}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Info & Actions */}
        <div className="space-y-8">
          {/* Summary Card */}
          <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-[#063c28] text-white">
            <CardHeader className="p-8 border-b border-white/10">
              <CardTitle className="text-xl font-black">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm opacity-60">
                  <span>Subtotal</span>
                  <span className="font-bold">৳{order.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm opacity-60">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-400 font-bold uppercase">Free</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-black">Total Paid</span>
                  <span className="text-3xl font-black text-[#fb6c08]">৳{Number(order.totalAmount)}</span>
                </div>
              </div>

              {order.payment?.status !== "COMPLETED" && order.status !== "CANCELLED" && order.payment?.paymentMethod !== "COD" && (
                <div className="space-y-4 pt-4">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-white/80 leading-relaxed font-medium">
                      Payment is pending. Please complete your payment to avoid delivery delays.
                    </p>
                  </div>
                  <Button 
                    onClick={handlePayNow}
                    className="w-full h-14 bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-2xl font-black text-lg shadow-xl shadow-black/20"
                  >
                    Pay Now <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {order.payment?.paymentMethod === "COD" && order.payment?.status !== "COMPLETED" && (
                <div className="space-y-4 pt-4">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-white/80 leading-relaxed font-medium">
                      You've chosen Cash on Delivery. Please keep ৳{Number(order.totalAmount)} ready when the courier arrives.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Delivery Address
                </h4>
                <p className="text-[#151515] font-bold leading-relaxed">{order.shippingAddress}</p>
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Information
                </h4>
                <p className="text-[#151515] font-bold">{order.customerPhone}</p>
                <p className="text-sm text-gray-500 font-medium">{order.customerEmail}</p>
              </div>
              {order.notes && (
                <div className="space-y-4 pt-6 border-t border-gray-50">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Order Notes
                  </h4>
                  <p className="text-sm text-gray-600 italic font-medium leading-relaxed">"{order.notes}"</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {order.status === "PENDING" && order.payment?.status !== "COMPLETED" && (
            <Button 
              onClick={handleCancelOrder}
              variant="outline" 
              className="w-full h-14 border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl font-bold transition-all"
            >
              Cancel Order
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            onClick={handleDownloadInvoice}
            className="w-full h-14 text-gray-400 hover:text-[#063c28] rounded-2xl font-bold flex items-center gap-2"
          >
            <FileText className="w-5 h-5" /> Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
