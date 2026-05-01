// src/hooks/useSellerMedicines.ts

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSellerMedicines, deleteMedicine, createMedicine } from "@/services/sellerMedicine.service";

export const useSellerMedicines = (filters?: { search?: string; status?: string; stock?: string }) => {
  return useQuery({
    queryKey: ["seller-medicines", filters],
    queryFn: () => getSellerMedicines(filters),
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
    onError: () => {
      toast.error("Failed to delete medicine");
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
    onError: () => {
      toast.error("Failed to add medicine");
    },
  });
};