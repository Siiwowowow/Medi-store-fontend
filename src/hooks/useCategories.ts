/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useCategories.ts

import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios/httpClient";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    medicines: number;
  };
}

// Helper function to extract categories array from response
const extractCategories = (response: any): ICategory[] => {
  // Case 1: response.data.data is array
  if (response?.data?.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  // Case 2: response.data is array
  if (response?.data && Array.isArray(response.data)) {
    return response.data;
  }
  // Case 3: response is array
  if (Array.isArray(response)) {
    return response;
  }
  // Case 4: response.data is object with data property
  if (response?.data?.data?.data && Array.isArray(response.data.data.data)) {
    return response.data.data.data;
  }
  // Default: empty array
  return [];
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await httpClient.get("/categories");
        console.log("📡 Raw categories response:", response);
        
        const categories = extractCategories(response);
        console.log("📡 Extracted categories:", categories);
        
        return categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000,    // 30 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
};