// src/hooks/useDashboardData.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerStats } from "@/services/seller.service";
import { useAuth } from "@/providers/AuthProvider";

export const useDashboardData = () => {
    const { user } = useAuth();
    
    return useQuery({
        queryKey: ["seller-stats", user?.id],
        queryFn: () => getSellerStats(),
        enabled: !!user && user.role === 'SELLER',
        staleTime: 5 * 60 * 1000,
    });
};