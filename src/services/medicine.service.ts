/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";

export interface Medicine {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  manufacturer: string;
  image?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  avgRating?: number;
  reviewCount?: number;
}

export type ProductsResponse = ApiResponse<Medicine[]>;

export const medicineService = {
  getAllMedicines: async (params: {
    search?: string;
    categoryId?: string;
    manufacturer?: string;
    minPrice?: number;
    maxPrice?: number;
    minStock?: number;
    stock?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<ProductsResponse> => {
    try {
      const queryParams: Record<string, any> = {};

      // ✅ Core params
      queryParams.page = params.page || 1;
      queryParams.limit = params.limit || 12;

      // ✅ SEARCH
      if (params.search && params.search.trim() !== "") {
        queryParams.search = params.search.trim();
      }

      // ✅ Filters
      if (params.categoryId) queryParams.categoryId = params.categoryId;
      if (params.manufacturer) queryParams.manufacturer = params.manufacturer;
      if (params.minPrice && params.minPrice > 0) queryParams.minPrice = params.minPrice;
      if (params.maxPrice && params.maxPrice < 10000) queryParams.maxPrice = params.maxPrice;
      if (params.minStock !== undefined) queryParams.minStock = params.minStock;
      if (params.stock !== undefined) queryParams.stock = params.stock;

      // ✅ Sorting
      if (params.sortBy) queryParams.sortBy = params.sortBy;
      if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

      // We expect httpClient.get<Medicine[]> to return ApiResponse<Medicine[]>
      // which matches our ProductsResponse type.
      const response = await httpClient.get<Medicine[]>("/medicines", {
        params: queryParams,
      });

      if (response?.success) return response;

      return {
        success: false,
        message: "Failed to fetch medicines",
        data: [],
        meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
      };
    } catch (error) {
      console.error("❌ API ERROR:", error);
      return {
        success: false,
        message: "Error fetching medicines",
        data: [],
        meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
      };
    }
  },

  getManufacturers: async (): Promise<string[]> => {
    try {
      // httpClient.get<string[]> returns ApiResponse<string[]>
      const response = await httpClient.get<string[]>("/medicines/manufacturers");
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      return [];
    }
  },

  getMedicineById: async (id: string): Promise<Medicine | null> => {
    try {
      // httpClient.get<Medicine> returns ApiResponse<Medicine>
      const response = await httpClient.get<Medicine>(`/medicines/${id}`);
      return response?.data || null;
    } catch (error) {
      console.error("Error fetching medicine by id:", error);
      return null;
    }
  },
  getBestSelling: async (params?: { limit?: number }): Promise<Medicine[]> => {
    try {
      const response = await httpClient.get<Medicine[]>("/medicines", {
        params: {
          sortBy: "orderCount",
          sortOrder: "desc",
          limit: params?.limit || 4,
        },
      });
      if (response?.success && Array.isArray(response?.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching best selling medicines:", error);
      return [];
    }
  },
};