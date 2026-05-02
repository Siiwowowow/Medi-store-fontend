// src/app/(dashboardLayout)/seller/profile/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Camera, 
  Save, 
  X,
  Edit2,
  CheckCircle,
  AlertCircle,
  Building2,
  FileText,
  CreditCard,
  Smartphone,
  Globe,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface ShopProfile {
  shopName: string;
  shopDescription: string;
  businessType: string;
  tradeLicense: string;
  licenseExpiry: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  website: string;
  division: string;
  district: string;
  upazila: string;
  fullAddress: string;
  googleMapsLink: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  routingNumber: string;
  bkashNumber: string;
  nagadNumber: string;
}

export default function ShopProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("shop");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profile, setProfile] = useState<ShopProfile>({
    shopName: user?.shopName || "Ak Medihome",
    shopDescription: "Your trusted pharmacy for quality medicines and healthcare products. We provide authentic medicines at affordable prices with fast delivery.",
    businessType: "Pharmacy",
    tradeLicense: "TR-2024-123456",
    licenseExpiry: "2025-12-31",
    contactNumber: "+880 1712 345678",
    whatsappNumber: "+880 1712 345678",
    email: user?.email || "info@akmedihome.com",
    website: "www.akmedihome.com",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Gulshan",
    fullAddress: "House #123, Road #45, Gulshan-2, Dhaka-1212, Bangladesh",
    googleMapsLink: "https://maps.google.com/...",
    bankName: "Dutch-Bangla Bank Limited",
    accountName: "Ak Medihome",
    accountNumber: "123-456-7890",
    branch: "Gulshan Circle-2",
    routingNumber: "090261234",
    bkashNumber: "01712345678",
    nagadNumber: "01712345678",
  });

  const tabs = [
    { id: "shop", label: "Shop Info", icon: Store },
    { id: "contact", label: "Contact & Address", icon: MapPin },
    { id: "bank", label: "Bank Details", icon: CreditCard },
    { id: "security", label: "Security", icon: Lock },
  ];

  const handleSave = async () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Shop Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your shop information and settings</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="h-10 px-5 rounded-xl bg-[#fb6c08] text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#e05d00] transition-colors"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        
        {/* LEFT COLUMN - Shop Card */}
        <div className="space-y-6">
          {/* Shop Identity Card */}
          <div className="bg-white border-[1.5px] border-gray-200 rounded-2xl overflow-hidden sticky top-24">
            {/* Cover Banner */}
            <div className="bg-gradient-to-r from-[#063c28] to-[#3b9c3c] h-24 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-[#fcf0e4] flex items-center justify-center overflow-hidden">
                    {profile.shopName ? (
                      <span className="text-3xl font-bold text-[#063c28]">
                        {profile.shopName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <Store className="w-10 h-10 text-[#063c28]" />
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Shop Info */}
            <div className="pt-16 pb-6 px-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{profile.shopName}</h2>
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                Member since Jan 2024
              </p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[10px] font-semibold text-green-600">Verified Seller</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Stats */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Medicines</span>
                <span className="text-sm font-bold text-gray-900">248</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Orders</span>
                <span className="text-sm font-bold text-gray-900">1,284</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Rating</span>
                <span className="text-sm font-bold text-yellow-500">⭐ 4.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Response Time</span>
                <span className="text-sm font-bold text-green-600">&lt; 1 hour</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Quick Links */}
            <div className="px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-3">Quick Actions</p>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                  Download Invoice History
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Globe className="w-4 h-4" />
                  View My Store Page
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <AlertCircle className="w-4 h-4" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Edit Form */}
        <div className="bg-white border-[1.5px] border-gray-200 rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-all ${
                    isActive
                      ? "border-[#063c28] text-[#063c28]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Tab 1: Shop Info */}
            {activeTab === "shop" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    value={profile.shopName}
                    onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Shop Description
                  </label>
                  <textarea
                    rows={4}
                    value={profile.shopDescription}
                    onChange={(e) => setProfile({ ...profile, shopDescription: e.target.value })}
                    disabled={!isEditing}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Business Type
                    </label>
                    <select
                      value={profile.businessType}
                      onChange={(e) => setProfile({ ...profile, businessType: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    >
                      <option>Pharmacy</option>
                      <option>Distributor</option>
                      <option>Manufacturer</option>
                      <option>Wholesaler</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Trade License No.
                    </label>
                    <input
                      type="text"
                      value={profile.tradeLicense}
                      onChange={(e) => setProfile({ ...profile, tradeLicense: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    License Expiry Date
                  </label>
                  <input
                    type="date"
                    value={profile.licenseExpiry}
                    onChange={(e) => setProfile({ ...profile, licenseExpiry: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Contact & Address */}
            {activeTab === "contact" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.contactNumber}
                        onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.whatsappNumber}
                        onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value })}
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Division *
                    </label>
                    <select
                      value={profile.division}
                      onChange={(e) => setProfile({ ...profile, division: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    >
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Rajshahi</option>
                      <option>Khulna</option>
                      <option>Barishal</option>
                      <option>Sylhet</option>
                      <option>Rangpur</option>
                      <option>Mymensingh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      District *
                    </label>
                    <input
                      type="text"
                      value={profile.district}
                      onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Upazila / Thana
                    </label>
                    <input
                      type="text"
                      value={profile.upazila}
                      onChange={(e) => setProfile({ ...profile, upazila: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Full Business Address *
                  </label>
                  <textarea
                    rows={3}
                    value={profile.fullAddress}
                    onChange={(e) => setProfile({ ...profile, fullAddress: e.target.value })}
                    disabled={!isEditing}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Google Maps Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={profile.googleMapsLink}
                    onChange={(e) => setProfile({ ...profile, googleMapsLink: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Bank Details */}
            {activeTab === "bank" && (
              <div className="space-y-5">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2">
                  <p className="text-xs text-amber-700">
                    💳 Bank details are used for payment settlement. Please ensure accuracy.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={profile.bankName}
                      onChange={(e) => setProfile({ ...profile, bankName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                      placeholder="e.g., Dutch-Bangla Bank Limited"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={profile.accountName}
                      onChange={(e) => setProfile({ ...profile, accountName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={profile.accountNumber}
                      onChange={(e) => setProfile({ ...profile, accountNumber: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-[#063c28] focus:ring-2 focus:ring-[#063c28]/10 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={profile.branch}
                      onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    value={profile.routingNumber}
                    onChange={(e) => setProfile({ ...profile, routingNumber: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50"
                  />
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      bKash Number
                    </label>
                    <input
                      type="tel"
                      value={profile.bkashNumber}
                      onChange={(e) => setProfile({ ...profile, bkashNumber: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                      Nagad Number
                    </label>
                    <input
                      type="tel"
                      value={profile.nagadNumber}
                      onChange={(e) => setProfile({ ...profile, nagadNumber: e.target.value })}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Security */}
            {activeTab === "security" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      disabled={!isEditing}
                      className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50 pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    disabled={!isEditing}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    disabled={!isEditing}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 disabled:bg-gray-50"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between mt-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                    <p className="text-[11px] text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    disabled={!isEditing}
                    className="relative w-11 h-6 rounded-full bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all" />
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsEditing(false)}
                  className="h-10 px-6 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="h-10 px-8 rounded-xl bg-shop_btn_dark_green text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#052e21] transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}