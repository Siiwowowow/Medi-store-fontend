// src/services/auth.services.ts

"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";
import { jwtUtils } from "@/lib/jwtUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export interface IRefreshTokenData {
    accessToken: string;
    refreshToken: string;
    token: string;
}

export async function getNewTokensWithRefreshToken(refreshToken: string): Promise<IRefreshTokenData | null> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`
            }
        });

        if (!res.ok) {
            return null;
        }

        const { data } = await res.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if (accessToken) await setTokenInCookies("accessToken", accessToken);
        if (newRefreshToken) await setTokenInCookies("refreshToken", newRefreshToken);
        if (token) await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        return { accessToken, refreshToken: newRefreshToken, token };
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}

async function refreshAndGetTokens(
    refreshToken: string
): Promise<{ accessToken: string; sessionToken: string } | null> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`
            }
        });

        if (!res.ok) return null;

        const { data } = await res.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if (!accessToken) return null;

        await setTokenInCookies("accessToken", accessToken);
        if (newRefreshToken) await setTokenInCookies("refreshToken", newRefreshToken);
        if (token) await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        return { accessToken, sessionToken: token ?? "" };
    } catch (error) {
        console.error("Error in refreshAndGetTokens:", error);
        return null;
    }
}

export async function getUserInfo() {
    try {
        const cookieStore = await cookies();
        let accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!accessToken && refreshToken) {
            const newTokens = await refreshAndGetTokens(refreshToken);
            if (newTokens) {
                accessToken = newTokens.accessToken;
            }
        }

        if (!accessToken) {
            return null;
        }

        // Optimization: Parallel fetching if the user is a seller
        const decoded = jwtUtils.decodedToken(accessToken);
        const role = decoded?.role;

        if (role === 'SELLER') {
            try {
                // Fetch both in parallel
                const [meRes, sellerRes] = await Promise.all([
                    fetch(`${BASE_API_URL}/auth/me`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Cookie: `accessToken=${accessToken}`
                        }
                    }),
                    fetch(`${BASE_API_URL}/sellers/profile`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Cookie: `accessToken=${accessToken}`
                        }
                    })
                ]);

                if (!meRes.ok) {
                    // Fallback to sequential or error handling if parallel fails
                    console.error("Parallel fetch failed for /auth/me");
                    return null;
                }

                const meData = await meRes.json();
                const userData = meData.data;

                if (sellerRes.ok) {
                    const sellerData = await sellerRes.json();
                    return {
                        ...userData,
                        isSellerApproved: sellerData.data.isApproved ?? userData.isSellerApproved ?? false,
                        sellerStatus: (sellerData.data.isApproved ?? userData.isSellerApproved) ? 'APPROVED' : 'PENDING',
                        shopName: sellerData.data.shopName,
                        sellerId: sellerData.data.id,
                        seller: sellerData.data
                    };
                }

                return userData;
            } catch (error) {
                console.error("Error in parallel fetch:", error);
                // Fallback logic could go here, but for now we'll just return null or basic data
                return null;
            }
        }

        // Standard sequential fetch for non-sellers or as fallback
        let res = await fetch(`${BASE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`
            }
        });

        if (res.status === 401 && refreshToken) {
            const newTokens = await refreshAndGetTokens(refreshToken);
            if (newTokens) {
                res = await fetch(`${BASE_API_URL}/auth/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `accessToken=${newTokens.accessToken}`
                    }
                });
            }
        }

        if (!res.ok) return null;
        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}

export async function logoutUser() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        cookieStore.delete("better-auth.session_token");
        return true;
    } catch (error) {
        console.error("Logout failed", error);
        return false;
    }
}