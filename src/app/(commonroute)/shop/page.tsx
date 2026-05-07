/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import ResultsBar from "./_components/ResultsBar";
import ActiveFilters from "./_components/ActiveFilters";
import FilterSidebar from "./_components/FilterSidebar";
import MedicineGrid from "./_components/MedicineGrid";
import Pagination from "./_components/Pagination";
import MobileFilterDrawer from "./_components/MobileFilterDrawer";
import type { Medicine } from "@/services/medicine.service";
import type { Category } from "@/services/category.service";

interface Filters {
  search: string;
  categoryId: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  sortBy: string;
  availability: string;
}

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract filters from URL
  const filters = useMemo(() => ({
    search: searchParams.get("search") || "",
    categoryId: searchParams.get("categoryId") || "",
    manufacturer: searchParams.get("manufacturer") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000,
    page: Number(searchParams.get("page")) || 1,
    sortBy: searchParams.get("sortBy") || "newest",
    availability: searchParams.get("availability") || "all",
  }), [searchParams]);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ✅ Use TanStack Query for Products (with Caching & Background Refresh)
  const { 
    data: productsData, 
    isLoading: productsLoading, 
    isFetching: productsFetching 
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params: any = {
        page: filters.page,
        limit: 12,
      };

      if (filters.search) params.search = filters.search;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.manufacturer) params.manufacturer = filters.manufacturer;
      if (filters.minPrice > 0) params.minPrice = filters.minPrice;
      if (filters.maxPrice < 10000) params.maxPrice = filters.maxPrice;
      if (filters.availability === "instock") params.minStock = 1;
      if (filters.availability === "outofstock") params.stock = 0;

      // Map sort labels to backend params
      const sortMap: Record<string, { sortBy: string; sortOrder: string }> = {
        price_asc: { sortBy: "price", sortOrder: "asc" },
        price_desc: { sortBy: "price", sortOrder: "desc" },
        newest: { sortBy: "createdAt", sortOrder: "desc" },
        rating: { sortBy: "avgRating", sortOrder: "desc" },
        bestselling: { sortBy: "orderCount", sortOrder: "desc" },
      };

      const sortParams = sortMap[filters.sortBy] || sortMap.newest;
      Object.assign(params, sortParams);

      const response = await medicineService.getAllMedicines(params);
      return response;
    },
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
  });

  // ✅ Fetch Initial Categories & Manufacturers
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getAllCategories({ limit: 50 });
      return response || [];
    },
    staleTime: 10 * 60 * 1000, // Categories don't change often
  });

  const { data: manufacturers = [] } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: async () => {
      const response = await medicineService.getManufacturers();
      return response || [];
    },
    staleTime: 10 * 60 * 1000,
  });

  const medicines = productsData?.data || [];
  const meta = productsData?.meta || { total: 0, page: 1, limit: 12, totalPages: 1 };

  const activeCount = [
    filters.search,
    filters.categoryId,
    filters.manufacturer,
    filters.minPrice > 0 || filters.maxPrice < 10000 ? "price" : null,
    filters.availability !== "all" ? "availability" : null,
  ].filter(Boolean).length;

  const updateUrl = useCallback((newFilters: Filters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.categoryId) params.set("categoryId", newFilters.categoryId);
    if (newFilters.manufacturer) params.set("manufacturer", newFilters.manufacturer);
    if (newFilters.minPrice > 0) params.set("minPrice", String(newFilters.minPrice));
    if (newFilters.maxPrice < 10000) params.set("maxPrice", String(newFilters.maxPrice));
    if (newFilters.page > 1) params.set("page", String(newFilters.page));
    if (newFilters.sortBy !== "newest") params.set("sortBy", newFilters.sortBy);
    if (newFilters.availability !== "all") params.set("availability", newFilters.availability);
    
    const queryString = params.toString();
    router.push(queryString ? `/shop?${queryString}` : "/shop", { scroll: false });
  }, [router]);

  const updateFilter = useCallback((key: keyof Filters, value: string | number) => {
    const next = { ...filters, [key]: value, page: 1 };
    updateUrl(next);
  }, [filters, updateUrl]);

  const clearFilter = useCallback((key: keyof Filters) => {
    const defaultValue = key === "minPrice" ? 0 : key === "maxPrice" ? 10000 : key === "page" ? 1 : key === "sortBy" ? "newest" : key === "availability" ? "all" : "";
    const next = { ...filters, [key]: defaultValue, page: 1 };
    updateUrl(next);
  }, [filters, updateUrl]);

  const clearAllFilters = useCallback(() => {
    router.push("/shop", { scroll: false });
  }, [router]);

  const setPage = useCallback((page: number) => {
    const next = { ...filters, page };
    updateUrl(next);
  }, [filters, updateUrl]);

  return (
    <div className="bg-shop_light_bg min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              categories={categories as any}
              manufacturers={manufacturers as any}
              onUpdate={updateFilter}
              onClear={clearFilter}
              onApply={() => setMobileFilterOpen(false)}
            />
          </div>

          <div className="flex-1 min-w-0">
            <ResultsBar
              total={meta.total}
              activeCount={activeCount}
              sortBy={filters.sortBy}
              onSortChange={(sort) => updateFilter("sortBy", sort)}
              onMobileFilterOpen={() => setMobileFilterOpen(true)}
              isFetching={productsFetching}
              viewMode={viewMode}
              onViewChange={setViewMode}
            />

            <ActiveFilters
              filters={filters}
              categories={categories as any}
              onClear={clearFilter}
              onClearAll={clearAllFilters}
            />

            <MedicineGrid
              medicines={medicines}
              isLoading={productsLoading}
              isFetching={productsFetching}
              onClearFilters={clearAllFilters}
              hasActiveFilters={activeCount > 0}
            />

            {meta.totalPages > 1 && (
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        categories={categories as any}
        manufacturers={manufacturers as any}
        onUpdate={updateFilter}
        onClear={clearFilter}
        onApply={() => setMobileFilterOpen(false)}
        onClearAll={clearAllFilters}
        total={meta.total}
      />
    </div>
  );
}