// src/hooks/useAdminDashboard.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "@/services/adminDashboard.service";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => getAdminDashboardStats(),
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
    refetchInterval: 60000, // Refresh every minute
  });
};