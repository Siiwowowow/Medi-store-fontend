"use client";

import { SlidersHorizontal, LayoutGrid, List, Loader2, ChevronDown } from "lucide-react";

interface Props {
  total: number;
  activeCount: number;
  sortBy: string;
  onSortChange: (v: string) => void;
  onMobileFilterOpen: () => void;
  isFetching: boolean;
  onViewChange?: (view: "grid" | "list") => void;
  viewMode?: "grid" | "list";
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ResultsBar({
  total,
  activeCount,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
  isFetching,
  onViewChange,
  viewMode = "grid",
}: Props) {
  return (
    <div className="sticky z-30 bg-white border-b border-gray-200" style={{ top: "72px" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[52px] flex items-center justify-between gap-3">
        {/* Left side - Results count */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isFetching && <Loader2 className="w-3.5 h-3.5 text-green-600 animate-spin" />}
          <span className="text-sm text-[#52525b]">
            Showing <span className="font-semibold text-[#151515]">{total.toLocaleString()}</span> results
          </span>
          {activeCount > 0 && (
            <span className="text-xs font-semibold rounded-full px-2 py-0.5 bg-[#fcf0e4] text-[#063c28]">
              {activeCount} filter{activeCount > 1 ? "s" : ""} active
            </span>
          )}
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile Filter Button */}
          <button
            onClick={onMobileFilterOpen}
            className="lg:hidden flex items-center gap-1.5 h-[34px] px-3 rounded-lg border border-gray-200 bg-white text-xs font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {activeCount > 0 && (
              <span className="rounded-full px-1.5 text-[10px] font-bold text-white bg-[#063c28]">
                {activeCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="hidden md:flex relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none h-[34px] px-3 pr-8 rounded-lg border border-gray-200 bg-white text-xs font-medium focus:outline-none focus:border-[#063c28] cursor-pointer"
              style={{ color: "#52525b", minWidth: "140px" }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#9ca3af" }} />
          </div>

          {/* ✅ Grid/List Toggle Buttons */}
          <div className="flex bg-[#f6f6f6] rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => {
                console.log("Grid view selected");
                onViewChange?.("grid");
              }}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-[#063c28]"
                  : "text-[#9ca3af] hover:text-[#52525b]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                console.log("List view selected");
                onViewChange?.("list");
              }}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-[#063c28]"
                  : "text-[#9ca3af] hover:text-[#52525b]"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}