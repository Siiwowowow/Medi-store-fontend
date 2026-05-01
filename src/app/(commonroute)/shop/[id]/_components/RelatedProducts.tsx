"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import type { Medicine } from "@/services/medicine.service";

interface RelatedProductsProps {
  products: Medicine[];
  currentProductId: string;
}

// Same card style as Shop Page
function RelatedProductCard({ product }: { product: Medicine }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white lg:max-w-[240px] rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Image Section */}
      <Link href={`/shop/${product.id}`} className="relative block h-32 bg-gray-50 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
          </div>
        )}
        {discount > 0 && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-[#fb6c08] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Content Section - Same as Shop Page */}
      <div className="p-3">
        {/* Category */}
        <p className="text-[10px] font-semibold uppercase text-green-600">
          {product.category?.name || "MEDICINE"}
        </p>

        {/* Name */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mt-1 hover:text-[#063c28] transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5"
                fill={i <= Math.round(product.avgRating || 4) ? "#fb6c08" : "none"}
                stroke="#fb6c08"
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-400">({product.reviewCount || 0})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-[#063c28]">৳{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[9px] line-through text-gray-400">৳{product.originalPrice}</span>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock ? (
          <p className="text-[9px] text-red-500 mt-1">Out of Stock</p>
        ) : product.stock <= 5 ? (
          <p className="text-[9px] text-amber-500 mt-1">Only {product.stock} left</p>
        ) : (
          <p className="text-[9px] text-green-600 mt-1">In Stock</p>
        )}

        {/* Button */}
        <button
          disabled={isOutOfStock}
          className="mt-2 w-full bg-[#fb6c08] hover:bg-[#e05e06] text-white text-[11px] font-semibold py-1.5 rounded-lg transition-all active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filter out current product and limit to 4
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#3b9c3c] text-xs font-bold uppercase tracking-wider">You May Also Like</span>
            <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          </div>
          <Link
            href="/shop"
            className="text-sm text-[#063c28] hover:underline flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}