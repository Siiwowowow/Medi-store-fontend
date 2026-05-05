"use client";

import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Edit, Image as ImageIcon, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminService } from "@/services/admin.service";
import { categoryZodSchema } from "@/zod/category.validation";
import { Switch } from "@/components/ui/switch";
import { compressImageFile } from "@/lib/utils/compressImage";

interface EditCategoryModalProps {
  category: any;
  onSuccess?: () => void;
}

export default function EditCategoryModal({ category, onSuccess }: EditCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(category.image || null);
  const [isCompressing, setIsCompressing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await adminService.updateCategory(category.id, formData);
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success("Category updated successfully!");
        setOpen(false);
        if (onSuccess) onSuccess();
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        toast.error(res?.message || "Failed to update category");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err.message || "Something went wrong");
    },
  });

  const form = useForm({
    defaultValues: {
      name: category.name || "",
      description: category.description || "",
      isActive: category.isActive ?? true,
      image: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("isActive", String(value.isActive));
      
      if (value.image) {
        formData.append("image", value.image);
      } else if (imagePreview === null) {
        // If image was cleared, we send a flag to the backend
        formData.append("removeImage", "true");
      }

      mutate(formData);
    },
  });

  // Update preview if category changes or modal opens
  useEffect(() => {
    if (open) {
      setImagePreview(category.image || null);
    }
  }, [open, category.image]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCompressing(true);
      try {
        const compressed = await compressImageFile(file);
        field.setValue(compressed);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(compressed);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-blue-500 border-blue-200 hover:bg-blue-50">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update category details and status.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: categoryZodSchema.shape.name,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Category Name</Label>
                <Input
                  id={field.name}
                  placeholder="e.g. Antibiotics"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  placeholder="Enter category description..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="resize-none h-24"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="isActive">
            {(field) => (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="space-y-0.5">
                  <Label>Active Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Inactive categories won't show on the store.
                  </p>
                </div>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="image">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Category Image</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden bg-gray-50 border-gray-200">
                    {imagePreview ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            field.setValue(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, field)}
                      className="cursor-pointer"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Keep empty to retain current image.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-shop_dark_green hover:bg-[#0a4d3c] text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
