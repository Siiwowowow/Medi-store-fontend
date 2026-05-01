/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export const getSellerOrders = async (filters?: { status?: string; page?: number; limit?: number }) => {
  const response = await httpClient.get<any>("/orders/seller/orders", {
    params: filters
  });
  // 👉 response.data এ orders array আছে
  return { orders: response?.data?.orders || [] };
};