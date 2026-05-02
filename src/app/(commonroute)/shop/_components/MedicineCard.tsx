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
} from "lucide-react";
import { useState } from "react";

export default function MedicineCard({ medicine }: any) {
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
    <div className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition flex flex-col h-[360px] sm:h-[340px] overflow-hidden relative">

      {/* ❤️ Wishlist */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow"
      >
        <Heart
          className={`w-4 h-4 ${
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* 🖼 Image */}
      <Link href={`/shop/${medicine.id}`} className="relative bg-gray-50 h-[130px] sm:h-[140px]">
        {medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-gray-400">
            No Image
          </div>
        )}

        {discount > 0 && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-shop_orange text-white text-[10px] px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </Link>

      {/* 📦 Content */}
      <div className="flex flex-col flex-1 p-2 sm:p-3 justify-between">

        {/* 🔝 TOP */}
        <div className="space-y-1 text-[10px] sm:text-[11px]">

          {/* Name */}
          <Link href={`/shop/${medicine.id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-darkColor line-clamp-2 min-h-[34px] sm:min-h-[36px]">
              {medicine.name}
            </h3>
          </Link>

          {/* INFO BLOCK (Reusable style) */}
          <div className="space-y-1">

            {/* Category */}
            <div className="flex items-start gap-1">
              <Tag className="w-3 h-3 text-lightColor mt-[2px]" />
              <div className="flex flex-col sm:flex-row sm:gap-1 leading-tight">
                <span className="font-medium text-darkColor">Category:</span>
                <span className="text-lightColor">
                  {medicine.category?.name || "Medicine"}
                </span>
              </div>
            </div>

            {/* Brand */}
            <div className="flex items-start gap-1">
              <Factory className="w-3 h-3 text-lightColor mt-[2px]" />
              <div className="flex flex-col sm:flex-row sm:gap-1 leading-tight">
                <span className="font-medium text-darkColor">Brand:</span>
                <span className="text-lightColor">
                  {medicine.manufacturer || "N/A"}
                </span>
              </div>
            </div>

            {/* Strength */}
            <div className="flex items-start gap-1">
              <Activity className="w-3 h-3 text-lightColor mt-[2px]" />
              <div className="flex flex-col sm:flex-row sm:gap-1 leading-tight">
                <span className="font-medium text-darkColor">Strength:</span>
                <span className="text-lightColor">
                  {medicine.strength || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  fill={
                    i <= Math.round(medicine.avgRating || 4)
                      ? "#f59e0b"
                      : "none"
                  }
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] text-lightColor">
              ({medicine.reviewCount || 0})
            </span>
          </div>
        </div>

        {/* 🔻 BOTTOM */}
        <div className="space-y-1 mt-2">

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-shop_dark_green">
              ৳{medicine.price}
            </span>

            {medicine.originalPrice &&
              medicine.originalPrice > medicine.price && (
                <span className="text-[9px] sm:text-[10px] line-through text-lightColor">
                  ৳{medicine.originalPrice}
                </span>
              )}
          </div>

          {/* Stock */}
          <div className="h-[14px]">
            {isLowStock && (
              <p className="text-[9px] sm:text-[10px] text-shop_orange">
                Only {medicine.stock} left
              </p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center gap-1 text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2 rounded-lg transition 
            ${
              isOutOfStock
                ? "bg-gray-300"
                : "bg-shop_orange hover:bg-[#e05e06] text-white"
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            {isOutOfStock ? "Unavailable" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}