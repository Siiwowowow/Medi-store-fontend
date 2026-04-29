import { useQuery } from "@tanstack/react-query";
import { medicineService } from "@/services/medicine.service";

export interface MedicineFilters {
  search?: string;
  categoryId?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export function useMedicines(filters: MedicineFilters) {
  console.log("🔍 useMedicines called with filters:", filters);

  const getSortParams = (sortBy: string) => {
    switch (sortBy) {
      case "price_asc":
        return { sortBy: "price", sortOrder: "asc" };
      case "price_desc":
        return { sortBy: "price", sortOrder: "desc" };
      case "newest":
        return { sortBy: "createdAt", sortOrder: "desc" };
      case "rating":
        return { sortBy: "avgRating", sortOrder: "desc" };
      default:
        return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  const sortParams = getSortParams(filters.sortBy || "newest");

  let minStock: number | undefined;
  let stock: number | undefined;

  if (filters.availability === "instock") {
    minStock = 1;
  } else if (filters.availability === "outofstock") {
    stock = 0;
  }

  const queryParams = {
    search: filters.search,
    categoryId: filters.categoryId,
    manufacturer: filters.manufacturer,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minStock,
    stock,
    page: filters.page || 1,
    limit: filters.limit || 12,
    sortBy: sortParams.sortBy,
    sortOrder: sortParams.sortOrder,
  };

  console.log("🔍 Query Params sent to service:", queryParams);

  return useQuery({
    queryKey: ["medicines", filters],
    queryFn: () => medicineService.getAllMedicines(queryParams),
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