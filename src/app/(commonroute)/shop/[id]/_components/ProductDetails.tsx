"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  X,
  Loader2
} from "lucide-react";
import Image from "next/image";
import type { Medicine } from "@/services/medicine.service";
import { useCartWishlist } from "@/hooks/useCartWishlist";

interface ProductDetailsProps {
  medicine: Medicine;
}

export default function ProductDetails({ medicine }: ProductDetailsProps) {
  const [thumbnail, setThumbnail] = useState(medicine.image || "");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("description");
  
  const { 
    handleAddToCart, 
    handleAddToWishlist, 
    isAddingToCart, 
    isAddingToWishlist,
    isInCart,
    isInWishlist 
  } = useCartWishlist();

  const inCart = isInCart(medicine.id);
  const inWishlist = isInWishlist(medicine.id);

  const productImages = medicine.image ? [medicine.image] : [];
  const allImages = productImages.length > 0 ? productImages : [];

  const isOutOfStock = medicine.stock === 0;
  const isLowStock = medicine.stock > 0 && medicine.stock <= 5;
  const discount = medicine.originalPrice
    ? Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)
    : 0;

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT - Image Panel */}
        <div>
          {/* Main Image */}
          <div className="relative bg-[#f6f6f6] rounded-2xl border border-gray-100 flex items-center justify-center aspect-square">
            {thumbnail ? (
              <Image 
                src={thumbnail} 
                alt={medicine.name} 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-gray-300" />
              </div>
            )}
            {/* Badge */}
            {(medicine.isBestSeller || discount > 0) && (
              <span className="absolute top-4 left-4 bg-shop_orange text-white text-[10px] font-bold px-3 py-1.5 rounded-br-xl rounded-tl-xl">
                {medicine.isBestSeller ? "BEST SELLER" : `${discount}% OFF`}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 0 && (
            <div className="mt-4 flex gap-3">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setThumbnail(img)}
                  className={`w-[72px] h-[72px] relative rounded-xl border-2 overflow-hidden bg-[#f6f6f6] cursor-pointer transition ${
                    thumbnail === img 
                      ? "border-shop_dark_green bg-shop_light_pink/50" 
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumb ${idx + 1}`} 
                    fill
                    sizes="72px"
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - Product Info */}
        <div>
          {/* Category Pill */}
          <span className="inline-block bg-shop_light_pink text-shop_dark_green text-xs font-bold rounded-full px-3 py-1.5">
            {medicine.category?.name || "MEDICINE"}
          </span>

          {/* Name */}
          <h1 className="text-[30px] font-bold text-darkColor mt-2 leading-tight">
            {medicine.name}
          </h1>

          {/* Generic Name */}
          {medicine.genericName && (
            <p className="italic text-[15px] text-lightColor mt-1">{medicine.genericName}</p>
          )}

          {/* Rating Row */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4"
                  fill={i <= Math.round(medicine.avgRating || 4.5) ? "#fb6c08" : "none"}
                  stroke="#fb6c08"
                />
              ))}
            </div>
            <span className="font-bold text-darkColor">{medicine.avgRating?.toFixed(1) || "4.8"}</span>
            <Link href="#reviews" className="text-sm text-shop_dark_green underline underline-offset-2">
              ({medicine.reviewCount || 234} reviews)
            </Link>
          </div>

          {/* Seller Row */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-lightColor">Sold by</span>
            <span className="text-sm text-shop_dark_green font-semibold">MediStore</span>
            <span className="bg-[#3b9c3c]/10 text-[#3b9c3c] text-[10px] font-bold rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <Check className="w-2.5 h-2.5" /> Verified
            </span>
          </div>

          {/* Divider */}
          <div className="mt-5 border-t border-gray-100"></div>

          {/* Price Block */}
          <div className="mt-5">
            {medicine.originalPrice && medicine.originalPrice > medicine.price && (
              <p className="text-xl line-through text-gray-400">৳{medicine.originalPrice.toLocaleString()}</p>
            )}
            <div className="flex items-center gap-3">
              <span className="text-[40px] font-bold text-shop_dark_green leading-none">
                ৳{medicine.price.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="bg-shop_orange text-white rounded-full px-3 py-1 text-sm font-bold">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-3 flex items-center gap-2">
            {!isOutOfStock ? (
              <>
                <div className="w-2 h-2 rounded-full bg-[#3b9c3c]"></div>
                <span className="text-[#3b9c3c] font-semibold text-sm">In Stock</span>
              </>
            ) : isLowStock ? (
              <>
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-amber-600 font-semibold text-sm">Only {medicine.stock} left</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-red-500" />
                <span className="text-red-500 font-semibold text-sm">Out of Stock</span>
              </>
            )}
          </div>

          {/* Dosage Info */}
          <div className="mt-4 bg-[#f1f3f8] rounded-xl p-3.5">
            <p className="text-[13px] text-lightColor">
              💊 Dosage: {medicine.strength || "500mg"} — Take as directed by physician
            </p>
          </div>

          {/* Quantity Row */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-[14px] font-semibold text-darkColor">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-l-lg border border-shop_dark_green text-shop_dark_green font-bold hover:bg-shop_dark_green hover:text-white transition"
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <span className="w-14 h-10 text-center border-y border-shop_dark_green font-bold text-darkColor bg-white flex items-center justify-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                className="w-10 h-10 rounded-r-lg border border-shop_dark_green text-shop_dark_green font-bold hover:bg-shop_dark_green hover:text-white transition"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>

          {/* CTA Row */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleAddToCart(medicine, quantity)}
              disabled={isOutOfStock}
              className={`flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-shop_orange text-white hover:bg-shop_orange/90 shadow-[0_4px_16px_rgba(251,108,8,0.35)]"
              }`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {isOutOfStock ? "Out of Stock" : inCart ? "In Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => handleAddToWishlist(medicine)}
              className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center hover:border-red-300 transition hover:bg-rose-50"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "text-rose-500 fill-rose-500" : "text-gray-400 hover:text-rose-500"}`} />
            </button>
          </div>

          {/* Accordion Sections */}
          <div className="mt-8">
            {/* Description */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("description")}
                className="w-full py-4 flex justify-between items-center"
              >
                <span className="font-semibold text-darkColor">Description</span>
                {openAccordion === "description" ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openAccordion === "description" && (
                <div className="pb-4">
                  <p className="text-[14px] text-lightColor leading-relaxed">{medicine.description}</p>
                </div>
              )}
            </div>

            {/* Manufacturer Info */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("manufacturer")}
                className="w-full py-4 flex justify-between items-center"
              >
                <span className="font-semibold text-darkColor">Manufacturer Info</span>
                {openAccordion === "manufacturer" ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openAccordion === "manufacturer" && (
                <div className="pb-4 space-y-2">
                  <p className="text-[14px] text-lightColor">
                    <span className="font-medium text-darkColor">Manufacturer:</span> {medicine.manufacturer}
                  </p>
                  {medicine.genericName && (
                    <p className="text-[14px] text-lightColor">
                      <span className="font-medium text-darkColor">Generic Name:</span> {medicine.genericName}
                    </p>
                  )}
                  {medicine.dosageForm && (
                    <p className="text-[14px] text-lightColor">
                      <span className="font-medium text-darkColor">Dosage Form:</span> {medicine.dosageForm}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Dosage Guide */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleAccordion("dosage")}
                className="w-full py-4 flex justify-between items-center"
              >
                <span className="font-semibold text-darkColor">Dosage Guide</span>
                {openAccordion === "dosage" ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openAccordion === "dosage" && (
                <div className="pb-4">
                  <p className="text-[14px] text-lightColor leading-relaxed">
                    Take {medicine.strength || "1 tablet"} as directed by your physician. 
                    Do not exceed the recommended dose. Consult your doctor before use.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}