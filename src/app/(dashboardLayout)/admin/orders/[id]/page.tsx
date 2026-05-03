/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, User, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await adminService.getOrderById(params.id as string);
      if (res?.success) setOrder(res.data);
    } catch (err) {
      toast.error("Failed to fetch order details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await adminService.updateOrderStatus(params.id as string, newStatus);
      if (res?.success) {
        toast.success(`Order marked as ${newStatus}`);
        fetchOrder();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground animate-pulse">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground mb-4">Order not found.</p>
        <Button asChild variant="outline">
          <Link href="/admin/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-shop_dark_green">Order #{order.orderNumber?.slice(-8)}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-shop_orange" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-shop_dark_green">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{order.customerPhone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-shop_orange" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium text-shop_dark_green whitespace-pre-wrap">{order.shippingAddress}</p>
            </div>
            {order.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium italic text-sm">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="w-5 h-5 text-shop_orange" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg bg-white/50">
                <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.medicineImage ? (
                    <Image src={item.medicineImage} alt={item.medicineName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-shop_dark_green truncate">{item.medicineName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.unitPrice)} × {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-shop_dark_green">{formatCurrency(item.totalPrice)}</p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t flex justify-between items-center mt-4">
              <span className="font-semibold text-lg text-muted-foreground">Total Amount</span>
              <span className="font-bold text-2xl text-shop_orange">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </CardContent>
        {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
          <CardFooter className="bg-gray-50 flex justify-end gap-3 rounded-b-lg border-t pt-4">
            {order.status === 'PENDING' && (
              <>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => handleStatusUpdate('CANCELLED')}
                  disabled={isUpdating}
                >
                  <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                </Button>
                <Button 
                  className="bg-shop_dark_green hover:bg-shop_dark_green/90 text-white"
                  onClick={() => handleStatusUpdate('PROCESSING')}
                  disabled={isUpdating}
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Approve & Process
                </Button>
              </>
            )}
            {order.status === 'PROCESSING' && (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleStatusUpdate('SHIPPED')}
                disabled={isUpdating}
              >
                Mark as Shipped
              </Button>
            )}
            {order.status === 'SHIPPED' && (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleStatusUpdate('DELIVERED')}
                disabled={isUpdating}
              >
                Mark as Delivered
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
