/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export interface ISellerStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    shopStatus: string;
    recentOrders: any[];
    growth?: string;
    pendingOrders?: number;
    processingOrders?: number;
    activeProducts?: number;
    lowStockCount?: number;
    rating?: number;
    reviewCount?: number;
}

export const getSellerStats = async (): Promise<ISellerStats> => {
    try {
        const response = await httpClient.get<any>('/dashboard/seller/stats');
        
        // Transform the response data to match our interface if necessary
        // Based on the user's previous code, we might need to transform it
        const data = response.data;
        
        return {
            totalRevenue: data?.revenue?.total ?? 0,
            totalOrders: data?.orders?.total ?? 0,
            totalProducts: data?.products?.total ?? 0,
            growth: data?.growth ?? "+0%",
            pendingOrders: data?.orders?.pending ?? 0,
            processingOrders: data?.orders?.processing ?? 0,
            activeProducts: data?.products?.active ?? 0,
            lowStockCount: data?.products?.lowStock ?? 0,
            rating: data?.rating?.average ?? 0,
            reviewCount: data?.rating?.count ?? 0,
            shopStatus: data?.shopStatus ?? "ACTIVE",
            recentOrders: data?.recentOrders ?? []
        };
    } catch (error) {
        console.error("Error fetching seller stats:", error);
        throw error;
    }
};
