"use client";

import { X } from "lucide-react";
import type { Filters } from "./ShopClient";
import type { Category } from "@/services/category.service";

interface Props {
  filters: Filters;
  categories: Category[];
  onClear: (key: keyof Filters) => void;
  onClearAll: () => void;
}

const getCategoryName = (categories: Category[], id: string): string => {
  const cat = categories.find(c => c.id === id);
  return cat?.name || id;
};

export default function ActiveFilters({ filters, categories = [], onClear, onClearAll }: Props) {
  const chips: { label: string; key: keyof Filters; value?: string }[] = [];

  if (filters.search) {
    chips.push({ label: `Search: ${filters.search}`, key: "search" });
  }
  if (filters.categoryId) {
    chips.push({ label: getCategoryName(categories, filters.categoryId), key: "categoryId" });
  }
  if (filters.manufacturer) {
    chips.push({ label: filters.manufacturer, key: "manufacturer" });
  }
  if (filters.minPrice > 0) {
    chips.push({ label: `Min: ৳${filters.minPrice}`, key: "minPrice" });
  }
  if (filters.maxPrice < 10000) {
    chips.push({ label: `Max: ৳${filters.maxPrice}`, key: "maxPrice" });
  }

  if (chips.length === 0) return null;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap gap-1.5 items-center">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-3 py-1"
          style={{
            background: "#fcf0e4",
            border: "1px solid rgba(6,60,40,0.15)",
            color: "#063c28",
          }}
        >
          {chip.label}
          <button
            onClick={() => onClear(chip.key)}
            className="flex items-center ml-0.5 transition-colors"
            style={{ color: "#9ca3af" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fb6c08")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#9ca3af")}
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}

      {chips.length >= 2 && (
        <button
          onClick={onClearAll}
          className="text-xs font-semibold underline underline-offset-2 ml-1"
          style={{ color: "#fb6c08" }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}