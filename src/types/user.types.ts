// src/types/user.types.ts
import { UserRole } from "@/lib/authUtils";

export interface ICurrentUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    emailVerified: boolean;
    needPasswordChange: boolean;
    isDeleted: boolean;
    status: string;
    image?: string | null;
    uploadedImage?: string | null;
    isSellerApproved?: boolean;
    sellerStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
    shopName?: string;
    sellerId?: string;
}