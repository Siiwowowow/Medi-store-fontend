// src/services/categories.service.ts

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  _count?: {
    medicines: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const categoryService = {
  // ✅ Always return an array (never undefined)
  getAllCategories: async (params?: { limit?: number; includeInactive?: boolean }): Promise<Category[]> => {
    try {
      const response = await httpClient.get<CategoriesResponse>("/categories", {
        params: {
          limit: params?.limit || 8,
          includeInactive: params?.includeInactive || false,
        },
      });
      
      // ✅ Return data array or empty array if something goes wrong
      if (response?.data && Array.isArray(response.data)) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      // ✅ Return empty array on error instead of undefined
      return [];
    }
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category | null> => {
    try {
      const response = await httpClient.get<{ success: boolean; data: Category }>(`/categories/${id}`);
      if (response?.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  },

  // Get category by slug
  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    try {
      const response = await httpClient.get<{ success: boolean; data: Category }>(`/categories/slug/${slug}`);
      if (response?.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  },
};