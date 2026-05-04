"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Star, ShoppingCart, Database, RefreshCw, Loader2 } from "lucide-react";
import { medicineService } from "@/services/medicine.service";
import { useCartWishlist } from "@/hooks/useCartWishlist";

type Product = {
  id: string;
  name: string;
  image?: string;
  price: number;
  originalPrice?: number;
  stock?: number;
  avgRating?: number;
  reviewCount?: number;
  category?: { name: string };
  manufacturer?: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const stock = product.stock ?? 50;
  const { handleAddToCart, isAddingToCart, isInCart } = useCartWishlist();
  const inCart = isInCart(product.id);

  const getStock = () => {
    if (stock > 20) return { text: "In Stock", color: "text-green-600" };
    if (stock > 0) return { text: "Low Stock", color: "text-orange-500" };
    return { text: "Out of Stock", color: "text-red-500" };
  };

  const stockStatus = getStock();

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition p-3 group">
      <Link href={`/shop/${product.id}`} className="relative block h-32 w-full rounded-lg overflow-hidden mb-3 bg-gray-50">
        <Image
          src={product.image || "/product-placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-shop_orange text-white rounded">
          BEST SELLER
        </span>
      </Link>

      <p className="text-[10px] text-green-600 font-medium uppercase">
        {product.category?.name || "Medicine"}
      </p>

      <Link href={`/shop/${product.id}`}>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mt-1 hover:text-green-700 transition">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3"
            fill={i < Math.floor(product.avgRating || 4) ? "#fb6c08" : "none"}
            stroke="#fb6c08"
          />
        ))}
        <span className="text-[10px] text-gray-500">
          ({product.reviewCount || 0})
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm font-bold text-green-700">
          ৳{product.price}
        </span>
        {product.originalPrice && (
          <span className="text-[11px] line-through text-gray-400">
            ৳{product.originalPrice}
          </span>
        )}
      </div>

      <p className={`text-[10px] mt-1 ${stockStatus.color}`}>
        {stockStatus.text}
      </p>

      <button
        onClick={() => handleAddToCart(product.id, 1)}
        disabled={stock === 0 || isAddingToCart}
        className={`mt-3 w-full flex items-center justify-center gap-1 text-white text-xs py-2 rounded-lg transition disabled:opacity-50 ${
          inCart ? "bg-shop_dark_green" : "bg-shop_orange hover:bg-shop_orange/90"
        }`}
      >
        {isAddingToCart ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <ShoppingCart className="w-3 h-3" />
        )}
        {isAddingToCart ? "Adding..." : inCart ? "In Cart" : "Add"}
      </button>
    </div>
  );
};

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-3 animate-pulse">
    <div className="h-32 w-full bg-gray-200 rounded-lg mb-3"></div>
    <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
      ))}
    </div>
    <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-16 mb-3"></div>
    <div className="h-8 bg-gray-200 rounded w-full"></div>
  </div>
);

export default function BestSellingSection() {
  const {
    data: products = [],
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
  } = useQuery({
    queryKey: ["best-selling", "medicines"],
    queryFn: () => medicineService.getBestSelling({ limit: 4 }),
    staleTime: 10 * 60 * 1000,      // 10 minutes - data stays fresh
    gcTime: 60 * 60 * 1000,         // 1 hour - keep in cache
    retry: 2,
    placeholderData: (previousData) => previousData, // Show cached data instantly
    refetchOnWindowFocus: false,
  });

  // Show loading skeletons only on first load
  if (isLoading && products.length === 0) {
    return (
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-64 bg-gray-200 rounded mt-2 animate-pulse"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-14 bg-[#f6f6f6]">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
          <p className="text-red-500 text-sm">Failed to load products</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-orange-500 hover:underline"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-14 bg-[#f6f6f6]">
      <div className="max-w-[1100px] mx-auto px-4">

        {/* Header with Cache Status */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#063c28] flex items-center gap-2">
              Best Selling Medicines
              {isPlaceholderData && !isFetching && (
                <span className="inline-flex items-center gap-1 text-[10px] font-normal text-gray-400 bg-white px-2 py-0.5 rounded-full">
                  <Database className="w-2.5 h-2.5" />
                  cached
                </span>
              )}
              {isFetching && !isLoading && (
                <span className="inline-flex items-center gap-1 text-[10px] font-normal text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
                  <RefreshCw className="w-2.5 h-2.5" />
                  updating
                </span>
              )}
            </h2>
            <p className="text-xs text-gray-500">
              The most trusted health solutions by our community.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-orange-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Products Grid */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}