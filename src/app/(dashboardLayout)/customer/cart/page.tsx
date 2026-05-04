/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCartWishlist } from "@/hooks/useCartWishlist";
import { clearCart } from "@/services/customer.service";
import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Loader2, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  ArrowRight,
  PackageCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ICartItem } from "@/types/customer.types";

export default function CartPage() {
  const queryClient = useQueryClient();
  const { 
    cartData, 
    isCartLoading: isLoading, 
    totalAmount: totalPrice,
    handleUpdateCartQuantity,
    handleRemoveFromCart
  } = useCartWishlist();

  const cartItems = cartData?.items || [];

  const handleClearCart = async () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart();
        queryClient.invalidateQueries({ queryKey: ["customer-cart"] });
        toast.success("Cart cleared");
      } catch (error) {
        toast.error("Failed to clear cart");
      }
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#151515]">My Shopping Cart</h1>
          <p className="text-[13px] text-gray-500 mt-1">Review your items and proceed to checkout</p>
        </div>
        {cartItems.length > 0 && (
          <Button 
            onClick={handleClearCart}
            variant="ghost" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
          >
            Clear Cart
          </Button>
        )}
      </div>

      {isLoading && cartItems.length === 0 ? (
        <div className="flex justify-center p-20">
          <Loader2 className="w-10 h-10 text-[#fb6c08] animate-spin" />
        </div>
      ) : cartItems.length === 0 ? (
        <Card className="border-dashed border-gray-200 shadow-none py-20">
          <CardContent className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-orange-200" />
            </div>
            <h3 className="text-xl font-bold text-[#151515] mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/shop">
              <Button className="bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-xl px-8 h-11 shadow-md">
                Browse Medicines
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item: ICartItem) => (
              <Card key={item.id} className="border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:border-gray-200 transition-all bg-white">
                <CardContent className="p-4 flex gap-5">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 p-2">
                    <Image 
                      src={item.image || "/product-placeholder.jpg"} 
                      alt={item.name || "Medicine"} 
                      width={80} 
                      height={80} 
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-[#151515] text-[16px] line-clamp-1">{item.name || "Medicine"}</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                          {item.category || "Medicine"}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg p-1">
                        <Button 
                          onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-bold text-[#151515]">{item.quantity}</span>
                        <Button 
                          onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md hover:bg-white hover:shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-lg font-black text-[#063c28]">৳{item.subtotal || 0}</span>
                        <p className="text-[10px] text-gray-400 font-medium">৳{item.price || 0} / unit</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-[#063c28] text-white p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-[#151515]">৳{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="font-bold text-[#059669]">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Charge</span>
                    <span className="font-bold text-[#151515]">৳0</span>
                  </div>
                  <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between">
                    <span className="text-base font-bold text-[#151515]">Total Payable</span>
                    <span className="text-2xl font-black text-[#fb6c08]">৳{totalPrice}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button className="w-full bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-2xl h-12 font-bold shadow-[0_4px_16px_rgba(251,108,8,0.3)] group transition-all">
                    Checkout Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="flex items-center gap-2 justify-center py-2 px-3 bg-gray-50 rounded-xl">
                    <PackageCheck className="w-4 h-4 text-[#059669]" />
                    <span className="text-[10px] font-bold text-[#059669] uppercase tracking-wider">Fast Delivery Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm rounded-2xl bg-gradient-to-br from-white to-gray-50/50">
              <CardContent className="p-5">
                <h5 className="font-bold text-[#151515] text-[14px] mb-3">Accepted Payments</h5>
                <div className="flex gap-3">
                  {['Bkash', 'Nagad', 'Visa', 'Mastercard'].map((p) => (
                    <div key={p} className="h-8 w-12 bg-white border border-gray-100 rounded-md flex items-center justify-center text-[8px] font-bold text-gray-400">
                      {p}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
