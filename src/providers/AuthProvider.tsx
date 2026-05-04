"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser, getUserInfo } from "@/services/auth.services";


import { ICurrentUser } from "@/types/user.types";


interface AuthContextType {
    user: ICurrentUser | null;
    setUser: (user: ICurrentUser | null) => void;
    logout: () => Promise<void>;
    isLoading: boolean;
    isSellerApproved: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ 
    children, 
    initialUser 
}: { 
    children: React.ReactNode; 
    initialUser: ICurrentUser | null;
}) {
    // Use initialUser if available, otherwise start as loading
    const [user, setUser] = useState<ICurrentUser | null>(initialUser);
    const [isLoading, setIsLoading] = useState(!initialUser);

    useEffect(() => {
        const fetchUser = async () => {
            // If we already have a user from server side, we can skip the initial loading state
            // but still refresh in the background
            try {
                const userData = await getUserInfo();
                console.log("🟢 [AuthProvider] User Refresh:", userData);
                
                if (userData) {
                    const newUser: ICurrentUser = {
                        id: userData.id,
                        email: userData.email,
                        name: userData.name,
                        role: userData.role,
                        emailVerified: userData.emailVerified,
                        needPasswordChange: userData.needPasswordChange,
                        isDeleted: userData.isDeleted,
                        status: userData.status,
                        image: userData.image,
                        // Priority order for approval status
                        isSellerApproved: userData.isSellerApproved === true,
                        sellerStatus: userData.sellerStatus,
                        shopName: userData.shopName || userData.seller?.shopName,
                        sellerId: userData.sellerId || userData.seller?.id,
                    };
                    setUser(newUser);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUser();
    }, []);

    const logout = async () => {
        setUser(null);
        await logoutUser();
        window.location.href = "/login";
    };

    const isSellerApproved = user?.role === 'SELLER' 
        ? user?.isSellerApproved === true 
        : true;

    return (
        <AuthContext.Provider value={{ user, setUser, logout, isLoading, isSellerApproved }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};