"use client";

import { SearchX } from "lucide-react";
import MedicineCard    from "./MedicineCard";

import type { Medicine } from "@/services/medicine.service";
import SkeletonCard from "./SkeletonCard";
import Pagination from "./Pagination";

interface Meta {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}

interface Props {
  medicines:        Medicine[];
  isLoading:        boolean;
  isFetching:       boolean;
  meta:             Meta;
  onPageChange:     (page: number) => void;
  onClearFilters:   () => void;
  hasActiveFilters: boolean;
  viewMode?:        "grid" | "list";
}

export default function MedicineGrid({
  medicines, isLoading, isFetching, meta,
  onPageChange, onClearFilters, hasActiveFilters,
  viewMode = "grid",
}: Props) {
  if (isLoading) {
    return (
      <div>
        <div className={viewMode === "grid" 
          ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          : "flex flex-col gap-4"
        }>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!isLoading && medicines.length === 0) {
    // ... existing no results UI ...
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ background: "#f6f6f6", border: "1px solid #e5e7eb" }}
        >
          <SearchX className="w-9 h-9" style={{ color: "#d1d5db" }} />
        </div>
        <h3
          className="text-lg font-semibold"
          style={{ color: "#151515", fontFamily: "var(--font-poppins)" }}
        >
          No medicines found
        </h3>
        <p
          className="text-sm mt-1.5 text-center max-w-[240px]"
          style={{ color: "#9ca3af", fontFamily: "var(--font-poppins)" }}
        >
          {hasActiveFilters
            ? "Try different keywords or clear your filters"
            : "No medicines are available right now"}
        </p>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="mt-5 h-10 px-6 rounded-xl font-semibold text-sm text-white border-none cursor-pointer transition-colors"
            style={{ background: "#fb6c08", fontFamily: "var(--font-poppins)" }}
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Grid / List Container */}
      <div
        className={viewMode === "grid" 
          ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          : "flex flex-col gap-4"
        }
        style={{
          opacity: isFetching ? 0.7 : 1,
          transition: "opacity .2s ease",
        }}
      >
        {medicines.map((med) => (
          <MedicineCard key={med.id} medicine={med} view={viewMode} />
        ))}
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}