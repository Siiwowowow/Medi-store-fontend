/* eslint-disable @typescript-eslint/no-explicit-any */
import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { useQuery } from "@tanstack/react-query";

export interface MedicineFilters {
  search?: string;
  categoryId?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export function useMedicines(filters: MedicineFilters) {
  // Build API parameters
  const apiParams: any = {
    searchTerm: filters.search,
    categoryId: filters.categoryId,
    manufacturer: filters.manufacturer,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    page: filters.page || 1,
    limit: 12,
  };

  // Map UI sort options to backend sort parameter
  if (filters.sortBy === "newest") {
    apiParams.sort = "newest";
  } else if (filters.sortBy === "price-asc") {
    apiParams.sortBy = "price";
    apiParams.sortOrder = "asc";
  } else if (filters.sortBy === "price-desc") {
    apiParams.sortBy = "price";
    apiParams.sortOrder = "desc";
  }

  return useQuery({
    queryKey: ["medicines", filters],
    queryFn: () => medicineService.getAllMedicines(apiParams),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });
}

export function useManufacturers() {
  return useQuery({
    queryKey: ["manufacturers"],
    queryFn: () => medicineService.getManufacturers(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories", "shop"],
    queryFn: () => categoryService.getAllCategories({ limit: 50 }),
    staleTime: 10 * 60 * 1000,
  });
}
