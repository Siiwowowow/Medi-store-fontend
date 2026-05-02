/* eslint-disable react/no-unescaped-entities */
// src/app/(dashboardLayout)/seller/change-password/page.tsx

"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  
  const getStrengthText = () => {
    if (passwordStrength <= 2) return { text: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (passwordStrength <= 3) return { text: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    if (passwordStrength <= 4) return { text: "Good", color: "text-blue-500", bg: "bg-blue-500" };
    return { text: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const strength = getStrengthText();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { currentPassword: "", newPassword: "", confirmPassword: "" };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Change Password</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your password to keep your account secure
          </p>
        </div>

        {/* Password Form Card */}
        <div className="bg-white border-[1.5px] border-gray-200 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className={`w-full h-11 pl-10 pr-10 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.currentPassword
                      ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                      : "border-gray-200 focus:border-[#063c28] focus:ring-[#063c28]/10"
                  }`}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>

            {/* New Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className={`w-full h-11 pl-10 pr-10 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.newPassword
                      ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                      : "border-gray-200 focus:border-[#063c28] focus:ring-[#063c28]/10"
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          level <= passwordStrength ? strength.bg : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-[10px] font-semibold ${strength.color}`}>
                    Password Strength: {strength.text}
                  </p>
                  <ul className="text-[10px] text-gray-500 space-y-0.5 mt-2">
                    <li className="flex items-center gap-1.5">
                      {formData.newPassword.length >= 8 ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-1.5">
                      {/[A-Z]/.test(formData.newPassword) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                      Uppercase letter
                    </li>
                    <li className="flex items-center gap-1.5">
                      {/[a-z]/.test(formData.newPassword) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                      Lowercase letter
                    </li>
                    <li className="flex items-center gap-1.5">
                      {/[0-9]/.test(formData.newPassword) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                      Number
                    </li>
                    <li className="flex items-center gap-1.5">
                      {/[$@#&!]/.test(formData.newPassword) ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full" />
                      )}
                      Special character ($@#&!)
                    </li>
                  </ul>
                </div>
              )}
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full h-11 pl-10 pr-10 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword
                      ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                      : "border-gray-200 focus:border-[#063c28] focus:ring-[#063c28]/10"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Passwords match
                </p>
              )}
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-700">
                🔒 Password tips:
              </p>
              <ul className="text-[11px] text-blue-600 mt-2 space-y-1 list-disc list-inside">
                <li>Use a mix of uppercase, lowercase, numbers, and symbols</li>
                <li>Avoid using personal information like your name or birthdate</li>
                <li>Don't reuse passwords from other accounts</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setErrors({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="h-10 px-6 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="h-10 px-8 rounded-xl bg-[#063d29] text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#052e21] transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-[11px] text-gray-400">
            Last password change: 45 days ago
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            For security reasons, avoid sharing your password with anyone
          </p>
        </div>
      </div>
    </div>
  );
}