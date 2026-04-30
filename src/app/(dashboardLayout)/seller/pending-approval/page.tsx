/* eslint-disable react/no-unescaped-entities */
"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Store, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  LogOut,
  RefreshCw,
  ShoppingBag,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function PendingApprovalPage() {
  const { user, isSellerApproved, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && isSellerApproved) {
      router.push('/seller/dashboard');
    }
  }, [isSellerApproved, isLoading, router]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-shop_light_bg via-white to-shop_light_pink">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-shop_light_green/20 border-t-shop_light_green rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Store className="w-8 h-8 text-shop_dark_green animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-shop_light_bg via-white to-shop_light_pink">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-shop_light_green rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-shop_orange rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            {/* Header with Brand */}
            <div className="bg-gradient-to-r from-shop_dark_green to-shop_light_green px-6 py-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12"></div>
              <div className="relative">
                <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4">
                  <Store className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">MediStore</h1>
                <p className="text-white/80 text-sm mt-1">Seller Partnership Program</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full">
                  <Clock className="w-4 h-4 text-yellow-600 animate-pulse" />
                  <span className="text-sm font-medium text-yellow-700">Pending Review</span>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome, {user?.name?.split(' ')[0]}! 👋
                </h2>
                <p className="text-gray-500">
                  Your seller application is being reviewed by our team
                </p>
              </div>

              {/* Shop Information Card */}
              <div className="bg-gradient-to-r from-shop_light_pink to-white rounded-xl p-5 mb-8 border border-shop_orange/20">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-shop_orange" />
                  Shop Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Store className="w-4 h-4 text-shop_light_green mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Shop Name</p>
                      <p className="font-medium text-gray-800">{user?.shopName || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-shop_light_green mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-800">{user?.email}</p>
                    </div>
                  </div>
                  {user?.sellerId && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-shop_light_green mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Application ID</p>
                        <p className="font-mono text-sm text-gray-600">{user.sellerId.slice(0, 12)}...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600">Application<br/>Submitted</p>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 relative">
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-xs text-gray-600">Under<br/>Review</p>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200"></div>
                  <div className="text-center flex-1">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400">Approved<br/>& Active</p>
                  </div>
                </div>
              </div>

              {/* Info Message */}
              <div className="bg-blue-50 rounded-lg p-4 mb-8 border border-blue-100">
                <p className="text-sm text-blue-800 text-center">
                  ⏱️ Review typically takes 24-48 hours.<br/>
                  We'll notify you via email once approved.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="w-full py-3 px-4 bg-gradient-to-r from-shop_dark_green to-shop_light_green hover:from-shop_light_green hover:to-shop_dark_green text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Check Approval Status
                    </>
                  )}
                </button>
                
                <button 
                  onClick={logout}
                  className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@medistore.com" className="text-shop_light_green hover:underline">
                  support@medistore.com
                </a>
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400 animate-pulse">
              Secure & Verified Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}