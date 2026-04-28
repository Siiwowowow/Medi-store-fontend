/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";

import { useState, useCallback, useTransition, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMedicines, useManufacturers, useCategories } from "@/hooks/useMedicines";
import { useDebounce } from "@/hooks/useDebounce";

import ResultsBar from "./ResultsBar";
import ActiveFilters from "./ActiveFilters";
import FilterSidebar from "./FilterSidebar";
import MedicineGrid from "./MedicineGrid";
import MobileFilterDrawer from "./MobileFilterDrawer";

export interface Filters {
  search: string;
  categoryId: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  sortBy: string;
}

const buildParams = (f: Filters): string => {
  const p = new URLSearchParams();
  if (f.search) p.set("search", f.search);
  if (f.categoryId) p.set("categoryId", f.categoryId);
  if (f.manufacturer) p.set("manufacturer", f.manufacturer);
  if (f.minPrice > 0) p.set("minPrice", String(f.minPrice));
  if (f.maxPrice > 0 && f.maxPrice < 10000) p.set("maxPrice", String(f.maxPrice));
  if (f.page > 1) p.set("page", String(f.page));
  if (f.sortBy !== "newest") p.set("sortBy", f.sortBy);
  return p.toString();
};

interface ShopClientProps {
  initialParams: {
    search?: string;
    categoryId?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    sortBy?: string;
  };
}

export default function ShopClient({ initialParams }: ShopClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState<Filters>({
    search: initialParams.search || "",
    categoryId: initialParams.categoryId || "",
    manufacturer: initialParams.manufacturer || "",
    minPrice: initialParams.minPrice ? Number(initialParams.minPrice) : 0,
    maxPrice: initialParams.maxPrice ? Number(initialParams.maxPrice) : 10000,
    page: initialParams.page ? Number(initialParams.page) : 1,
    sortBy: initialParams.sortBy || "newest",
  });

  // Keep track of latest filters for the debounce effect to avoid stale closures
  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const navigate = useCallback(
    (nextFilters: Filters) => {
      const qs = buildParams(nextFilters);
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router]
  );

  // Sync state with URL (fixes back/forward button)
  useEffect(() => {
    setFilters({
      search: initialParams.search || "",
      categoryId: initialParams.categoryId || "",
      manufacturer: initialParams.manufacturer || "",
      minPrice: initialParams.minPrice ? Number(initialParams.minPrice) : 0,
      maxPrice: initialParams.maxPrice ? Number(initialParams.maxPrice) : 10000,
      page: initialParams.page ? Number(initialParams.page) : 1,
      sortBy: initialParams.sortBy || "newest",
    });
  }, [initialParams.search, initialParams.categoryId, initialParams.manufacturer, initialParams.minPrice, initialParams.maxPrice, initialParams.page, initialParams.sortBy]);

  // ✅ Debounced search
  const debouncedSearch = useDebounce(filters.search, 500);

  // ✅ Auto-apply when debounced search changes
  useEffect(() => {
    const currentUrlSearch = initialParams.search || "";
    if (debouncedSearch !== currentUrlSearch) {
      const next = { ...filtersRef.current, search: debouncedSearch, page: 1 };
      navigate(next);
    }
  }, [debouncedSearch, navigate, initialParams.search]);

  const { data, isLoading, isFetching } = useMedicines({
    search: filters.search || undefined,
    categoryId: filters.categoryId || undefined,
    manufacturer: filters.manufacturer || undefined,
    minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
    maxPrice: filters.maxPrice < 10000 ? filters.maxPrice : undefined,
    page: filters.page,
    limit: 12,
    sortBy: filters.sortBy,
  });

  const { data: manufacturers = [] } = useManufacturers();
  const { data: categories = [] } = useCategories();

  const medicines = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 12, totalPages: 1 };

  const activeCount = [
    filters.search,
    filters.categoryId,
    filters.manufacturer,
    filters.minPrice > 0 ? "price" : null,
    filters.maxPrice < 10000 ? "price" : null,
  ].filter(Boolean).length;

  const updateFilter = useCallback(
    (key: keyof Filters, value: string | number) => {
      const next = { ...filters, [key]: value, page: 1 };
      setFilters(next);
      
      // For search, we let the useEffect handle navigation (debounce)
      // For everything else, we navigate immediately
      if (key !== "search") {
        navigate(next);
      }
    },
    [filters, navigate]
  );

  const clearFilter = useCallback(
    (key: keyof Filters) => {
      const defaultValue = key === "minPrice" ? 0 : key === "maxPrice" ? 10000 : key === "page" ? 1 : key === "sortBy" ? "newest" : "";
      const next = { ...filters, [key]: defaultValue, page: 1 };
      setFilters(next);
      navigate(next);
    },
    [filters, navigate]
  );

  const clearAll = useCallback(() => {
    const reset: Filters = {
      search: "",
      categoryId: "",
      manufacturer: "",
      minPrice: 0,
      maxPrice: 10000,
      page: 1,
      sortBy: "newest",
    };
    setFilters(reset);
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const setPage = useCallback(
    (page: number) => {
      const next = { ...filters, page };
      setFilters(next);
      navigate(next);
    },
    [filters, navigate]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      updateFilter("sortBy", sort);
    },
    [updateFilter]
  );

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      
      <ResultsBar
        total={meta.total}
        activeCount={activeCount}
        sortBy={filters.sortBy}
        onSortChange={handleSortChange}
        onMobileFilterOpen={() => setMobileFilterOpen(true)}
        isFetching={isFetching}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      {activeCount > 0 && (
        <ActiveFilters
          filters={filters}
          categories={categories}
          onClear={clearFilter}
          onClearAll={clearAll}
        />
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-[260px] shrink-0">
            <FilterSidebar
              filters={filters}
              categories={categories}
              manufacturers={manufacturers}
              onUpdate={updateFilter}
              onClear={clearFilter}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <MedicineGrid
              medicines={medicines}
              isLoading={isLoading}
              isFetching={isFetching}
              meta={meta}
              onPageChange={setPage}
              onClearFilters={clearAll}
              hasActiveFilters={activeCount > 0}
              viewMode={viewMode}
            />
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
        onApply={() => setMobileFilterOpen(false)}
        onClearAll={clearAll}
        total={meta.total}
      />
    </div>
  ); 
}