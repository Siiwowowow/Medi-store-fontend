"use client";

import { X } from "lucide-react";

interface Filters {
  search: string;
  categoryId: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  availability: string;
}

interface Category {
  id: string;
  name: string;
}

interface ActiveFiltersProps {
  filters: Filters;
  categories: Category[];
  onClear: (key: keyof Filters) => void;
  onClearAll: () => void;
}

const getCategoryName = (categories: Category[], id: string) => categories.find(c => c.id === id)?.name || id;

export default function ActiveFilters({ filters, categories, onClear, onClearAll }: ActiveFiltersProps) {
  const chips: { label: string; key: keyof Filters }[] = [];

  if (filters.search) chips.push({ label: `Search: ${filters.search}`, key: "search" });
  if (filters.categoryId) chips.push({ label: getCategoryName(categories, filters.categoryId), key: "categoryId" });
  if (filters.manufacturer) chips.push({ label: filters.manufacturer, key: "manufacturer" });
  if (filters.minPrice > 0 || filters.maxPrice < 10000) {
    chips.push({ label: `৳${filters.minPrice} - ৳${filters.maxPrice}`, key: "minPrice" });
  }
  if (filters.availability !== "all") {
    chips.push({ label: filters.availability === "instock" ? "In Stock" : "Out of Stock", key: "availability" });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map((chip) => (
        <div key={chip.key} className="bg-[#fcf0e4] text-[#063c28] text-xs font-medium rounded-full px-3 py-1.5 flex items-center gap-1.5">
          {chip.label}
          <button onClick={() => onClear(chip.key)} className="hover:text-[#fb6c08]">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      {chips.length >= 2 && (
        <button onClick={onClearAll} className="text-xs text-[#fb6c08] font-semibold underline">
          Clear all
        </button>
      )}
    </div>
  );
}