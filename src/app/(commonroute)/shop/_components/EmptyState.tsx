"use client";

import { Search } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function EmptyState({ onClearFilters, hasActiveFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-full bg-[#f6f6f6] flex items-center justify-center mx-auto">
        <Search className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-xl font-bold text-[#151515] mt-5">No medicines found</h3>
      <p className="text-sm text-[#52525b] mt-2">
        {hasActiveFilters ? "Try adjusting filters or search term" : "No products available"}
      </p>
      {hasActiveFilters && (
        <button onClick={onClearFilters} className="mt-5 bg-[#fb6c08] text-white h-10 px-6 rounded-xl font-semibold">
          Clear All Filters
        </button>
      )}
    </div>
  );
}