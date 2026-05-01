// src/components/shared/Seller/MedicineActions.tsx

"use client";

import Link from "next/link";
import { Pencil, Eye, Trash2 } from "lucide-react";

interface MedicineActionsProps {
  medicineId: string;
  medicineName: string;
  onDelete: (id: string, name: string) => void;
  onDeactivate?: (id: string) => void;
}

export function MedicineActions({ medicineId, medicineName, onDelete }: MedicineActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* View Info */}
      <Link
        href={`/shop/${medicineId}`}
        className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center transition-colors text-blue-600"
        title="View Medicine Info"
      >
        <Eye className="w-4 h-4" />
      </Link>

      {/* Update/Edit */}
      <Link
        href={`/seller/medicines/edit/${medicineId}`}
        className="w-8 h-8 rounded-lg hover:bg-amber-50 flex items-center justify-center transition-colors text-amber-600"
        title="Edit Medicine"
      >
        <Pencil className="w-4 h-4" />
      </Link>

      {/* Delete */}
      <button
        onClick={() => onDelete(medicineId, medicineName)}
        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors text-red-600"
        title="Delete Medicine"
        type="button"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}