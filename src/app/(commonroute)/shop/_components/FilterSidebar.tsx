"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import type { Filters } from "./ShopClient";
import type { Category } from "@/services/category.service";

interface Props {
  filters: Filters;
  categories: Category[];
  manufacturers: string[];
  onUpdate: (key: keyof Filters, value: string | number) => void;
  onClear: (key: keyof Filters) => void;
}

export default function FilterSidebar({ filters, categories = [], manufacturers = [], onUpdate, onClear }: Props) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // ✅ Ensure categories is an array before using slice
  const categoriesArray = Array.isArray(categories) ? categories : [];
  const manufacturersArray = Array.isArray(manufacturers) ? manufacturers : [];

  const visibleCategories = showAllCategories ? categoriesArray : categoriesArray.slice(0, 8);
  const visibleBrands = showAllBrands ? manufacturersArray : manufacturersArray.slice(0, 6);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onUpdate("search", localSearch);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-[136px]"
      style={{ maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}
    >
      {/* Search */}
      <div className="p-3.5 pb-0">
        <div className="flex items-center gap-2 rounded-xl px-3 h-10" style={{ background: "#f6f6f6" }}>
          <Search className="w-3.5 h-3.5" style={{ color: "#9ca3af" }} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search medicines..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: "#151515", fontFamily: "var(--font-poppins)" }}
          />
          {localSearch && (
            <button onClick={() => { setLocalSearch(""); onUpdate("search", ""); }}>
              <X className="w-3 h-3" style={{ color: "#9ca3af" }} />
            </button>
          )}
        </div>
      </div>

      {/* Categories - Only show if categories exist */}
      {categoriesArray.length > 0 && (
        <Section
          label="CATEGORY"
          hasActive={!!filters.categoryId}
          onClear={() => onClear("categoryId")}
        >
          {visibleCategories.map((cat) => (
            <FilterRow
              key={cat.id}
              name={cat.name}
              count={cat._count?.medicines || 0}
              active={filters.categoryId === cat.id}
              onClick={() =>
                filters.categoryId === cat.id
                  ? onClear("categoryId")
                  : onUpdate("categoryId", cat.id)
              }
            />
          ))}
          {categoriesArray.length > 8 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mt-1 text-[11px] font-semibold text-[#063c28] hover:underline"
            >
              {showAllCategories ? "Show less ↑" : `Show ${categoriesArray.length - 8} more ↓`}
            </button>
          )}
        </Section>
      )}

      {/* Price Range */}
      <Section
        label="PRICE"
        hasActive={filters.minPrice > 0 || filters.maxPrice < 10000}
        onClear={() => {
          onClear("minPrice");
          onClear("maxPrice");
        }}
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#9ca3af]">৳</span>
            <input
              type="number"
              value={filters.minPrice || ""}
              onChange={(e) => onUpdate("minPrice", Number(e.target.value))}
              placeholder="Min"
              className="w-full h-9 rounded-lg bg-[#f6f6f6] border-transparent text-center text-xs outline-none focus:border-[#063c28] focus:bg-white"
            />
          </div>
          <div className="flex-1 relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#9ca3af]">৳</span>
            <input
              type="number"
              value={filters.maxPrice === 10000 ? "" : filters.maxPrice}
              onChange={(e) => onUpdate("maxPrice", Number(e.target.value))}
              placeholder="Max"
              className="w-full h-9 rounded-lg bg-[#f6f6f6] border-transparent text-center text-xs outline-none focus:border-[#063c28] focus:bg-white"
            />
          </div>
        </div>
      </Section>

      {/* Availability */}
      <Section label="AVAILABILITY" hasActive={false} onClear={() => {}}>
        <div className="flex gap-1.5 flex-wrap">
          {["All", "In Stock", "Out of Stock"].map((opt, i) => (
            <button
              key={opt}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background: i === 0 ? "#063c28" : "#f1f3f8",
                color: i === 0 ? "#ffffff" : "#52525b",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </Section>

      {/* Brands - Only show if manufacturers exist */}
      {manufacturersArray.length > 0 && (
        <Section
          label="BRAND"
          hasActive={!!filters.manufacturer}
          onClear={() => onClear("manufacturer")}
          last
        >
          {visibleBrands.map((brand) => (
            <FilterRow
              key={brand}
              name={brand}
              active={filters.manufacturer === brand}
              onClick={() =>
                filters.manufacturer === brand
                  ? onClear("manufacturer")
                  : onUpdate("manufacturer", brand)
              }
            />
          ))}
          {manufacturersArray.length > 6 && (
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="mt-1 text-[11px] font-semibold text-[#063c28] hover:underline"
            >
              {showAllBrands ? "Show less ↑" : `Show ${manufacturersArray.length - 6} more ↓`}
            </button>
          )}
        </Section>
      )}
    </div>
  );
}

// Reusable Section Component
function Section({
  label,
  children,
  hasActive,
  onClear,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  hasActive: boolean;
  onClear: () => void;
  last?: boolean;
}) {
  return (
    <div className="px-[18px] py-4" style={{ borderBottom: last ? "none" : "1px solid #e5e7eb" }}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#9ca3af]">{label}</span>
        {hasActive && (
          <button onClick={onClear} className="text-[10px] font-semibold text-[#fb6c08] hover:underline">
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

// Filter Row Component
function FilterRow({
  name,
  count,
  active,
  onClick,
}: {
  name: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors text-left"
      style={{ background: active ? "#fcf0e4" : "transparent" }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.background = "#f6f6f6";
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      <span className="text-sm" style={{ color: active ? "#063c28" : "#52525b", fontWeight: active ? 600 : 400 }}>
        {name}
      </span>
      {count !== undefined && (
        <span
          className="text-[11px] rounded-full px-2 py-0.5"
          style={{
            background: active ? "rgba(6,60,40,0.08)" : "#f1f3f8",
            color: active ? "#063c28" : "#9ca3af",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}