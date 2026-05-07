/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Tag,
  Factory,
  Activity,
  Package,
} from "lucide-react";
import { useCartWishlist } from "@/hooks/useCartWishlist";

export default function MedicineCard({ medicine, viewMode = "grid", priority = false }: { medicine: any, viewMode?: "grid" | "list", priority?: boolean }) {
  const { 
    handleAddToCart, 
    handleAddToWishlist, 
    isInCart,
    isInWishlist
  } = useCartWishlist();

  const inCart = isInCart(medicine.id);
  const inWishlist = isInWishlist(medicine.id);

  const discount = medicine.originalPrice
    ? Math.round(
        ((medicine.originalPrice - medicine.price) /
          medicine.originalPrice) *
          100
      )
    : 0;

  const isOutOfStock = medicine.stock === 0;
  const isLowStock = medicine.stock > 0 && medicine.stock <= 5;

  // Truncate long text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "N/A";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-[380px] sm:h-[400px] overflow-hidden relative">
      
      {/* ❤️ Wishlist Button */}
      <button
        onClick={() => handleAddToWishlist(medicine)}
        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-rose-50 transition-all duration-200 hover:scale-110"
      >
        <Heart className={`w-4 h-4 ${inWishlist ? "text-rose-500 fill-rose-500" : "text-gray-500 hover:text-rose-500"}`} />
      </button>

      {/* 🖼️ Image Section - Fixed Height */}
      <Link href={`/shop/${medicine.id}`} className="relative block h-[160px] sm:h-[170px] w-full overflow-hidden bg-gray-100 flex-shrink-0">
        {medicine.image ? (
          <>
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && !isOutOfStock && (
          <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-shop_orange to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
            -{discount}%
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white/95 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Low Stock Badge */}
        {isLowStock && !isOutOfStock && (
          <span className="absolute bottom-2 left-2 z-20 bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md">
            Only {medicine.stock} left
          </span>
        )}
      </Link>

      {/* 📦 Content Section - Fixed Heights to Prevent Breaking */}
      <div className="flex flex-col flex-1 p-3 bg-white min-h-0">
        
        {/* Category - Fixed height single line */}
        <div className="flex items-center gap-1 h-5 flex-shrink-0">
          <Tag className="w-3 h-3 text-shop_orange flex-shrink-0" />
          <span className="text-[9px] font-medium text-shop_orange uppercase tracking-wide truncate">
            {medicine.category?.name || "Medicine"}
          </span>
        </div>

        {/* Medicine Name - Fixed height 2 lines */}
        <Link href={`/shop/${medicine.id}`} className="block h-10 flex-shrink-0 mt-1">
          <h3 className="text-sm font-bold text-darkColor line-clamp-2 hover:text-shop_dark_green transition-colors leading-tight">
            {truncateText(medicine.name, 50)}
          </h3>
        </Link>

        {/* Brand & Strength Row - Fixed height single line each */}
        <div className="mt-2 space-y-1.5 flex-shrink-0">
          {/* Brand - Single line with truncate */}
          <div className="flex items-center gap-1 min-w-0">
            <Factory className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <span className="text-[10px] text-gray-600 truncate flex-1">
              {truncateText(medicine.manufacturer, 25) || "Generic"}
            </span>
          </div>

          {/* Strength - Single line with truncate */}
          <div className="flex items-center gap-1 min-w-0">
            <Activity className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <span className="text-[10px] text-gray-600 truncate flex-1">
              {truncateText(medicine.strength, 25) || "N/A"}
            </span>
          </div>
        </div>

        {/* Rating - Fixed height */}
        <div className="flex items-center gap-1.5 mt-2 h-5 flex-shrink-0">
          <div className="flex flex-shrink-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5"
                fill={i <= Math.round(medicine.avgRating || 4) ? "#f59e0b" : "none"}
                stroke="#f59e0b"
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-[10px] font-semibold text-gray-700 flex-shrink-0">
            {medicine.avgRating?.toFixed(1) || "4.5"}
          </span>
          <span className="text-[9px] text-gray-400 truncate flex-shrink">
            ({medicine.reviewCount || 0})
          </span>
        </div>

        {/* Price & Action Row - Fixed height at bottom */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 h-12 flex-shrink-0">
          {/* Price */}
          <div className="flex-shrink-0">
            <span className="text-base font-bold text-shop_dark_green">
              ৳{medicine.price?.toLocaleString() || 0}
            </span>
            {medicine.originalPrice && medicine.originalPrice > medicine.price && (
              <span className="ml-1 text-[8px] text-gray-400 line-through">
                ৳{medicine.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Fixed width */}
          <button
            onClick={() => handleAddToCart(medicine)}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1 w-[90px] sm:w-[100px] py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all duration-200 active:scale-95 flex-shrink-0 ${
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : inCart
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-shop_orange text-white hover:bg-[#e05e06] shadow-sm hover:shadow-md"
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            {isOutOfStock ? "Out" : inCart ? "In Cart" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}