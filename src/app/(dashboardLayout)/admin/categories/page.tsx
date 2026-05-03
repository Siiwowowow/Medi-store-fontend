"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags, Trash2, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAllCategories({ includeInactive: true });
      setCategories(res);
    } catch (err) {
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await adminService.deleteCategory(id);
      if (res?.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error("Deletion failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-shop_dark_green">Categories Control</h1>
        <Button className="bg-shop_orange hover:bg-[#e05d00] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tags className="w-5 h-5 text-teal-500" />
            All Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground animate-pulse">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No categories found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-shop_dark_green">{c.name}</TableCell>
                    <TableCell>{c.isActive ? "Active" : "Inactive"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" className="text-blue-500 border-blue-200 hover:bg-blue-50" onClick={() => toast.info("Edit coming soon")}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>
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
    </div>
  );
}
