/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import { useUser } from "@/hooks/useUser";
import { 
  MapPin, 
  Phone, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { createOrder, initiatePayment } from "@/services/customer.service";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutForm() {
  const { cartData, totalAmount, isCartLoading } = useCartWishlist();
  const { user } = useUser();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    shippingAddress: "",
    phoneNumber: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"STRIPE" | "COD">("STRIPE");

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || user.role !== "CUSTOMER") {
      toast.error("Please login as a customer to place an order");
      router.push("/login");
      return;
    }

    if (!formData.shippingAddress || !formData.phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!cartData?.items || cartData.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      const orderPayload = {
        items: cartData.items.map((item: any) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
        })),
        shippingAddress: formData.shippingAddress,
        phoneNumber: formData.phoneNumber,
        notes: formData.notes,
      };

      const orderRes = await createOrder(orderPayload);
      
      if (orderRes.success && orderRes.data) {
        toast.success("Order placed! Redirecting to payment...");
        
        // Initiate Payment for Online Methods
        if (paymentMethod === "STRIPE") {
          const paymentRes = await initiatePayment(orderRes.data.id, paymentMethod);
          
          if (paymentRes.success && paymentRes.data?.paymentUrl) {
            window.location.href = paymentRes.data.paymentUrl;
            return;
          }
        }
        
        // Fallback for COD or failed online initiation
        toast.success("Order placed successfully!");
        router.push("/customer/orders");
      } else {
        toast.error(orderRes.message || "Failed to place order");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCartLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 text-[#063c28] animate-spin" />
        <p className="text-gray-500 font-medium">Preparing your checkout...</p>
      </div>
    );
  }

  if (!cartData?.items || cartData.items.length === 0) {
    return (
      <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden">
        <CardContent className="p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <Truck className="w-12 h-12 text-gray-300" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500">Add some medicines to your cart before checking out.</p>
          </div>
          <Button 
            onClick={() => router.push("/shop")}
            className="bg-[#063c28] hover:bg-[#0a5a3c] text-white px-8 h-12 rounded-2xl font-bold"
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-8">
            {/* Shipping Information */}
            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#fb6c08]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black">Shipping Details</CardTitle>
                    <CardDescription>Where should we deliver your medicines?</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-gray-400">Full Delivery Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <Textarea 
                        id="address"
                        placeholder="Street address, Apartment, City, Postal Code"
                        className="min-h-[120px] pl-12 rounded-2xl border-gray-100 focus:border-[#fb6c08] focus:ring-[#fb6c08]/10 transition-all font-medium"
                        required
                        value={formData.shippingAddress}
                        onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-gray-400">Contact Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="phone"
                        type="tel"
                        placeholder="+880 1XXX XXXXXX"
                        className="h-14 pl-12 rounded-2xl border-gray-100 focus:border-[#fb6c08] focus:ring-[#fb6c08]/10 transition-all font-bold"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-xs font-black uppercase tracking-widest text-gray-400">Order Notes (Optional)</Label>
                    <Textarea 
                      id="notes"
                      placeholder="Any special instructions for the delivery?"
                      className="min-h-[100px] rounded-2xl border-gray-100 focus:border-[#fb6c08] focus:ring-[#fb6c08]/10 transition-all font-medium"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#063c28]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black">Payment Method</CardTitle>
                    <CardDescription>Choose how you want to pay</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                {/* Stripe Option */}
                <div 
                  onClick={() => setPaymentMethod("STRIPE")}
                  className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "STRIPE" 
                    ? "border-[#fb6c08] bg-[#fb6c08]/5" 
                    : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Image src="https://img.icons8.com/color/96/visa.png" alt="Visa" width={32} height={32} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900">Online Payment</h4>
                    <p className="text-xs text-gray-500 font-medium">Safe & Encrypted payment processed by Stripe</p>
                  </div>
                  {paymentMethod === "STRIPE" && <CheckCircle2 className="w-6 h-6 text-[#fb6c08]" />}
                </div>

                {/* COD Option */}
                <div 
                  onClick={() => setPaymentMethod("COD")}
                  className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "COD" 
                    ? "border-[#fb6c08] bg-[#fb6c08]/5" 
                    : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Truck className="w-10 h-10 text-[#063c28]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900">Cash on Delivery</h4>
                    <p className="text-xs text-gray-500 font-medium">Pay with cash when your medicines arrive</p>
                  </div>
                  {paymentMethod === "COD" && <CheckCircle2 className="w-6 h-6 text-[#fb6c08]" />}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden sticky top-24">
            <CardHeader className="bg-[#063c28] text-white p-8">
              <CardTitle className="text-2xl font-black">Order Summary</CardTitle>
              <p className="text-white/60 text-sm font-medium">Review your items before payment</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                {cartData?.items?.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                      <Image 
                        src={item.image || "/medicine-placeholder.jpg"} 
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity} × ৳{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#063c28]">৳{item.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">৳{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping Fee</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-100">
                  <span className="text-lg font-black text-gray-900">Total Payable</span>
                  <span className="text-3xl font-black text-[#fb6c08]">৳{totalAmount}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3 mb-6">
                  <ShieldCheck className="w-5 h-5 text-[#063c28] mt-0.5" />
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Your payment is secured with industry-standard encryption. By placing this order, you agree to our <span className="font-bold text-[#063c28]">Terms & Conditions</span>.
                  </p>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 bg-[#fb6c08] hover:bg-[#e05e07] text-white rounded-[24px] text-lg font-black shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin mr-2" /> Processing...
                    </>
                  ) : (
                    <>
                      Complete Purchase <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
