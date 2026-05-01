// src/hooks/useSellerDashboard.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerDashboardStats } from "@/services/sellerDashboard.service";

export const useSellerDashboard = () => {
  return useQuery({
    queryKey: ["seller-dashboard"],
    queryFn: () => getSellerDashboardStats(),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};