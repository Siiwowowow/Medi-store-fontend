/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(dashboardLayout)/seller/medicines/edit/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";

import { UploadCloud, X, Loader2 } from "lucide-react";
import { compressImageFile } from "@/lib/utils/compressImage";
import { useQuery } from "@tanstack/react-query";
import { useUpdateMedicine } from "@/services/useSellerMedicines";
import { medicineService } from "@/services/medicine.service";

export default function EditMedicinePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  
  // Fetch medicine data
  const { data: medicine, isLoading: medicineLoading, isError } = useQuery({
    queryKey: ["medicine", id],
    queryFn: () => medicineService.getMedicineById(id),
    enabled: !!id,
  });
  
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    manufacturer: "",
    categoryId: "",
    price: "",
    stock: "",
    dosageForm: "",
    strength: "",
    description: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  
  const { mutate: updateMedicine, isPending } = useUpdateMedicine();

  // Populate form when medicine data is loaded
  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || "",
        genericName: (medicine as any).genericName || "",
        manufacturer: medicine.manufacturer || "",
        categoryId: (medicine as any).categoryId || "",
        price: medicine.price?.toString() || "",
        stock: medicine.stock?.toString() || "",
        dosageForm: (medicine as any).dosageForm || "",
        strength: (medicine as any).strength || "",
        description: medicine.description || "",
        isActive: (medicine as any).isActive !== false,
      });
      
      if ((medicine as any).image) {
        setImagePreview((medicine as any).image);
      }
    }
  }, [medicine]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImageFile(file);
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("genericName", formData.genericName || "");
    data.append("manufacturer", formData.manufacturer);
    data.append("categoryId", formData.categoryId);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("dosageForm", formData.dosageForm || "");
    data.append("strength", formData.strength || "");
    data.append("description", formData.description);
    data.append("isActive", String(formData.isActive));
    
    if (imageFile) {
      data.append("image", imageFile);
    }
    
    updateMedicine({ id, data }, {
      onSuccess: () => {
        router.push("/seller/medicines");
      },
    });
  };

  if (categoriesLoading || medicineLoading) {
    return (
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-shop_dark_green" />
            <span className="ml-2 text-gray-600">Loading medicine data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !medicine) {
    return (
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load medicine data</p>
            <button
              onClick={() => router.back()}
              className="h-10 px-5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h1 className="text-[22px] font-bold text-gray-900 mb-6">Edit Medicine</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload - Same as add page */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Image</label>
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-shop_dark_green/50 hover:bg-shop_light_pink/30 ${imagePreview ? "border-green-300 bg-green-50/30" : "border-gray-200 bg-gray-50"}`}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {isCompressing ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 className="w-8 h-8 animate-spin text-shop_dark_green" />
                  <p className="text-xs text-gray-500">Compressing image...</p>
                </div>
              ) : imagePreview ? (
                <div className="relative inline-block">
                  <Image src={imagePreview} alt="Preview" width={150} height={150} className="rounded-lg mx-auto" style={{ height: "auto" }} />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm font-medium text-gray-600 mt-3">Drag & drop or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — max 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Medicine Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10"
                placeholder="e.g., Paracetamol 500mg"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Generic Name</label>
              <input
                type="text"
                value={formData.genericName}
                onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10"
                placeholder="e.g., Acetaminophen"
              />
              <p className="text-[10px] text-gray-400 mt-1">Scientific/generic name of the medicine</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Manufacturer *</label>
              <input
                type="text"
                required
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10"
                placeholder="e.g., Square Pharmaceuticals Ltd."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white"
              >
                <option value="">Select Category</option>
                {categoryList.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price (৳) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10"
                placeholder="0"
              />
              <p className="text-[10px] text-gray-400 mt-1">units (tablets/capsules/bottles)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dosage Form</label>
              <select
                value={formData.dosageForm}
                onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white"
              >
                <option value="">Select</option>
                <option value="tablet">Tablet</option>
                <option value="capsule">Capsule</option>
                <option value="syrup">Syrup</option>
                <option value="cream">Cream</option>
                <option value="injection">Injection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Strength</label>
              <input
                type="text"
                value={formData.strength}
                onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10"
                placeholder="e.g., 500mg, 10mg/5ml"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-shop_dark_green focus:ring-2 focus:ring-shop_dark_green/10 resize-none"
                placeholder="Describe the medicine, usage, and benefits..."
              />
            </div>
          </div>

          {/* Active Toggle */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Make Active</p>
              <p className="text-[11px] text-gray-500">Visible to customers on the shop</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
              className={`relative w-11 h-6 rounded-full transition-colors ${formData.isActive ? "bg-green-500" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${formData.isActive ? "left-5" : "left-0.5"}`} />
            </button>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-11 px-6 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="h-11 px-8 rounded-xl bg-shop_btn_dark_green text-white font-semibold text-sm hover:bg-[#052e21] transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Medicine"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}