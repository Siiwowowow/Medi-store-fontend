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


export const categoryService = {
  // Get all categories - returns Category[]
  getAllCategories: async (params?: { limit?: number; includeInactive?: boolean }): Promise<Category[]> => {
    try {
      const response = await httpClient.get<Category[]>("/categories", {
        params: {
          limit: params?.limit || 8,
          includeInactive: params?.includeInactive || false,
        },
      });
      
      if (response?.success && response?.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Get category by ID - returns Category | null
  getCategoryById: async (id: string): Promise<Category | null> => {
    try {
      const response = await httpClient.get<Category>(`/categories/${id}`);
      if (response?.success && response?.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  },

  // Get category by slug - returns Category | null
  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    try {
      const response = await httpClient.get<Category>(`/categories/slug/${slug}`);
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