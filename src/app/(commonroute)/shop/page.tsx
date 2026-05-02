/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import ResultsBar from "./_components/ResultsBar";
import ActiveFilters from "./_components/ActiveFilters";
import FilterSidebar from "./_components/FilterSidebar";
import MedicineGrid from "./_components/MedicineGrid";
import Pagination from "./_components/Pagination";
import MobileFilterDrawer from "./_components/MobileFilterDrawer";
import CategoriesSection from "@/components/shared/Categories/CategoriesSection";
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

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get("search") || "",
    categoryId: searchParams.get("categoryId") || "",
    manufacturer: searchParams.get("manufacturer") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000,
    page: Number(searchParams.get("page")) || 1,
    sortBy: searchParams.get("sortBy") || "newest",
    availability: searchParams.get("availability") || "all",
  });

  // ✅ Add proper types
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const activeCount = [
    filters.search,
    filters.categoryId,
    filters.manufacturer,
    filters.minPrice > 0 || filters.maxPrice < 10000 ? "price" : null,
    filters.availability !== "all" ? "availability" : null,
  ].filter(Boolean).length;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
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

      if (filters.sortBy === "price_asc") {
        params.sortBy = "price";
        params.sortOrder = "asc";
      } else if (filters.sortBy === "price_desc") {
        params.sortBy = "price";
        params.sortOrder = "desc";
      } else if (filters.sortBy === "newest") {
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
      } else if (filters.sortBy === "rating") {
        params.sortBy = "avgRating";
        params.sortOrder = "desc";
      } else if (filters.sortBy === "bestselling") {
        params.sortBy = "orderCount";
        params.sortOrder = "desc";
      }

      console.log("🛒 Fetching products with params:", params);
      const response = await medicineService.getAllMedicines(params);

      if (response?.success) {
        setMedicines(response.data || []);
        setMeta(response.meta || { total: 0, page: 1, limit: 12, totalPages: 1 });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [cats, mans] = await Promise.all([
          categoryService.getAllCategories({ limit: 50 }),
          medicineService.getManufacturers(),
        ]);
        setCategories(cats);
        setManufacturers(mans);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Sync state with URL
  useEffect(() => {
    const nextFilters: Filters = {
      search: searchParams.get("search") || "",
      categoryId: searchParams.get("categoryId") || "",
      manufacturer: searchParams.get("manufacturer") || "",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 10000,
      page: Number(searchParams.get("page")) || 1,
      sortBy: searchParams.get("sortBy") || "newest",
      availability: searchParams.get("availability") || "all",
    };
    
    // Only update if filters actually changed to avoid infinite loops
    setFilters(nextFilters);
  }, [searchParams]);

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

  const handleSortChange = useCallback((sort: string) => {
    updateFilter("sortBy", sort);
  }, [updateFilter]);

  const handleApplyFilters = useCallback(() => setMobileFilterOpen(false), []);

  return (
    <div className="bg-shop_light_bg min-h-screen">

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              categories={categories}
              manufacturers={manufacturers}
              onUpdate={updateFilter}
              onClear={clearFilter}
              onApply={handleApplyFilters}
            />
          </div>

          <div className="flex-1 min-w-0">
            <ResultsBar
              total={meta.total}
              activeCount={activeCount}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
              onMobileFilterOpen={() => setMobileFilterOpen(true)}
              isFetching={loading}
              viewMode={viewMode}
              onViewChange={setViewMode}
            />

            <ActiveFilters
              filters={filters}
              categories={categories}
              onClear={clearFilter}
              onClearAll={clearAllFilters}
            />

            <MedicineGrid
              medicines={medicines}
              isLoading={loading}
              isFetching={loading}
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
        categories={categories}
        manufacturers={manufacturers}
        onUpdate={updateFilter}
        onClear={clearFilter}
        onApply={handleApplyFilters}
        onClearAll={clearAllFilters}
        total={meta.total}
      />
    </div>
  );
}