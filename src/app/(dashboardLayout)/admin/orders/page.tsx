/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/admin/StatusBadge";
import { ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrderDetailsModal } from "./OrderDetailsModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await adminService.getAllOrders();
      if (res?.success) setOrders(res.data);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-shop_dark_green">All Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-shop_orange" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground animate-pulse">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No orders found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">#{o.orderNumber?.slice(-8)}</TableCell>
                    <TableCell className="font-semibold text-shop_dark_green">{o.customer?.name || o.customerName || "Guest"}</TableCell>
                    <TableCell>{formatCurrency(o.totalAmount)}</TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-shop_orange border-shop_orange/30 hover:bg-shop_light_pink"
                        onClick={() => handleViewOrder(o.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <OrderDetailsModal 
        orderId={selectedOrderId} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onUpdate={fetchOrders}
      />
    </div>
  );
}
