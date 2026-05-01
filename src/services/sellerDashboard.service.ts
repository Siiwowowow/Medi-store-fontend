/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/sellerDashboard.service.ts

import { httpClient } from "@/lib/axios/httpClient";
import { IDashboardStats } from "@/types/seller.types";

export const getSellerDashboardStats = async (): Promise<IDashboardStats> => {
  try {
    // Get medicine stats
    const statsRes = await httpClient.get<any>("/medicines/seller/stats");
    // 👇 Your response: { success, data: { totalMedicines, activeMedicines, ... } }
    const medicineStats = statsRes?.data;  // ✅ Remove extra .data
    
    // Get recent orders
    const ordersRes = await httpClient.get<any>("/dashboard/seller/orders?limit=10");
    // 👇 Your response: { success, data: { orders: [...], meta: {...} } }
    const orders = ordersRes?.data?.orders || [];
    
    // Get low stock medicines
    const lowStockRes = await httpClient.get<any>("/dashboard/seller/low-stock?threshold=10");
    // 👇 Your response: { success, data: [...] }
    const lowStockMedicines = lowStockRes?.data || [];
    
    // Calculate today's revenue
    const today = new Date().toDateString();
    const todayRevenue = orders
      .filter((order: any) => new Date(order.createdAt).toDateString() === today)
      .reduce((sum: number, order: any) => sum + (order.sellerTotal || order.totalAmount || 0), 0);
    
    return {
      totalMedicines: medicineStats?.totalMedicines || 0,
      activeMedicines: medicineStats?.activeMedicines || 0,
      lowStockCount: medicineStats?.lowStockCount || 0,
      totalOrders: medicineStats?.totalOrders || 0,
      pendingOrders: orders.filter((o: any) => o.status === "PENDING").length,
      todayRevenue,
      revenueGrowth: "+12%",
      recentOrders: orders.slice(0, 5),
      lowStockMedicines: lowStockMedicines.slice(0, 5),
    };
  } catch (error) {
    console.error("Error fetching seller dashboard:", error);
    return {
      totalMedicines: 0,
      activeMedicines: 0,
      lowStockCount: 0,
      totalOrders: 0,
      pendingOrders: 0,
      todayRevenue: 0,
      revenueGrowth: "+0%",
      recentOrders: [],
      lowStockMedicines: [],
    };
  }
};