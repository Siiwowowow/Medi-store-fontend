// src/services/category.service.ts

import { httpClient } from "@/lib/axios/httpClient";

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
  // Get all categories
  getAllCategories: async (params?: { limit?: number; includeInactive?: boolean }): Promise<Category[]> => {
    try {
      const response = await httpClient.get<CategoriesResponse>("/categories", {
        params: {
          limit: params?.limit || 50,
          includeInactive: params?.includeInactive || false,
        },
      });
      
      if (response?.success && Array.isArray(response?.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category | null> => {
    try {
      const response = await httpClient.get<{ success: boolean; data: Category }>(`/categories/${id}`);
      if (response?.success && response?.data) {
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
      if (response?.success && response?.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }
  },
};