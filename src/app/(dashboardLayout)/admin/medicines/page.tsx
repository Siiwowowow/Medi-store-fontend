/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { medicineService } from "@/services/medicine.service";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Trash2, Edit, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminMedicinesPage() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const fetchMedicines = async () => {
    try {
      const res = await medicineService.getAllMedicines({});
      if (res?.success) setMedicines(res.data);
    } catch (err) {
      toast.error("Failed to fetch medicines");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;
    try {
      const res = await adminService.deleteMedicine(id);
      if (res?.success) {
        toast.success("Medicine deleted successfully");
        fetchMedicines();
      } else {
        toast.error("Deletion failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred during deletion");
    }
  };

  const handleView = (medicine: any) => {
    setSelectedMedicine(medicine);
    setIsViewModalOpen(true);
  };

  const handleEdit = (medicine: any) => {
    setSelectedMedicine(medicine);
    setEditForm({
      name: medicine.name,
      price: medicine.price.toString(),
      stock: medicine.stock.toString(),
      description: medicine.description || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedicine) return;

    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("price", editForm.price);
      formData.append("stock", editForm.stock);
      formData.append("description", editForm.description);

      const res = await medicineService.updateMedicine(selectedMedicine.id, formData);
      if (res?.success) {
        toast.success("Medicine updated successfully");
        setIsEditModalOpen(false);
        fetchMedicines();
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred during update");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-shop_dark_green">Medicine Control</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Pill className="w-5 h-5 text-purple-500" />
            All Medicines
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground animate-pulse">Loading...</div>
          ) : medicines.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No medicines found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-shop_dark_green">{m.name}</TableCell>
                    <TableCell>{formatCurrency(m.price)}</TableCell>
                    <TableCell>{m.stock}</TableCell>
                    <TableCell className="text-right space-x-2 flex justify-end">
                      <Button size="sm" variant="outline" className="text-shop_dark_green border-shop_dark_green/30 hover:bg-shop_light_green/20" onClick={() => handleView(m)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-500 border-blue-200 hover:bg-blue-50" onClick={() => handleEdit(m)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* VIEW MODAL */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Medicine Details</DialogTitle>
          </DialogHeader>
          {selectedMedicine && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                {selectedMedicine.image ? (
                  <img src={selectedMedicine.image} alt={selectedMedicine.name} className="w-32 h-32 object-cover rounded-md border" />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-md border">
                    <Pill className="w-10 h-10 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-sm">Name:</span>
                <span className="col-span-3">{selectedMedicine.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-sm">Generic:</span>
                <span className="col-span-3">{selectedMedicine.genericName || "N/A"}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-sm">Manufacturer:</span>
                <span className="col-span-3">{selectedMedicine.manufacturer || "N/A"}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-sm">Category:</span>
                <span className="col-span-3">{selectedMedicine.category?.name || "N/A"}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-sm">Price:</span>
                <span className="col-span-3">{formatCurrency(selectedMedicine.price)}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-sm">Stock:</span>
                <span className="col-span-3">{selectedMedicine.stock}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-bold text-right text-sm mt-1">Description:</span>
                <span className="col-span-3 text-sm text-gray-600">{selectedMedicine.description || "N/A"}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewModalOpen(false)} className="bg-shop_dark_green text-white hover:bg-[#002010]">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isUpdating} className="bg-shop_orange hover:bg-[#e05d00] text-white">
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
