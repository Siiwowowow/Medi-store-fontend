/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";

import { useState, useCallback, useTransition, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMedicines, useManufacturers } from "@/hooks/useMedicines";
import { categoryService } from "@/services/category.service";
import { useDebounce } from "@/hooks/useDebounce";

import ResultsBar from "./ResultsBar";
import ActiveFilters from "./ActiveFilters";
import MedicineGrid from "./MedicineGrid";
import MobileFilterDrawer from "./MobileFilterDrawer";
import FilterSidebar from "./FilterSidebar";

export interface Filters {
  search: string;
  categoryId: string;
  manufacturer: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  sortBy: string;
  availability: string;
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
  if (f.availability !== "all") p.set("availability", f.availability);
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
    availability?: string;
  };
}

export default function ShopClient({ initialParams }: ShopClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [categories, setCategories] = useState<any[]>([]);

  const [filters, setFilters] = useState<Filters>({
    search: initialParams.search || "",
    categoryId: initialParams.categoryId || "",
    manufacturer: initialParams.manufacturer || "",
    minPrice: initialParams.minPrice ? Number(initialParams.minPrice) : 0,
    maxPrice: initialParams.maxPrice ? Number(initialParams.maxPrice) : 10000,
    page: initialParams.page ? Number(initialParams.page) : 1,
    sortBy: initialParams.sortBy || "newest",
    availability: initialParams.availability || "all",
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await categoryService.getAllCategories({ limit: 50 });
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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

  // Sync state with URL
  useEffect(() => {
    setFilters({
      search: initialParams.search || "",
      categoryId: initialParams.categoryId || "",
      manufacturer: initialParams.manufacturer || "",
      minPrice: initialParams.minPrice ? Number(initialParams.minPrice) : 0,
      maxPrice: initialParams.maxPrice ? Number(initialParams.maxPrice) : 10000,
      page: initialParams.page ? Number(initialParams.page) : 1,
      sortBy: initialParams.sortBy || "newest",
      availability: initialParams.availability || "all",
    });
  }, [initialParams]);

  // Debounced values
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedMin = useDebounce(filters.minPrice, 500);
  const debouncedMax = useDebounce(filters.maxPrice, 500);

  // Auto-apply when debounced values change
  useEffect(() => {
    const hasChanged =
      debouncedSearch !== (initialParams.search || "") ||
      debouncedMin !== (Number(initialParams.minPrice) || 0) ||
      debouncedMax !== (Number(initialParams.maxPrice) || 10000);

    if (hasChanged) {
      const next = {
        ...filtersRef.current,
        search: debouncedSearch,
        minPrice: debouncedMin,
        maxPrice: debouncedMax,
        page: 1,
      };
      navigate(next);
    }
  }, [debouncedSearch, debouncedMin, debouncedMax, navigate, initialParams]);

  const { data, isLoading, isFetching } = useMedicines({
    search: filters.search || undefined,
    categoryId: filters.categoryId || undefined,
    manufacturer: filters.manufacturer || undefined,
    minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
    maxPrice: filters.maxPrice < 10000 ? filters.maxPrice : undefined,
    availability: filters.availability,
    page: filters.page,
    limit: 12,
    sortBy: filters.sortBy,
  });

  const { data: manufacturers = [] } = useManufacturers();

  const medicines = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 12, totalPages: 1 };

  const activeCount = [
    filters.search,
    filters.categoryId,
    filters.manufacturer,
    filters.minPrice > 0 ? "price" : null,
    filters.maxPrice < 10000 ? "price" : null,
    filters.availability !== "all" ? "availability" : null,
  ].filter(Boolean).length;

  const updateFilter = useCallback(
    (key: keyof Filters, value: string | number) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value, page: 1 };
        const isDebounced = ["search", "minPrice", "maxPrice"].includes(key);
        if (!isDebounced) {
          navigate(next);
        }
        return next;
      });
    },
    [navigate]
  );

  const clearFilter = useCallback(
    (key: keyof Filters) => {
      const defaultValue =
        key === "minPrice" ? 0 : key === "maxPrice" ? 10000 : key === "page" ? 1 : key === "sortBy" ? "newest" : key === "availability" ? "all" : "";
      setFilters((prev) => {
        const next = { ...prev, [key]: defaultValue, page: 1 };
        navigate(next);
        return next;
      });
    },
    [navigate]
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
      availability: "all",
    };
    setFilters(reset);
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const setPage = useCallback(
    (page: number) => {
      setFilters((prev) => {
        const next = { ...prev, page };
        navigate(next);
        return next;
      });
    },
    [navigate]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      updateFilter("sortBy", sort);
    },
    [updateFilter]
  );

  const handleApplyFilters = useCallback(() => setMobileFilterOpen(false), []);

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      <div className="bg-gradient-to-r from-[#063c28] to-[#0a5c40] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-[#fcf0e4]/60 text-sm mb-2 font-medium">
            <span>Home</span> / <span className="text-[#fcf0e4]">Shop</span>
          </nav>
          <h1 className="text-white text-[36px] font-bold leading-tight">Medicine Shop</h1>
        </div>
      </div>

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

      <div className="max-w-[1280px] mx-auto">
        <div className="flex">
          <aside className="hidden lg:block w-[260px] bg-white border-r border-gray-100 min-h-[calc(100vh-216px)] shrink-0">
            <FilterSidebar
              filters={filters}
              categories={categories}
              manufacturers={manufacturers}
              onUpdate={updateFilter}
              onClear={clearFilter}
              onApply={handleApplyFilters}
            />
          </aside>

          <main className="flex-1 bg-[#f6f6f6] min-w-0 pb-20">
            {activeCount > 0 && (
              <ActiveFilters
                filters={filters}
                categories={categories}
                onClear={clearFilter}
                onClearAll={clearAll}
              />
            )}

            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <MedicineGrid
                medicines={medicines}
                isLoading={isLoading}
                isFetching={isFetching}
                onPageChange={setPage}
                onClearFilters={clearAll}
                hasActiveFilters={activeCount > 0}
                viewMode={viewMode}
              />
            </div>
          </main>
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
        onClearAll={clearAll}
        total={meta.total}
      />
    </div>
  );
}