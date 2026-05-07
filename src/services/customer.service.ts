import { httpClient } from "@/lib/axios/httpClient";
import { ICart, IWishlistItem, IOrderResponse, IOrder } from "@/types/customer.types";

export interface IPaymentInitiateResponse {
  paymentUrl: string;
  sessionId: string;
}


export const getOrderById = async (orderId: string): Promise<IOrder> => {
  const response = await httpClient.get<IOrder>(`/orders/${orderId}`);
  return response.data;
};

export const verifyPayment = async (sessionId: string) => {
  const response = await httpClient.get(`/payment/verify`, {
    params: { sessionId }
  });
  return response.data;
};

// --- ORDERS ---
export const getCustomerOrders = async (filters?: { status?: string }): Promise<IOrderResponse> => {
  const response = await httpClient.get<IOrder[]>("/orders/my-orders", {
    params: filters
  });
  
  return {
    orders: response.data || [],
    meta: response.meta || { page: 1, limit: 10, total: 0, totalPages: 0 }
  };
};

export const createOrder = async (payload: { 
  items: { medicineId: string; quantity: number }[]; 
  shippingAddress: string; 
  phoneNumber: string; 
  notes?: string 
}) => {
  const response = await httpClient.post<IOrder>("/orders", payload);
  return response;
};

export const initiatePayment = async (orderId: string, paymentMethod: 'STRIPE' | 'SSLCOMMERZ') => {
  const response = await httpClient.post<IPaymentInitiateResponse>("/payment/initiate", { orderId, paymentMethod });
  return response;
};

export const cancelOrder = async (orderId: string) => {
  const response = await httpClient.patch(`/orders/${orderId}/cancel`, {});
  return response?.data;
};

// --- WISHLIST ---
export const getCustomerWishlist = async () => {
  const response = await httpClient.get<IWishlistItem[]>("/wishlist");
  return response?.data || [];
};


export const removeFromWishlist = async (wishlistId: string) => {
  const response = await httpClient.delete(`/wishlist/${wishlistId}`);
  return response?.data;
};

export const addToWishlist = async (medicineId: string) => {
  const response = await httpClient.post("/wishlist/add", { medicineId });
  return response?.data;
};

// --- CART ---
export const getCustomerCart = async () => {
  const response = await httpClient.get<ICart>("/cart");
  return response?.data;
};


export const addToCart = async (medicineId: string, quantity: number = 1) => {
  const response = await httpClient.post("/cart/add", { medicineId, quantity });
  return response?.data;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const response = await httpClient.patch(`/cart/items/${itemId}`, { quantity });
  return response?.data;
};

export const removeFromCart = async (itemId: string) => {
  const response = await httpClient.delete(`/cart/items/${itemId}`);
  return response?.data;
};

export const clearCart = async () => {
  const response = await httpClient.delete("/cart/clear");
  return response?.data;
};
