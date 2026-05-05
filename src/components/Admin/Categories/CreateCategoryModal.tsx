/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
import AppField from "../../shared/form/AppField";
import { compressImageFile } from "@/lib/utils/compressImage";

interface CreateCategoryModalProps {
  onSuccess?: () => void;
}

export default function CreateCategoryModal({ onSuccess }: CreateCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await adminService.createCategory(formData);
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success("Category created successfully!");
        setOpen(false);
        form.reset();
        setImagePreview(null);
        if (onSuccess) onSuccess();
        // Also invalidate queries if using react-query for the list
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        toast.error(res?.message || "Failed to create category");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err.message || "Something went wrong");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      image: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("isActive", String(value.isActive));
      if (value.image) {
        formData.append("image", value.image);
      }

      mutate(formData);
    },
  });

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
        <Button className="bg-shop_orange hover:bg-[#e05d00] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new medicine category to the store.
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
                <Label htmlFor={field.name}>Description (Optional)</Label>
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
                    Categories will be visible on the store immediately.
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
                      Recommended: Square image, max 2MB.
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
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
