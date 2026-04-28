"use client";

import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { Filters } from "./ShopClient";
import type { Category } from "@/services/category.service";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

interface Props {
  open:        boolean;
  onClose:     () => void;
  filters:     Filters;
  categories:  Category[];
  manufacturers: string[];
  onUpdate:    (key: keyof Filters, value: string | number) => void;
  onClear:     (key: keyof Filters) => void;
  onApply:     () => void;
  onClearAll:  () => void;
  total:       number;
}

export default function MobileFilterDrawer({
  open, onClose, filters, categories, manufacturers,
  onUpdate, onClear, onApply, onClearAll, total,
}: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="lg:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background:    "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl"
        style={{
          maxHeight:  "90vh",
          transform:  open ? "translateY(0)" : "translateY(100%)",
          transition: "transform .35s cubic-bezier(.34,1.2,.64,1)",
          boxShadow:  "0 -8px 40px rgba(0,0,0,0.15)",
          display:    "flex",
          flexDirection: "column",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <h2
            className="text-base font-bold"
            style={{ color: "#151515", fontFamily: "var(--font-poppins)" }}
          >
            Filters
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold border-none bg-transparent cursor-pointer"
              style={{ color: "#fb6c08", fontFamily: "var(--font-poppins)", padding: 0 }}
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors"
              style={{ background: "#f6f6f6" }}
            >
              <X className="w-4 h-4" style={{ color: "#52525b" }} />
            </button>
          </div>
         </div>

         {/* Sort by selector */}
         <div className="px-4 py-3 border-b" style={{ borderBottomColor: "#e5e7eb" }}>
           <div className="flex justify-between items-center mb-2">
             <label className="text-[10px] font-bold uppercase tracking-[.08em] text-[#9ca3af]">
               SORT BY
             </label>
             {filters.sortBy !== "newest" && (
               <button
                 onClick={() => onClear("sortBy")}
                 className="text-[10px] font-semibold text-[#fb6c08] hover:underline"
               >
                 Clear
               </button>
             )}
           </div>
           <select
             value={filters.sortBy}
             onChange={(e) => onUpdate("sortBy", e.target.value)}
             className="w-full h-10 rounded-lg bg-[#f6f6f6] border-transparent text-sm outline-none focus:border-[#063c28] focus:bg-white"
             style={{ color: "#52525b" }}
           >
             {sortOptions.map((opt) => (
               <option key={opt.value} value={opt.value}>
                 {opt.label}
               </option>
             ))}
           </select>
         </div>

         {/* Filter content — scrollable */}
         <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Reuse FilterSidebar without sticky positioning */}
          <FilterSidebar
            filters={filters}
            categories={categories}
            manufacturers={manufacturers}
            onUpdate={onUpdate}
            onClear={onClear}
          />
        </div>

        {/* Apply footer */}
        <div
          className="flex-shrink-0 px-4 py-4"
          style={{ borderTop: "1px solid #e5e7eb" }}
        >
          <button
            onClick={onApply}
            className="w-full h-12 rounded-xl font-bold text-sm text-white border-none cursor-pointer transition-colors"
            style={{ background: "#063d29", fontFamily: "var(--font-poppins)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#052e1f")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#063d29")}
          >
            Show {total.toLocaleString()} Results
          </button>
        </div>
      </div>
    </>
  );
}