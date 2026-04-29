"use client";

import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import type { Category } from "@/services/category.service";

interface Filters {
  search: string;
  categoryId: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  availability: string;
}

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  categories: Category[];
  manufacturers: string[];
  onUpdate: (key: keyof Filters, value: string | number) => void;
  onClear: (key: keyof Filters) => void;
  onApply: () => void;
  onClearAll: () => void;
  total: number;
}

export default function MobileFilterDrawer({
  open,
  onClose,
  filters,
  categories,
  manufacturers,
  onUpdate,
  onClear,
  onApply,
  onClearAll,
  total,
}: MobileFilterDrawerProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto lg:hidden">
        <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center gap-4">
            <button onClick={onClearAll} className="text-sm text-[#fb6c08] font-semibold">Clear All</button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <FilterSidebar
            filters={filters}
            categories={categories}
            manufacturers={manufacturers}
            onUpdate={onUpdate}
            onClear={onClear}
            onApply={onApply}
          />
        </div>
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button onClick={onApply} className="w-full h-12 bg-[#063d29] text-white rounded-xl font-semibold">
            Show {total.toLocaleString()} Results
          </button>
        </div>
      </div>
    </>
  );
}