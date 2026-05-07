"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { verifyPayment, getOrderById } from "@/services/customer.service";
import { generateInvoice } from "@/lib/utils/generateInvoice";
import { FileText } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verify = async () => {
      if (sessionId) {
        try {
          await verifyPayment(sessionId);
          toast.success("Payment verified successfully!");
        } catch (error) {
          console.error("Verification error:", error);
        }
      }
    };
    verify();
  }, [sessionId]);

  const handleDownloadInvoice = async () => {
    if (!orderId) {
      toast.error("Order ID not found");
      return;
    }

    try {
      toast.loading("Preparing your invoice...", { id: "invoice-loading" });
      const order = await getOrderById(orderId);
      
      generateInvoice({
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        shippingAddress: order.shippingAddress,
        items: order.items.map((item: any) => ({
          medicineName: item.medicineName,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.totalPrice),
        })),
        totalAmount: Number(order.totalAmount),
        paymentMethod: order.payment?.paymentMethod || "N/A",
        paymentStatus: order.payment?.status || "COMPLETED", // Success page implies completed
      });
      toast.dismiss("invoice-loading");
    } catch (error) {
      toast.dismiss("invoice-loading");
      toast.error("Failed to generate invoice");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <div className="bg-[#063c28] h-48 flex items-center justify-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fb6c08]/20 rounded-full blur-3xl"></div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full p-4 shadow-xl shadow-black/20"
            >
              <CheckCircle2 className="w-16 h-16 text-[#059669]" />
            </motion.div>
          </div>

          <CardContent className="p-10 text-center space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-[#151515] tracking-tight">Payment Received!</h1>
              <p className="text-gray-500 font-medium">
                Thank you for your purchase. Your order is now being processed.
              </p>
            </div>

            {orderId && (
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Order ID</p>
                <p className="text-lg font-mono font-bold text-[#063c28]">{orderId}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => router.push("/customer/orders")}
                className="h-14 bg-[#063c28] hover:bg-[#0a5a3c] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#063c28]/10 transition-all hover:scale-[1.02]"
              >
                Track My Order <ShoppingBag className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={handleDownloadInvoice}
                variant="outline"
                className="h-14 border-[#063c28] text-[#063c28] hover:bg-[#063c28]/5 rounded-2xl font-bold transition-all"
              >
                Download Invoice <FileText className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => router.push("/")}
                variant="ghost"
                className="h-14 text-gray-500 hover:text-[#fb6c08] hover:bg-orange-50 rounded-2xl font-bold transition-all"
              >
                Back to Home <Home className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-[11px] text-gray-400 font-medium pt-4 border-t border-gray-50">
              A confirmation email has been sent to your registered address.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#063c28] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
