/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCartWishlist } from "@/hooks/useCartWishlist";
import { useAuth } from "@/providers/AuthProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ICartItem } from "@/types/customer.types";

export default function CartSheet() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  
  const { 
    cartData, 
    isCartLoading: isLoading, 
    cartCount: count, 
    totalAmount, 
    handleUpdateCartQuantity, 
    handleRemoveFromCart 
  } = useCartWishlist();

  const cartItems = cartData?.items || [];

  if (!user || user.role !== "CUSTOMER") {
    return (
      <Link
        href="/login"
        className="relative p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <ShoppingBag className="w-5 h-5" />
      </Link>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label={`Cart, ${count} item${count !== 1 ? "s" : ""}`}
          className="relative p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 outline-none"
        >
          <ShoppingBag className="w-5 h-5" />
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-shop_orange text-white text-[10px] font-bold rounded-full leading-none border-2 border-shop_dark_green"
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-gray-100 bg-white">
        <SheetHeader className="p-6 border-b border-gray-50">
          <SheetTitle className="flex items-center gap-3 text-xl font-bold text-darkColor">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-shop_orange" />
            </div>
            Shopping Cart
            <span className="ml-auto text-xs font-medium text-lightColor bg-gray-50 px-2.5 py-1 rounded-full">
              {count} {count === 1 ? "Item" : "Items"}
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your shopping cart items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading && cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-lightColor gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-shop_orange" />
              <p className="text-sm font-medium">Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-darkColor mb-2">Your cart is empty</h3>
              <p className="text-sm text-lightColor max-w-[240px] mb-8">
                {"Looks like you haven't added any medicines yet."}
              </p>
              <Button
                onClick={() => setOpen(false)}
                asChild
                className="bg-shop_orange hover:bg-shop_orange/90 text-white rounded-xl px-8 h-11"
              >
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <div className="py-6 space-y-5">
                {cartItems.map((item: ICartItem) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 p-2 border border-gray-100 group-hover:border-orange-100 transition-colors">
                      <Image
                        src={item.image || "/product-placeholder.jpg"}
                        alt={item.name || "Medicine"}
                        width={60}
                        height={60}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-darkColor text-[14px] line-clamp-1 group-hover:text-shop_orange transition-colors">
                            {item.name || "Medicine"}
                          </h4>
                          <p className="text-[10px] text-lightColor font-bold uppercase tracking-wider">
                            {item.category || "Medicine"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg p-0.5">
                          <Button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-md hover:bg-white hover:shadow-sm p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-xs font-bold text-darkColor">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-md hover:bg-white hover:shadow-sm p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-shop_dark_green">
                            ৳{item.subtotal || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="p-6 border-t border-gray-50 bg-gray-50/30 flex-col sm:flex-col gap-4">
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-lightColor">Subtotal</span>
                <span className="text-darkColor font-bold">৳{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-darkColor">Total</span>
                <span className="text-xl font-black text-shop_orange">৳{totalAmount}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 text-lightColor font-bold h-12"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/customer/cart">View Cart</Link>
              </Button>
              <Button
                className="bg-shop_orange hover:bg-shop_orange/90 text-white rounded-xl font-bold h-12 shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/customer/checkout" className="flex items-center justify-center gap-2">
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
