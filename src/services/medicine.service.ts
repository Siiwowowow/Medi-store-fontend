// src/services/medicine.service.ts

import { httpClient } from "@/lib/axios/httpClient";

export interface Medicine {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
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

export const medicineService = {
  // Get best selling medicines with caching support
  getBestSelling: async (params?: { limit?: number }): Promise<Medicine[]> => {
    try {
      const response = await httpClient.get<Medicine[]>("/medicines", {
        params: {
          sort: "bestselling",
          limit: params?.limit || 4,
        },
      });
      
      // Return data or empty array
      if (response?.success && Array.isArray(response?.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching best selling medicines:", error);
      return [];
    }
  },

  // Get featured medicines
  getFeatured: async (params?: { limit?: number }): Promise<Medicine[]> => {
    try {
      const response = await httpClient.get<Medicine[]>("/medicines", {
        params: {
          sort: "featured",
          limit: params?.limit || 4,
        },
      });
      
      if (response?.success && Array.isArray(response?.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching featured medicines:", error);
      return [];
    }
  },
};