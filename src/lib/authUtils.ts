// src/lib/authUtils.ts

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SELLER" | "CUSTOMER";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route) => route === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

// Customer Routes
export const customerRoutes: RouteConfig = {
  exact: ["/dashboard", "/cart", "/checkout", "/orders", "/wishlist", "/profile"],
  pattern: [/^\/orders\/.*/, /^\/profile\/.*/],
};

// Seller Routes
export const sellerRoutes: RouteConfig = {
  exact: [
    "/seller/dashboard", 
    "/seller/medicines", 
    "/seller/orders", 
    "/seller/profile",
    "/seller/products",      // 👈 NEW
    "/seller/analytics",     // 👈 NEW
    "/seller/settings"       // 👈 NEW
  ],
  pattern: [/^\/seller\/.*/],
};

// 👇 NEW: Seller approval pending routes (accessible without approval)
export const sellerApprovalRoutes: RouteConfig = {
  exact: ["/seller/pending-approval", "/seller/approval-status"],
  pattern: [],
};

// Admin Routes
export const adminRoutes: RouteConfig = {
  exact: ["/admin/dashboard", "/admin/users", "/admin/orders", "/admin/categories", "/admin/sellers"],
  pattern: [/^\/admin\/.*/],
};

// Common Protected Routes
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/change-password", "/profile"],
  pattern: [],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.pattern.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "SELLER" | "CUSTOMER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, sellerRoutes)) return "SELLER";
  if (isRouteMatches(pathname, customerRoutes)) return "CUSTOMER";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

// 👇 NEW: Check if route is seller approval page
export const isSellerApprovalRoute = (pathname: string): boolean => {
  return isRouteMatches(pathname, sellerApprovalRoutes);
};

// 👇 NEW: Check if route requires seller approval
export const requiresSellerApproval = (pathname: string): boolean => {
  // Seller routes that need approval check
  const protectedSellerRoutes = [
    "/seller/dashboard",
    "/seller/medicines",
    "/seller/products",
    "/seller/orders",
    "/seller/analytics",
    "/seller/profile",
    "/seller/settings"
  ];
  
  // Exclude approval routes
  if (isSellerApprovalRoute(pathname)) return false;
  
  return protectedSellerRoutes.some(route => pathname.startsWith(route));
};

// 👇 NEW: Get seller redirect based on approval status
export const getSellerRedirectUrl = (isApproved: boolean, defaultRoute?: string): string => {
  if (!isApproved) {
    return "/seller/pending-approval";
  }
  return defaultRoute || "/seller/dashboard";
};

// ✅ Role অনুযায়ী Dashboard Route
export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin/dashboard";
    case "SELLER":
      return "/seller/dashboard";
    case "CUSTOMER":
      return "/dashboard";
    default:
      return "/";
  }
};

// 👇 NEW: Get dashboard route with seller approval check
export const getDashboardRouteWithApproval = (role: UserRole, isSellerApproved: boolean = false): string => {
  if (role === "SELLER" && !isSellerApproved) {
    return "/seller/pending-approval";
  }
  return getDefaultDashboardRoute(role);
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
  const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
  const routeOwner = getRouteOwner(sanitizedRedirectPath);

  if (routeOwner === null || routeOwner === "COMMON") return true;

  // SUPER_ADMIN can access admin routes
  if (routeOwner === "ADMIN" && (role === "SUPER_ADMIN" || role === "ADMIN")) return true;
  if (routeOwner === role) return true;

  return false;
};

// ✅ লগইন বা রেজিস্ট্রেশনের পর রিডাইরেক্ট (Updated with seller approval)
export const getRedirectAfterLogin = (
  role: UserRole, 
  redirectPath?: string,
  isSellerApproved: boolean = true
): string => {
  // Handle seller approval case first
  if (role === "SELLER" && !isSellerApproved) {
    return "/seller/pending-approval";
  }
  
  // যদি redirectPath দেওয়া থাকে এবং valid হয়
  if (redirectPath && isValidRedirectForRole(redirectPath, role)) {
    return redirectPath;
  }
  
  // নাহলে রোল অনুযায়ী ডিফল্ট ড্যাশবোর্ড
  return getDefaultDashboardRoute(role);
};