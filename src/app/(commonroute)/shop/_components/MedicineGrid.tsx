"use client";

import MedicineCard from "./MedicineCard";
import EmptyState from "./EmptyState";
import type { Medicine } from "@/services/medicine.service";

interface MedicineGridProps {
  medicines: Medicine[];
  isLoading: boolean;
  isFetching?: boolean;
  onPageChange?: (page: number) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  viewMode?: "grid" | "list";
}

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-32 bg-gray-200" />
    <div className="p-3">
      <div className="h-2 bg-gray-200 rounded w-16 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
      <div className="h-2 bg-gray-200 rounded w-20 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-16" />
    </div>
  </div>
);

export default function MedicineGrid({ 
  medicines, 
  isLoading, 
  isFetching,
  hasActiveFilters, 
  onClearFilters,
  viewMode = "grid" 
}: MedicineGridProps) {
  if (isLoading) {
    return (
      <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (medicines.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} hasActiveFilters={hasActiveFilters} />;
  }

  return (
    <div 
      className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}
      style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}
    >
      {medicines.map((medicine, index) => (
        <MedicineCard 
          key={medicine.id} 
          medicine={medicine} 
          viewMode={viewMode} 
          priority={index < 4}
        />
      ))}
    </div>
  );
}