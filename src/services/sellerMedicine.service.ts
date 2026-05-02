// src/services/sellerMedicine.service.ts

import { httpClient } from "@/lib/axios/httpClient";

export const getSellerMedicines = async (filters?: { search?: string; status?: string; stock?: string }) => {
  const params = new URLSearchParams();
  if (filters?.search) params.append("search", filters.search);
  if (filters?.status === "active") params.append("isActive", "true");
  if (filters?.status === "inactive") params.append("isActive", "false");
  
  const response = await httpClient.get(`/medicines/seller/my-medicines?${params.toString()}`);
  
  // Extract medicines array safely
  const medicines = response?.data || [];
  
  return { 
    medicines: Array.isArray(medicines) ? medicines : [] 
  };
};

export const deleteMedicine = async (id: string) => {
  const response = await httpClient.delete(`/medicines/seller/${id}`);
  return response.data;
};

export const createMedicine = async (data: FormData) => {
  const response = await httpClient.post("/medicines/seller", data, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 120000, // 2 min — Cloudinary upload can be slow on first request
  });
  return response.data;
};

export const updateMedicine = async (id: string, data: FormData) => {
  const response = await httpClient.patch(`/medicines/seller/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 120000, // 2 min — Cloudinary upload can be slow on first request
  });
  return response.data;
};