/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser } from "@/hooks/useUser";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Camera, Trash2, LogOut, Settings,
  Package, Heart, ShoppingBag,
  LayoutDashboard, User, ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { removeProfilePhotoService, updateMyProfileService } from "@/services/user.services";
import { cn } from "@/lib/utils";

const getInitials = (name?: string, email?: string) => {
  if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "U";
};

const getRoleItems = (role?: string) => {
  if (role === "CUSTOMER") return [
    { label: "My Orders", href: "/orders",   icon: Package },
    { label: "Wishlist",  href: "/wishlist", icon: Heart },
    { label: "Cart",      href: "/cart",     icon: ShoppingBag },
  ];
  if (role === "SELLER") return [
    { label: "Dashboard",   href: "/seller/dashboard", icon: LayoutDashboard },
    { label: "My Medicines",href: "/seller/medicines", icon: Package },
    { label: "Orders",      href: "/seller/orders",    icon: ShoppingBag },
  ];
  if (role === "ADMIN" || role === "SUPER_ADMIN") return [
    { label: "Dashboard",  href: "/admin/dashboard",  icon: LayoutDashboard },
    { label: "Users",      href: "/admin/users",      icon: User },
    { label: "Categories", href: "/admin/categories", icon: Package },
  ];
  return [];
};

const roleBadgeStyle = (role?: string) => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "bg-blue-50 text-blue-700";
  if (role === "SELLER")   return "bg-shop_light_pink text-shop_orange";
  return "bg-shop_light_pink text-shop_dark_green";
};

export default function UserAvatar() {
  const { user, setUser, logout } = useUser();
  const [open,      setOpen]      = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const initials   = getInitials(user?.name, user?.email);
  const roleItems  = getRoleItems(user?.role);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be less than 5MB"); return; }

    setUploading(true); setOpen(false);
    const id = toast.loading("Uploading photo...");
    const fd = new FormData();
    fd.append("profilePhoto", file);
    const res = await updateMyProfileService(fd);
    if (res.success) {
      toast.success("Photo updated!", { id });
      setUser({ ...user!, image: res.data?.image });
      router.refresh();
    } else {
      toast.error(res.message ?? "Upload failed", { id });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemovePhoto = async () => {
    setOpen(false);
    const id = toast.loading("Removing photo...");
    const res = await removeProfilePhotoService();
    if (res.success) {
      toast.success("Photo removed!", { id });
      setUser({ ...user!, image: undefined });
      router.refresh();
    } else toast.error(res.message ?? "Failed", { id });
  };

  const handleLogout = async () => {
    setOpen(false);
    const id = toast.loading("Logging out...");
    await logout();
    toast.success("Logged out!", { id });
  };

  return (
    <div ref={dropdownRef} className="relative">
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleFileChange} />

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
        className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10 transition-all duration-200 focus:outline-none"
      >
        {/* Avatar circle */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-shop_light_pink flex items-center justify-center ring-2 ring-white/30 shrink-0">
          {uploading ? (
            <div className="w-4 h-4 border-2 border-shop_light_green/40 border-t-shop_light_green rounded-full animate-spin" />
          ) : user?.image ? (
            <img src={user.image} alt={user.name ?? "User"} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-shop_dark_green" style={{ fontFamily: "var(--font-poppins)" }}>
              {initials}
            </span>
          )}
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-shop_light_green border-2 border-shop_dark_green" />
        </div>

        {/* Name + chevron — desktop only */}
        <div className="hidden lg:flex items-center gap-1">
          <span className="text-sm font-semibold text-white max-w-22.5 truncate" style={{ fontFamily: "var(--font-poppins)" }}>
            {user?.name?.split(" ")[0] ?? "Account"}
          </span>
          <ChevronDown className={cn("w-3.5 h-3.5 text-white/60 transition-transform duration-200", open && "rotate-180")} />
        </div>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-72 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden animate-scale-in origin-top-right">

          {/* Header */}
          <div className="px-4 py-4 bg-linear-to-br from-shop_light_pink/60 to-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-shop_light_pink flex items-center justify-center ring-2 ring-white shadow-sm shrink-0">
                {user?.image
                  ? <img src={user.image} alt={user.name ?? "User"} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  : <span className="text-base font-bold text-shop_dark_green" style={{ fontFamily: "var(--font-poppins)" }}>{initials}</span>
                }
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-darkColor truncate" style={{ fontFamily: "var(--font-poppins)" }}>
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-lightColor truncate mt-0.5">{user?.email}</p>
                <span className={cn("inline-flex mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase", roleBadgeStyle(user?.role))}>
                  {user?.role?.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Role-specific links */}
          {roleItems.length > 0 && (
            <div className="py-1.5 border-b border-gray-100">
              {roleItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-lightColor hover:bg-shop_light_pink/50 hover:text-shop_dark_green transition-colors"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  <item.icon className="w-4 h-4 shrink-0 text-shop_light_green" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Profile settings */}
          <div className="py-1.5 border-b border-gray-100">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-lightColor hover:bg-shop_light_bg transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <Settings className="w-4 h-4 shrink-0 text-gray-400" />
              Profile Settings
            </Link>
          </div>

          {/* Photo options */}
          <div className="py-1.5 border-b border-gray-100">
            <button
              onClick={() => { fileInputRef.current?.click(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-lightColor hover:bg-shop_light_bg transition-colors text-left"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <Camera className="w-4 h-4 shrink-0 text-gray-400" />
              {user?.image ? "Change photo" : "Upload photo"}
            </button>
            {user?.image && (
              <button
                onClick={handleRemovePhoto}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <Trash2 className="w-4 h-4 shrink-0" />
                Remove photo
              </button>
            )}
          </div>

          {/* Logout */}
          <div className="py-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors text-left"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}