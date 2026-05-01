/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useSellerMedicines.ts

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSellerMedicines, deleteMedicine, createMedicine, updateMedicine } from "@/services/sellerMedicine.service";

export const useSellerMedicines = (filters?: { search?: string; status?: string; stock?: string }) => {
  return useQuery({
    queryKey: ["seller-medicines", filters],
    queryFn: async () => {
      const response = await getSellerMedicines(filters);
      return { medicines: response.medicines || [] };
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteMedicine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
      queryClient.invalidateQueries({ queryKey: ["seller-dashboard"] });
      toast.success("Medicine deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete medicine");
    },
  });
};

export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => createMedicine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
      queryClient.invalidateQueries({ queryKey: ["seller-dashboard"] });
      toast.success("Medicine added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add medicine");
    },
  });
};

export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateMedicine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-medicines"] });
      queryClient.invalidateQueries({ queryKey: ["medicine"] });
      toast.success("Medicine updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update medicine");
    },
  });
};