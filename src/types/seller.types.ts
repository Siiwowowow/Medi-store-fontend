/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/seller.types.ts

export interface ISeller {
  id: string;
  userId: string;
  shopName: string;
  shopAddress?: string;
  phoneNumber?: string;
  isApproved: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IMedicine {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  genericName?: string;
  dosageForm?: string;
  strength?: string;
  image?: string;
  isActive: boolean;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  orderCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  items?: IOrderItem[];
  customer?: {
    user: {
      name: string;
      email: string;
      image?: string;
    };
  };
}

export interface IOrderItem {
  id: string;
  orderId: string;
  medicineId: string;
  medicineName: string;
  medicineImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IDashboardStats {
  totalMedicines: number;
  activeMedicines: number;
  lowStockCount: number;
  totalOrders: number;
  pendingOrders: number;
  todayRevenue: number;
  revenueGrowth: string;
  recentOrders: IOrder[];
  lowStockMedicines: IMedicine[];
}

export interface IApiResponse<T> {
  [x: string]: any;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}