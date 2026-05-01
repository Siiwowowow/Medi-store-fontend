// src/app/(dashboardLayout)/seller/medicines/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSellerMedicines, useDeleteMedicine } from "@/hooks/useSellerMedicines";
import { 
  Search, 
  PlusCircle, 
  Package
} from "lucide-react";
import { formatCurrency, getStockColor, getStockBarColor, getStockPercentage } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/Seller/StatusBadge";
import { DeleteConfirmModal } from "@/components/shared/Seller/DeleteConfirmModal";
import { MedicineActions } from "@/components/shared/Seller/MedicineActions";

interface IMedicine {
  id: string;
  name: string;
  genericName?: string;
  image?: string;
  price: number;
  stock: number;
  isActive: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function MedicinesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  
  const { data, isLoading } = useSellerMedicines({ search, status: statusFilter, stock: stockFilter });
  const deleteMedicine = useDeleteMedicine();

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteMedicine.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleDeactivate = (id: string) => {
    console.log("Deactivate medicine:", id);
  };

  if (isLoading) return <MedicinesSkeleton />;

  const medicines: IMedicine[] = data?.medicines && Array.isArray(data.medicines) ? data.medicines : [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[22px] font-bold text-gray-900">My Medicines</h1>
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold rounded-full px-3 py-1">
            {medicines.length} items
          </span>
        </div>
        <Link
          href="/seller/medicines/add"
          className="bg-shop_orange text-white h-10 px-5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#e05d00] transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Medicine
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-3 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-gray-50 rounded-lg px-3 h-9">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border border-gray-200 text-sm px-3 bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="h-9 rounded-lg border border-gray-200 text-sm px-3 bg-white"
        >
          <option value="all">All Stock</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock (&lt;10)</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="overflow-visible min-h-[300px]">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Medicine</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Category</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Price</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Stock</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Status</th>
                <th className="text-[11px] font-bold uppercase text-gray-500 tracking-wide py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {/* Medicine Info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-100">
                        {medicine.image ? (
                          <Image src={medicine.image} alt={medicine.name} width={44} height={44} className="rounded-lg object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{medicine.name}</p>
                        {medicine.genericName && (
                          <p className="text-[11px] italic text-gray-500">{medicine.genericName}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase">
                      {medicine.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  
                  {/* Price */}
                  <td className="text-sm font-semibold text-gray-900 py-3 px-4">
                    {formatCurrency(medicine.price)}
                  </td>
                  
                  {/* Stock */}
                  <td className="py-3 px-4">
                    <div>
                      <span className={`text-sm font-bold ${getStockColor(medicine.stock)}`}>
                        {medicine.stock}
                      </span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getStockBarColor(medicine.stock)}`}
                          style={{ width: `${getStockPercentage(medicine.stock)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="py-3 px-4">
                    <StatusBadge status={medicine.isActive ? "ACTIVE" : "INACTIVE"} />
                  </td>
                  
                  {/* Actions */}
                  <td className="py-3 px-4">
                    <MedicineActions
                      medicineId={medicine.id}
                      medicineName={medicine.name}
                      onDelete={(id, name) => setDeleteTarget({ id, name })}
                      onDeactivate={handleDeactivate}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>  {/* ✅ Closing table tag */}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name || ""}
        isLoading={deleteMedicine.isPending}
      />
    </div>
  );
}

function MedicinesSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded"></div>
      <div className="h-12 bg-white rounded-xl"></div>
      <div className="h-96 bg-white rounded-2xl"></div>
    </div>
  );
}