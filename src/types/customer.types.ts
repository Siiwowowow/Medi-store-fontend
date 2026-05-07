export interface IWishlistItem {
  id: string;
  medicineId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  category: string;
  description?: string;
  createdAt: string;
}

export interface ICartItem {
  id: string;
  medicineId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  stock: number;
  category: string;
  subtotal: number;
}

export interface ICart {
  items: ICartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface IOrderItem {
  id: string;
  medicineName: string;
  medicineImage?: string;
  quantity: number;
  unitPrice: number;
  price?: number;
  totalPrice: number;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  items: IOrderItem[];
  payment?: {
    id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    transactionId?: string;
    amount: number;
    paymentMethod: string;
  };
}

export interface IOrderResponse {
  orders: IOrder[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
