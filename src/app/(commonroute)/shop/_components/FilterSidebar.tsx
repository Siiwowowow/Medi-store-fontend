/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { Category } from "@/services/category.service";

interface Filters {
  search: string;
  categoryId: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  availability: string;
}

interface FilterSidebarProps {
  filters: Filters;
  categories: Category[];
  manufacturers: string[];
  onUpdate: (key: keyof Filters, value: string | number) => void;
  onClear: (key: keyof Filters) => void;
  onApply: () => void;
}

export default function FilterSidebar({ 
  filters, 
  categories, 
  manufacturers, 
  onUpdate, 
  onClear, 
  onApply 
}: FilterSidebarProps) {
  const [searchLocal, setSearchLocal] = useState(filters.search);
  const [minPriceLocal, setMinPriceLocal] = useState(filters.minPrice);
  const [maxPriceLocal, setMaxPriceLocal] = useState(filters.maxPrice);

  useEffect(() => {
    setSearchLocal(filters.search);
    setMinPriceLocal(filters.minPrice);
    setMaxPriceLocal(filters.maxPrice);
  }, [filters.search, filters.minPrice, filters.maxPrice]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onUpdate("search", searchLocal);
    }
  };

  const handlePriceApply = () => {
    onUpdate("minPrice", minPriceLocal);
    onUpdate("maxPrice", maxPriceLocal);
  };

  const visibleCategories = categories.slice(0, 6);
  const visibleManufacturers = manufacturers.slice(0, 5);

  return (
    <div className="w-[260px] flex-shrink-0 bg-white border-r border-gray-100 p-5 min-h-screen sticky top-[72px]">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchLocal}
          onChange={(e) => setSearchLocal(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search medicines..."
          className="w-full h-10 pl-9 pr-3 bg-[#f6f6f6] rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#063c28]"
        />
        {searchLocal && (
          <button onClick={() => { setSearchLocal(""); onUpdate("search", ""); }} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Categories */}
      {visibleCategories.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-[#151515]">Categories</h3>
            {filters.categoryId && (
              <button onClick={() => onClear("categoryId")} className="text-[10px] text-[#fb6c08]">Clear</button>
            )}
          </div>
          <div className="space-y-2">
            {visibleCategories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categoryId === cat.id}
                  onChange={() => onUpdate("categoryId", filters.categoryId === cat.id ? "" : cat.id)}
                  className="w-4 h-4 rounded accent-[#063c28]"
                />
                <span className="text-sm text-[#52525b] flex-1">{cat.name}</span>
                <span className="text-[10px] bg-[#f1f3f8] rounded-full px-2 py-0.5 text-[#52525b]">
                  {cat._count?.medicines || 0}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-[#151515]">Price Range</h3>
          {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
            <button onClick={() => { onClear("minPrice"); onClear("maxPrice"); }} className="text-[10px] text-[#fb6c08]">Clear</button>
          )}
        </div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <span className="text-xs text-gray-400">৳</span>
            <input
              type="number"
              value={minPriceLocal}
              onChange={(e) => setMinPriceLocal(Number(e.target.value))}
              placeholder="Min"
              className="w-full h-9 bg-[#f6f6f6] rounded-lg text-center text-sm text-[#151515]"
            />
          </div>
          <div className="flex-1">
            <span className="text-xs text-gray-400">৳</span>
            <input
              type="number"
              value={maxPriceLocal}
              onChange={(e) => setMaxPriceLocal(Number(e.target.value))}
              placeholder="Max"
              className="w-full h-9 bg-[#f6f6f6] rounded-lg text-center text-sm text-[#151515]"
            />
          </div>
        </div>
        <button
          onClick={handlePriceApply}
          className="w-full h-8 bg-[#063d29] text-white text-xs rounded-lg font-medium hover:bg-[#052e1f] transition"
        >
          Apply Price
        </button>
      </div>

      {/* Manufacturer */}
      {visibleManufacturers.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-[#151515]">Manufacturer</h3>
            {filters.manufacturer && <button onClick={() => onClear("manufacturer")} className="text-[10px] text-[#fb6c08]">Clear</button>}
          </div>
          <div className="space-y-2">
            {visibleManufacturers.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.manufacturer === brand}
                  onChange={() => onUpdate("manufacturer", filters.manufacturer === brand ? "" : brand)}
                  className="w-4 h-4 rounded accent-[#063c28]"
                />
                <span className="text-sm text-[#52525b]">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-[#151515] mb-3">Availability</h3>
        <div className="flex gap-2">
          {[
            { label: "All", value: "all" },
            { label: "In Stock", value: "instock" },
            { label: "Out of Stock", value: "outofstock" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onUpdate("availability", opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                filters.availability === opt.value
                  ? "bg-[#063c28] text-white border border-[#063c28]"
                  : "bg-white border border-gray-200 text-[#52525b] hover:border-[#063c28]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button onClick={onApply} className="w-full mt-6 bg-[#063d29] text-white h-10 rounded-xl font-semibold sticky bottom-0">
        Apply Filters
      </button>
    </div>
  );
}