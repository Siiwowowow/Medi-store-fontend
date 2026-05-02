/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight,
  ChevronLeft,
  Package,
  AlertCircle,
} from "lucide-react";
import { categoryService, type Category } from "./categories.service";

// Map category names to emojis for a professional look
const categoryEmojiMap: Record<string, string> = {
  "Pain Relief": "⚡",
  "Cold & Flu": "🤒",
  "Vitamins": "✨",
  "Digestive Health": "⚕️",
  "Skin Care": "💧",
  "First Aid": "🩹",
  "Allergy": "🤧",
  "Antibiotics": "💊",
  "Diabetes Care": "🩺",
  "Blood Pressure": "❤️",
  "Heart Care": "❤️",
  "Eye Care": "👁️",
  "Bone & Joint": "🦴",
  "Brain & Nerve": "🧠",
  "Baby Care": "👶",
  "Women's Health": "🌸",
  "Immunity": "🛡️",
  "Herbal": "🌿",
  "Injection": "💉",
};

const getCategoryEmoji = (name: string): string => {
  // Try exact match first
  if (categoryEmojiMap[name]) return categoryEmojiMap[name];
  // Try partial match
  const lowerName = name.toLowerCase();
  for (const [key, emoji] of Object.entries(categoryEmojiMap)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return emoji;
    }
  }
  return "💊"; // Default fallback
};

// Gradient colors for category cards (cycles through)
const cardGradients = [
  { bg: "from-emerald-50 to-green-50", icon: "bg-emerald-100 text-emerald-600", border: "border-emerald-100" },
  { bg: "from-blue-50 to-indigo-50", icon: "bg-blue-100 text-blue-600", border: "border-blue-100" },
  { bg: "from-orange-50 to-amber-50", icon: "bg-orange-100 text-orange-600", border: "border-orange-100" },
  { bg: "from-rose-50 to-pink-50", icon: "bg-rose-100 text-rose-600", border: "border-rose-100" },
  { bg: "from-violet-50 to-purple-50", icon: "bg-violet-100 text-violet-600", border: "border-violet-100" },
  { bg: "from-teal-50 to-cyan-50", icon: "bg-teal-100 text-teal-600", border: "border-teal-100" },
  { bg: "from-yellow-50 to-lime-50", icon: "bg-yellow-100 text-yellow-600", border: "border-yellow-100" },
  { bg: "from-fuchsia-50 to-pink-50", icon: "bg-fuchsia-100 text-fuchsia-600", border: "border-fuchsia-100" },
];

interface CategoriesSectionProps {
  /** "home" = limited categories; "shop" = all categories; "dashboard" = dashboard view */
  variant?: "home" | "shop" | "dashboard";
  /** Optional click handler for when it's used inside a page that manages state (like Shop) */
  onCategoryClick?: (categoryId: string) => void;
  /** ID of the currently selected category for styling */
  selectedCategoryId?: string;
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
}

export default function CategoriesSection({ 
  variant = "home", 
  onCategoryClick, 
  selectedCategoryId,
  title = "Shop by Categories",
  subtitle = "Browse our top categories and find your medicine"
}: CategoriesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", variant],
    queryFn: () => categoryService.getAllCategories({ limit: variant === "home" ? 20 : 50 }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories, checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-category-card]")?.offsetWidth || 160;
    const scrollAmount = cardWidth * 3;
    el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  // --- Loading skeleton ---
  if (isLoading && categories.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-shop_light_bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <div className="h-8 w-52 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-72 bg-gray-200 rounded-full mx-auto animate-pulse" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[140px] sm:w-[160px] bg-white rounded-2xl p-5 animate-pulse border border-gray-100">
                <div className="w-14 h-14 bg-gray-200 rounded-xl mx-auto mb-3" />
                <div className="h-4 bg-gray-200 rounded mx-auto w-20 mb-2" />
                <div className="h-3 bg-gray-200 rounded mx-auto w-14" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <section className="py-12 md:py-16 bg-shop_light_bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <AlertCircle className="w-12 h-12 text-shop_orange mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to load categories</h3>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-shop_btn_dark_green text-white rounded-xl text-sm font-semibold hover:bg-[#052e1f] transition"
          >
            Refresh Page
          </button>
        </div>
      </section>
    );
  }

  // --- Empty state ---
  if (!categories.length) {
    return (
      <section className="py-12 md:py-16 bg-shop_light_bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No categories found</h3>
          <p className="text-gray-500 text-sm">Check back later for new categories.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${variant === "dashboard" ? "bg-transparent py-2" : "bg-shop_light_bg py-12 md:py-16"} overflow-hidden`}>
      <div className={`${variant === "dashboard" ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-8"}`}>
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className={`${variant === "dashboard" ? "text-xl" : "text-2xl md:text-3xl"} font-bold text-shop_dark_green font-poppins`}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Arrow controls - desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-shop_dark_green hover:text-white hover:border-shop_dark_green transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 disabled:hover:border-gray-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-shop_dark_green hover:text-white hover:border-shop_dark_green transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 disabled:hover:border-gray-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable slider */}
        <div className="relative group">
          {/* Left fade overlay */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-shop_light_bg to-transparent z-10 pointer-events-none" />
          )}
          {/* Right fade overlay */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-shop_light_bg to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category: Category, index: number) => {
              const gradient = cardGradients[index % cardGradients.length];
              const emoji = getCategoryEmoji(category.name);
              const itemCount = category._count?.medicines || 0;
              const isSelected = selectedCategoryId === category.id;

              const innerContent = (
                <>
                  {/* Icon Container */}
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl ${isSelected ? "bg-shop_dark_green text-white" : gradient.icon} flex items-center justify-center transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-3 shadow-sm`}>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <span className="text-3xl" role="img" aria-label={category.name}>{emoji}</span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className={`font-semibold text-sm line-clamp-1 mb-1 transition-colors ${isSelected ? "text-shop_dark_green" : "text-gray-800"}`}>
                    {category.name}
                  </h3>

                  {/* Count */}
                  <p className="text-xs text-gray-500">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </>
              );

              const className = `flex-shrink-0 w-[140px] sm:w-[160px] ${isSelected ? "bg-white border-shop_dark_green ring-2 ring-shop_dark_green/20" : `bg-gradient-to-br ${gradient.bg} ${gradient.border}`} rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border group/card cursor-pointer focus:outline-none`;

              if (onCategoryClick) {
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryClick(category.id)}
                    data-category-card
                    className={className}
                  >
                    {innerContent}
                  </button>
                );
              }

              return (
                <Link
                  key={category.id}
                  href={`/shop?categoryId=${category.id}`}
                  data-category-card
                  className={className}
                >
                  {innerContent}
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All Link */}
        {variant === "home" && (
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-shop_dark_green transition-all duration-300 hover:gap-3"
            >
              View All Categories
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}