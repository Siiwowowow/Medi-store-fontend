"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Medicine } from "@/services/medicine.service";

export default function MedicineCard({ 
  medicine, 
  view = "grid" 
}: { 
  medicine: Medicine; 
  view?: "grid" | "list";
}) {
  const [wished, setWished] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const isOut = medicine.stock === 0;
  const isLow = medicine.stock > 0 && medicine.stock <= 5;
  const discount = medicine.originalPrice
    ? Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)
    : 0;

  const badge =
    discount > 0 ? "SALE" : medicine.isNew ? "NEW" : medicine.isBestSeller ? "BEST SELLER" : null;

  const BADGE_BG: Record<string, string> = {
    SALE: "#fb6c08",
    NEW: "#063c28",
    "BEST SELLER": "#151515",
  };

  const href = `/shop/${medicine.slug || medicine.id}`;

  if (view === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col sm:flex-row transition-all duration-200 hover:shadow-md">
        {/* Image Section */}
        <Link href={href} className="relative block h-40 sm:h-auto sm:w-48 bg-gray-50 flex-shrink-0">
          {badge && (
            <span
              className="absolute top-2 left-2 z-10 text-white text-[10px] font-semibold uppercase rounded-full px-2 py-0.5"
              style={{ background: BADGE_BG[badge] }}
            >
              {badge === "SALE" ? `${discount}% OFF` : badge}
            </span>
          )}
          {medicine.image && !imgErr ? (
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              className="object-cover"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </Link>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-semibold uppercase text-green-600">
                  {medicine.category?.name || "MEDICINE"}
                </span>
                <Link href={href}>
                  <h3 className="text-base font-semibold text-gray-800 hover:text-green-700 transition mt-1">
                    {medicine.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1 hidden sm:block">
                  {medicine.description || "High-quality healthcare medicine for your wellbeing."}
                </p>
              </div>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setWished(!wished);
                }}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-all hover:bg-gray-100"
              >
                <Heart
                  className="w-4 h-4"
                  style={{
                    color: wished ? "#f43f5e" : "#9ca3af",
                    fill: wished ? "#f43f5e" : "transparent",
                  }}
                />
              </button>
            </div>

            <div className="flex items-center gap-1 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    style={{
                      fill: i <= Math.round(medicine.avgRating || 0) ? "#fb6c08" : "none",
                      stroke: "#fb6c08",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({medicine.reviewCount || 0} reviews)</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-700">৳{medicine.price}</span>
                {medicine.originalPrice && medicine.originalPrice > medicine.price && (
                  <span className="text-xs line-through text-gray-400">৳{medicine.originalPrice}</span>
                )}
              </div>
              <p className={`text-xs mt-0.5 ${isOut ? "text-red-500" : isLow ? "text-orange-500" : "text-green-600"}`}>
                {isOut ? "Out of Stock" : isLow ? `Only ${medicine.stock} left` : "In Stock"}
              </p>
            </div>

            <div className="flex-1 sm:flex-initial">
              {!isOut ? (
                <button className="w-full sm:w-32 flex items-center justify-center gap-2 bg-orange-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              ) : (
                <button disabled className="w-full sm:w-32 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 text-sm py-2 px-4 rounded-lg cursor-not-allowed">
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* ... existing grid view ... */}
      {/* Image Section - Fixed height like Best Selling */}
      <Link href={href} className="relative block h-32 w-full bg-gray-50 overflow-hidden">
        {/* Badge */}
        {badge && (
          <span
            className="absolute top-2 left-2 z-10 text-white text-[10px] font-semibold uppercase rounded-full px-2 py-0.5"
            style={{ background: BADGE_BG[badge] }}
          >
            {badge === "SALE" ? `${discount}% OFF` : badge}
          </span>
        )}

        {/* Product Image */}
        {medicine.image && !imgErr ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished(!wished);
          }}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white"
        >
          <Heart
            className="w-3.5 h-3.5 transition-all"
            style={{
              color: wished ? "#f43f5e" : "#9ca3af",
              fill: wished ? "#f43f5e" : "transparent",
            }}
          />
        </button>
      </Link>

      {/* Content Section - Same as Best Selling */}
      <div className="p-3">
        {/* Category */}
        <span className="text-[10px] font-semibold uppercase text-green-600">
          {medicine.category?.name || "MEDICINE"}
        </span>

        {/* Product Name */}
        <Link href={href}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mt-1 hover:text-green-700 transition">
            {medicine.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-3 h-3"
                style={{
                  fill: i <= Math.round(medicine.avgRating || 0) ? "#fb6c08" : "none",
                  stroke: "#fb6c08",
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">({medicine.reviewCount || 0})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-green-700">৳{medicine.price}</span>
          {medicine.originalPrice && medicine.originalPrice > medicine.price && (
            <span className="text-[10px] line-through text-gray-400">৳{medicine.originalPrice}</span>
          )}
          {discount > 0 && (
            <span className="text-[9px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              {discount}% off
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={`text-[10px] mt-1 ${
            isOut ? "text-red-500" : isLow ? "text-orange-500" : "text-green-600"
          }`}
        >
          {isOut ? "Out of Stock" : isLow ? `Only ${medicine.stock} left` : "In Stock"}
        </p>

        {/* Add to Cart Button */}
        {!isOut ? (
          <button className="mt-3 w-full flex items-center justify-center gap-1 bg-orange-500 text-white text-xs py-2 rounded-lg hover:bg-orange-600 transition">
            <ShoppingBag className="w-3 h-3" />
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="mt-3 w-full flex items-center justify-center gap-1 bg-gray-100 text-gray-400 text-xs py-2 rounded-lg cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}