"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <div className="bg-red-500 h-48 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
            
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-full p-4 shadow-xl"
            >
              <XCircle className="w-16 h-16 text-red-500" />
            </motion.div>
          </div>

          <CardContent className="p-10 text-center space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-[#151515] tracking-tight">Payment Cancelled</h1>
              <p className="text-gray-500 font-medium">
                The payment process was cancelled or timed out. Don't worry, your order is still saved.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => router.push("/customer/checkout")}
                className="h-14 bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]"
              >
                Try Again <RefreshCw className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => router.push("/customer/cart")}
                variant="ghost"
                className="h-14 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all"
              >
                Return to Cart <ArrowLeft className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl text-left border border-orange-100 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="text-orange-500 font-bold text-sm">!</span>
              </div>
              <p className="text-xs text-orange-800 font-medium leading-relaxed">
                If money was deducted from your account, please contact our support team with your Order ID.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
