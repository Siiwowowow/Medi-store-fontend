/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/medicine.service.ts

import { httpClient } from "@/lib/axios/httpClient";

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
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Medicine[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const medicineService = {
  // ✅ FIXED: getAllMedicines with correct params
  getAllMedicines: async (params: {
    searchTerm?: string;
    categoryId?: string;
    manufacturer?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
    sort?: string;
  }): Promise<ProductsResponse> => {
    try {
      const queryParams: Record<string, any> = {};

      if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
      if (params.categoryId) queryParams.categoryId = params.categoryId;
      if (params.manufacturer) queryParams.manufacturer = params.manufacturer;
      if (params.minPrice && params.minPrice > 0) queryParams.minPrice = params.minPrice;
      if (params.maxPrice && params.maxPrice < 10000) queryParams.maxPrice = params.maxPrice;
      if (params.page) queryParams.page = params.page;
      if (params.limit) queryParams.limit = params.limit;
      if (params.sortBy) queryParams.sortBy = params.sortBy;
      if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
      if (params.sort) queryParams.sort = params.sort;

      const response = await httpClient.get<Medicine[]>("/medicines", {
        params: queryParams,
      });

      if (response?.success) {
        return response as ProductsResponse;
      }
      return {
        success: false,
        message: "Failed to fetch medicines",
        data: [],
        meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
      };
    } catch (error) {
      console.error("Error fetching medicines:", error);
      return {
        success: false,
        message: "Error fetching medicines",
        data: [],
        meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
      };
    }
  },

  getBestSelling: async (params?: { limit?: number }): Promise<Medicine[]> => {
    try {
      const response = await httpClient.get<Medicine[]>("/medicines", {
        params: {
          sort: "bestselling",
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

  getManufacturers: async (): Promise<string[]> => {
    try {
      const response = await httpClient.get<string[]>("/medicines/manufacturers");
      if (response?.success && Array.isArray(response?.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      return [];
    }
  },
};