// src/app/(dashboardLayout)/customer/profile/page.tsx

"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  CreditCard, 
  Calendar,
  Edit2,
  Save,
  X,
  Loader2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { updateMyProfileService } from "@/services/user.services";

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Local state for form
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+880 1234 567 890", // Placeholder if not in user object
    address: "Dhaka, Bangladesh", // Placeholder
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      // Backend might need specific fields
      
      const res = await updateMyProfileService(data);
      if (res.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      {/* Profile Header Card */}
      <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-[#063c28] to-[#0a5a3c] text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <User className="w-64 h-64 -mr-20 -mt-20" />
        </div>
        
        <CardContent className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative group">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 ring-4 ring-white/20 ring-offset-4 ring-offset-[#063c28] shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-white text-[#063c28] text-4xl font-black">
                  {user?.name?.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 p-2.5 bg-[#fb6c08] rounded-xl text-white shadow-lg hover:scale-110 transition-all">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">{user?.name}</h1>
                  <Badge className="bg-[#fb6c08] text-white border-none text-[10px] uppercase font-black px-2 py-0.5">
                    Gold Member
                  </Badge>
                </div>
                <p className="text-white/60 text-sm font-medium flex items-center justify-center md:justify-start gap-2 italic">
                  <ShieldCheck className="w-4 h-4 text-[#fb6c08]" /> Verified Patient Profile
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/40">Patient ID</span>
                  <span className="font-mono text-sm font-bold">#PH-{user?.id?.substring(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/40">Member Since</span>
                  <span className="text-sm font-bold">October 2023</span>
                </div>
              </div>
            </div>

            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-white text-[#063c28] hover:bg-gray-100 font-bold px-8 h-12 rounded-2xl shadow-xl transition-all"
              >
                <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-gray-100 shadow-sm rounded-[24px] overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-8 py-6">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-[#fb6c08]" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.form 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleUpdateProfile} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-gray-400">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#fb6c08] outline-none transition-all font-semibold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-gray-400">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          disabled
                          className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 outline-none font-semibold cursor-not-allowed" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-gray-400">Phone Number</label>
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#fb6c08] outline-none transition-all font-semibold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-gray-400">Location</label>
                        <input 
                          type="text" 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#fb6c08] outline-none transition-all font-semibold" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-[#063c28] hover:bg-[#0a5a3c] text-white px-8 h-12 rounded-xl font-bold flex-1 md:flex-none"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} 
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="px-8 h-12 rounded-xl font-bold border-gray-200 flex-1 md:flex-none"
                      >
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {[
                      { icon: User, label: "Full Name", value: user?.name },
                      { icon: Mail, label: "Email Address", value: user?.email },
                      { icon: Phone, label: "Phone Number", value: formData.phone },
                      { icon: MapPin, label: "Default Address", value: formData.address },
                    ].map((info, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
                          <info.icon className="w-5 h-5 text-[#063c28]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{info.label}</p>
                          <p className="font-bold text-[#151515] text-[15px]">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-gray-100 shadow-sm rounded-[24px]">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#151515]">Payment Methods</h4>
                  <p className="text-xs text-gray-500">Manage your cards and wallets</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-100 shadow-sm rounded-[24px]">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#151515]">Booking History</h4>
                  <p className="text-xs text-gray-500">View your lab test appointments</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Stats/Quick Actions */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl bg-[#fb6c08] text-white rounded-[32px] p-2">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-black tracking-tight leading-none mb-4">Quick Insights</h3>
              <div className="space-y-4">
                {[
                  { label: "Total Saved", value: "৳2,450", trend: "+12%" },
                  { label: "Vouchers Used", value: "8", trend: "Active" },
                  { label: "Points Earned", value: "1,240", trend: "Refining" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/20 pb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">{stat.label}</p>
                      <p className="text-2xl font-black leading-none">{stat.value}</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-none text-[10px] font-bold">
                      {stat.trend}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-white text-[#fb6c08] hover:bg-gray-100 font-black h-12 rounded-2xl">
                Redeem Rewards
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm rounded-[24px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-xl border-gray-100 h-11 font-semibold text-xs">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl border-gray-100 h-11 font-semibold text-xs">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
