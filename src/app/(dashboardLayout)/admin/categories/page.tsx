/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { categoryService } from "@/services/category.service";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags, Trash2,  } from "lucide-react";
import { toast } from "sonner";
import CreateCategoryModal from "@/components/Admin/Categories/CreateCategoryModal";
import EditCategoryModal from "@/components/Admin/Categories/EditCategoryModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAllCategories({ includeInactive: true }),
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await adminService.deleteCategory(id);
      if (res?.success) {
        toast.success("Category deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
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
        <CreateCategoryModal onSuccess={() => queryClient.invalidateQueries({ queryKey: ["categories"] })} />
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
                {categories.map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-shop_dark_green">{c.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <EditCategoryModal category={c} onSuccess={() => queryClient.invalidateQueries({ queryKey: ["categories"] })} />
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

