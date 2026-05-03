/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/shared/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Package, User, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";

interface OrderDetailsModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function OrderDetailsModal({ orderId, isOpen, onClose, onUpdate }: OrderDetailsModalProps) {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen && orderId) {
      const fetchOrder = async () => {
        setIsLoading(true);
        try {
          const res = await adminService.getOrderById(orderId);
          if (res?.success) setOrder(res.data);
        } catch (err) {
          toast.error("Failed to fetch order details");
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrder();
    } else {
      setOrder(null);
    }
  }, [isOpen, orderId]);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await adminService.updateOrderStatus(orderId as string, newStatus);
      if (res?.success) {
        toast.success(`Order marked as ${newStatus}`);
        onUpdate();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl">Order Details</span>
              {order && <span className="ml-2 text-muted-foreground font-mono text-sm">#{order.orderNumber?.slice(-8)}</span>}
            </div>
            {order && <StatusBadge status={order.status} />}
          </DialogTitle>
          <DialogDescription>
            {order ? `Placed on ${formatDate(order.createdAt)}` : "Loading..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 text-center animate-pulse text-muted-foreground">Loading order details...</div>
        ) : !order ? (
          <div className="py-12 text-center text-muted-foreground">Order not found.</div>
        ) : (
          <div className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-slate-50/50">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-shop_dark_green">
                  <User className="w-4 h-4 text-shop_orange" /> Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {order.customerName}</p>
                  <p><span className="text-muted-foreground">Email:</span> {order.customerEmail}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {order.customerPhone}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-slate-50/50">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-shop_dark_green">
                  <MapPin className="w-4 h-4 text-shop_orange" /> Shipping Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="whitespace-pre-wrap">{order.shippingAddress}</p>
                  {order.notes && (
                    <p className="italic text-muted-foreground mt-2 border-t pt-2">Note: {order.notes}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-shop_dark_green">
                <Package className="w-4 h-4 text-shop_orange" /> Order Items
              </h3>
              <div className="space-y-3">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/50">
                    <div className="w-12 h-12 relative rounded border bg-white flex-shrink-0">
                      {item.medicineImage ? (
                        <Image src={item.medicineImage} alt={item.medicineName} fill className="object-cover rounded" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Img</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.medicineName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(item.unitPrice)} × {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold text-sm">
                      {formatCurrency(item.totalPrice)}
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t mt-3 flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-bold text-lg text-shop_orange">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
              <div className="flex justify-end gap-3 pt-2">
                {order.status === 'PENDING' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusUpdate('CANCELLED')}
                      disabled={isUpdating}
                    >
                      <XCircle className="w-4 h-4 mr-1.5" /> Cancel Order
                    </Button>
                    <Button 
                      className="bg-shop_dark_green hover:bg-shop_dark_green/90 text-white"
                      onClick={() => handleStatusUpdate('PROCESSING')}
                      disabled={isUpdating}
                    >
                      <CheckCircle className="w-4 h-4 mr-1.5" /> Approve & Process
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
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
