// src/hooks/useSellerOrders.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerOrders } from "@/services/sellerOrder.service";

export const useSellerOrders = (filters?: { status?: string; search?: string }) => {
  return useQuery({
    queryKey: ["seller-orders", filters],
    queryFn: () => getSellerOrders(filters),
    staleTime: 2 * 60 * 1000,
  });
};