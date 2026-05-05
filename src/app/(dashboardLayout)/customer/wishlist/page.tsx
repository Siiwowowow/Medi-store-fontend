/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCartWishlist } from "@/hooks/useCartWishlist";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { 
    wishlistData: wishlist = [], 
    isWishlistLoading: isLoading,
    handleRemoveFromWishlist,
    handleAddToCart
  } = useCartWishlist();

  return (
    <div className="space-y-6 pb-20 lg:pb-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#151515]">My Wishlist</h1>
          <p className="text-[13px] text-gray-500 mt-1">Keep track of medicines you want to buy later</p>
        </div>
        <Link href="/shop">
          <Button variant="outline" className="rounded-xl border-gray-200 text-[#063c28] font-semibold">
            Continue Shopping
          </Button>
        </Link>
      </div>

      {isLoading && wishlist.length === 0 ? (
        <div className="flex justify-center p-20">
          <Loader2 className="w-10 h-10 text-[#fb6c08] animate-spin" />
        </div>
      ) : wishlist.length === 0 ? (
        <Card className="border-dashed border-gray-200 shadow-none py-20">
          <CardContent className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-red-200" />
            </div>
            <h3 className="text-xl font-bold text-[#151515] mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-8">Save your favorite medicines here to easily find and purchase them later.</p>
            <Link href="/shop">
              <Button className="bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-xl px-8 h-11">
                Explore Medicines
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <Card key={item.id} className="group border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-8 group-hover:bg-gray-100/50 transition-colors">
                  <Image 
                    src={item.image || "/product-placeholder.jpg"} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-6"
                  />
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 shadow-sm transition-all z-10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-[#059669]/10 text-[#059669] border-none text-[10px] uppercase font-bold tracking-wider">
                      {item.category || "Medicine"}
                    </Badge>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#151515] line-clamp-1 group-hover:text-[#063c28] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 min-h-[32px]">
                    {item.description || "High quality medicine for your health needs."}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price</p>
                      <p className="text-xl font-black text-[#063c28]">৳{item.price || 0}</p>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-[#fb6c08] hover:bg-[#e05e06] text-white rounded-xl h-11 px-5 shadow-sm group-hover:shadow-[0_4px_12px_rgba(251,108,8,0.25)] transition-all flex gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}