"use client";

import { SlidersHorizontal, Grid, List, Loader2 } from "lucide-react";

interface ResultsBarProps {
  total: number;
  activeCount: number;
  sortBy: string;
  onSortChange: (v: string) => void;
  onMobileFilterOpen: () => void;
  isFetching: boolean;
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
}

export default function ResultsBar({
  total,
  activeCount,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
  isFetching,
  viewMode,
  onViewChange,
}: ResultsBarProps) {
  return (
    <div className="bg-white rounded-xl p-3.5 flex flex-wrap justify-between items-center gap-3 mb-4">
      <div className="flex items-center gap-2">
        {isFetching && <Loader2 className="w-4 h-4 text-green-600 animate-spin" />}
        <span className="text-sm text-[#52525b]">
          Showing <span className="font-semibold text-[#151515]">{total.toLocaleString()}</span> results
        </span>
        {activeCount > 0 && (
          <span className="text-xs bg-[#fcf0e4] text-[#063c28] rounded-full px-2 py-0.5">
            {activeCount} filter{activeCount > 1 ? "s" : ""} active
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onMobileFilterOpen} className="lg:hidden flex items-center gap-1.5 h-9 px-3 border border-gray-200 rounded-lg text-sm">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {activeCount > 0 && <span className="ml-1 text-[#063c28] font-semibold">{activeCount}</span>}
        </button>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 px-3 pr-7 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="bestselling">Best Selling</option>
        </select>

        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange("grid")}
            className={`w-9 h-9 flex items-center justify-center transition ${
              viewMode === "grid" ? "bg-[#063c28] text-white" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`w-9 h-9 flex items-center justify-center transition ${
              viewMode === "list" ? "bg-[#063c28] text-white" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}