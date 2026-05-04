/* eslint-disable react/no-unescaped-entities */
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
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function WishlistSheet() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { 
    wishlistData: wishlist = [], 
    isWishlistLoading: isLoading, 
    wishlistCount: count,
    handleRemoveFromWishlist,
    handleMoveToCart,
    isAddingToCart
  } = useCartWishlist();

  if (!user || user.role !== "CUSTOMER") {
    return (
      <Link
        href="/login"
        className="relative p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <Heart className="w-5 h-5" />
      </Link>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label={`Wishlist, ${count} item${count !== 1 ? "s" : ""}`}
          className="relative p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 outline-none"
        >
          <Heart className="w-5 h-5" />
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full leading-none border-2 border-shop_dark_green"
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-gray-100 bg-white">
        <SheetHeader className="p-6 border-b border-gray-50">
          <SheetTitle className="flex items-center gap-3 text-xl font-bold text-darkColor">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            My Wishlist
            <span className="ml-auto text-xs font-medium text-lightColor bg-gray-50 px-2.5 py-1 rounded-full">
              {count} {count === 1 ? "Item" : "Items"}
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            View and manage items you've saved for later.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading && wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-lightColor gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
              <p className="text-sm font-medium">Loading wishlist...</p>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-darkColor mb-2">Wishlist is empty</h3>
              <p className="text-sm text-lightColor max-w-[240px] mb-8">
                Save your favorite medicines here to buy them later.
              </p>
              <Button
                onClick={() => setOpen(false)}
                asChild
                className="bg-shop_dark_green hover:bg-shop_dark_green/90 text-white rounded-xl px-8 h-11"
              >
                <Link href="/shop">Explore Shop</Link>
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <div className="py-6 space-y-5">
                {wishlist.map((item: any) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 p-2 border border-gray-100 group-hover:border-rose-100 transition-colors">
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
                          <h4 className="font-bold text-darkColor text-[14px] line-clamp-1 group-hover:text-rose-500 transition-colors">
                            {item.name || "Medicine"}
                          </h4>
                          <p className="text-[10px] text-lightColor font-bold uppercase tracking-wider">
                            {item.category || "Medicine"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-sm font-bold text-shop_dark_green">
                          ৳{item.price || 0}
                        </div>
                        <Button
                          onClick={() => handleMoveToCart(item, item.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 gap-2 px-2"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">
                            Add to Cart
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="p-6 border-t border-gray-50 bg-gray-50/30">
          <Button
            variant="outline"
            className="w-full rounded-xl border-gray-200 text-lightColor font-bold h-12"
            onClick={() => setOpen(false)}
            asChild
          >
            <Link href="/customer/wishlist">Go to Wishlist Page</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
