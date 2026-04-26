"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Package, AlertCircle } from "lucide-react";
import { categoryService } from "./categories.service";

// Fallback icons for categories
const categoryIcons: Record<string, string> = {
  "Pain Relief": "💊",
  "Cold & Flu": "🤧",
  "Vitamins": "💪",
  "Digestive Health": "🍽️",
  "Skin Care": "🧴",
  "First Aid": "🩹",
  "Allergy": "🌿",
  "Antibiotics": "💊",
  "Diabetes Care": "🩺",
  "Blood Pressure": "❤️",
  "default": "📦"
};

const getCategoryIcon = (name: string): string => {
  return categoryIcons[name] || categoryIcons.default;
};

export default function CategoriesSection() {
  const {
    data: categories = [], // ✅ Default to empty array
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", "homepage"],
    queryFn: () => categoryService.getAllCategories({ limit: 8 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // ✅ Add these options for better error handling
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Loading State
  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-[#f6f6f6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <div className="h-8 w-48 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse shadow-sm">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mx-auto w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mx-auto w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-12 md:py-16 bg-[#f6f6f6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-[#fb6c08] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#151515] mb-2">Unable to load categories</h3>
            <p className="text-[#52525b] mb-4">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#063d29] text-white rounded-[10px] text-sm font-semibold hover:bg-[#052e1f] transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (!categories || categories.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-[#f6f6f6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center">
            <Package className="w-12 h-12 text-[#52525b] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#151515] mb-2">No categories found</h3>
            <p className="text-[#52525b]">Check back later for new categories.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-[#f6f6f6]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3" style={{ color: "#063c28" }}>
            Shop by Categories
          </h2>
          <p className="text-[#52525b] max-w-2xl mx-auto">
            Browse our top categories and find your medicine
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group bg-white rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-gray-100"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#fcf0e4] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span>{getCategoryIcon(category.name)}</span>
                )}
              </div>
              
              <h3 className="font-semibold text-sm mb-1 line-clamp-1" style={{ color: "#151515" }}>
                {category.name}
              </h3>
              
              <p className="text-xs" style={{ color: "#fb6c08" }}>
                {category._count?.medicines || 0} items
              </p>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
            style={{ color: "#063c28" }}
          >
            View All Categories
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}