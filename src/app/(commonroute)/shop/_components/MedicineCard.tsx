"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface MedicineCardProps {
  medicine: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    category?: { name: string };
    avgRating?: number;
    reviewCount?: number;
    stock: number;
    manufacturer?: string;
    strength?: string;
  };
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  const discount = medicine.originalPrice
    ? Math.round(
        ((medicine.originalPrice - medicine.price) /
          medicine.originalPrice) *
          100
      )
    : 0;

  const isOutOfStock = medicine.stock === 0;
  const isLowStock = medicine.stock > 0 && medicine.stock <= 5;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 relative flex flex-col h-full">

      {/* ❤️ Wishlist */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow-sm"
      >
        <Heart
          className={`w-4 h-4 ${
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* 🖼 Image */}
      <Link
        href={`/shop/${medicine.id}`}
        className="relative block bg-gray-50 aspect-square"
      >
        {medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain  group-hover:scale-105 transition"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-gray-400">
            No Image
          </div>
        )}

        {/* Discount */}
        {discount > 0 && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}

        {/* Out of stock */}
        {isOutOfStock && (
          <span className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-semibold text-red-500">
            Out of Stock
          </span>
        )}
      </Link>

      {/* 📦 Content */}
      <div className="p-2 sm:p-3 flex flex-col flex-1 justify-between">

        {/* TOP */}
        <div className="space-y-1">

          {/* Category */}
          <p className="text-[9px] sm:text-[10px] uppercase text-green-600 font-semibold line-clamp-1">
            {medicine.category?.name || "Medicine"}
          </p>

          {/* Title */}
          <Link href={`/shop/${medicine.id}`}>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 hover:text-shop_dark_green min-h-[32px]">
              {medicine.name}
            </h3>
          </Link>

          {/* Manufacturer (hide on mobile) */}
          <p className="hidden sm:block text-[11px] text-gray-500 line-clamp-1">
            {medicine.manufacturer} {medicine.strength && `• ${medicine.strength}`}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                  fill={
                    i <= Math.round(medicine.avgRating || 4)
                      ? "#f59e0b"
                      : "none"
                  }
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <span className="text-[9px] text-gray-500">
              ({medicine.reviewCount || 0})
            </span>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-2 space-y-1">

          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="text-sm sm:text-base font-bold text-shop_dark_green">
              ৳{medicine.price}
            </span>

            {medicine.originalPrice &&
              medicine.originalPrice > medicine.price && (
                <span className="text-[9px] line-through text-gray-400">
                  ৳{medicine.originalPrice}
                </span>
              )}
          </div>

          {/* Low stock */}
          {isLowStock && (
            <p className="text-[9px] text-orange-500">
              Only {medicine.stock} left
            </p>
          )}

          {/* Button */}
          {!isOutOfStock && (
            <button className="w-full mt-1 flex items-center justify-center gap-1 bg-shop_orange hover:bg-[#e05e06] text-white text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2 rounded-lg transition">
              <ShoppingCart className="w-3 h-3" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}