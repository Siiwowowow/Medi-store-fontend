// src/services/adminDashboard.service.ts

import { httpClient } from "@/lib/axios/httpClient";

export interface IAdminDashboardData {
  users: {
    total: number;
    sellers: number;
    customers: number;
    admins: number;
    superAdmins: number;
    pendingSellers: number;
  };
  products: {
    total: number;
    active: number;
    inactive: number;
  };
  orders: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    completionRate: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    today: number;
    growth: string;
  };
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    itemsCount: number;
  }>;
  pendingSellers: Array<{
    id: string;
    shopName: string;
    user: {
      name: string;
      email: string;
      joinedAt: string;
    };
    createdAt: string;
  }>;
  lastUpdated: string;
}

export const getAdminDashboardStats = async (): Promise<IAdminDashboardData> => {
  try {
    const response = await httpClient.get<IAdminDashboardData>("/dashboard/admin");
    return response?.data as IAdminDashboardData;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    return {
      users: { total: 0, sellers: 0, customers: 0, admins: 0, superAdmins: 0, pendingSellers: 0 },
      products: { total: 0, active: 0, inactive: 0 },
      orders: { total: 0, pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, completionRate: 0 },
      revenue: { total: 0, thisMonth: 0, today: 0, growth: "+0%" },
      recentOrders: [],
      pendingSellers: [],
      lastUpdated: new Date().toISOString(),
    };
  }
};