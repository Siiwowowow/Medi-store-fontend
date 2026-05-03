/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/admin.service.ts

import { httpClient } from "@/lib/axios/httpClient";

export const adminService = {
  // Sellers
  getAllSellers: async (params?: any) => {
    return await httpClient.get<any[]>("/seller/all", { params });
  },
  
  getPendingSellers: async (params?: any) => {
    return await httpClient.get<any[]>("/seller/pending", { params });
  },

  approveSeller: async (id: string) => {
    return await httpClient.patch<any>(`/seller/${id}/approve`, {});
  },

  rejectSeller: async (id: string) => {
    return await httpClient.delete<any>(`/seller/${id}/reject`);
  },

  // Orders
  getAllOrders: async (params?: any) => {
    return await httpClient.get<any[]>("/orders/admin/all-orders", { params });
  },

  getOrderById: async (id: string) => {
    return await httpClient.get<any>(`/orders/${id}`);
  },

  updateOrderStatus: async (id: string, status: string) => {
    return await httpClient.patch<any>(`/orders/admin/${id}/status`, { status });
  },

  // Medicines (Admin uses seller route since auth supports it)
  deleteMedicine: async (id: string) => {
    return await httpClient.delete<any>(`/medicines/seller/${id}`);
  },

  // Categories
  createCategory: async (data: any) => {
    return await httpClient.post<any>("/categories", data);
  },
  
  updateCategory: async (id: string, data: any) => {
    return await httpClient.patch<any>(`/categories/${id}`, data);
  },

  deleteCategory: async (id: string) => {
    return await httpClient.delete<any>(`/categories/${id}`);
  },

  // Users (Assuming admin backend supports this or we fallback)
  getAllUsers: async (params?: any) => {
    return await httpClient.get<any[]>("/admin/all-users", { params }).catch(() => ({ success: false, data: [] }));
  },

  changeUserStatus: async (data: { userId: string; status: string }) => {
    return await httpClient.patch<any>("/admin/change-user-status", data);
  },

  changeUserRole: async (data: { userId: string; role: string }) => {
    return await httpClient.patch<any>("/admin/change-user-role", data);
  }
};
