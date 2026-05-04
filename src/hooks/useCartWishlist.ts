/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  addToCart, 
  addToWishlist, 
  getCustomerCart, 
  getCustomerWishlist, 
  removeFromWishlist,
  removeFromCart,
  updateCartItem
} from "@/services/customer.service";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCartWishlist = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  // --- CART MUTATIONS ---
  
  const cartMutation = useMutation({
    mutationFn: ({ medicineId, quantity }: { medicineId: string; quantity: number, medicineMetadata?: any }) =>
      addToCart(medicineId, quantity),
    onMutate: async ({ medicineId, quantity, medicineMetadata }: any) => {
      await queryClient.cancelQueries({ queryKey: ["customer-cart"] });
      const previousCart = queryClient.getQueryData(["customer-cart"]);

      queryClient.setQueryData(["customer-cart"], (old: any) => {
        if (!old) return old;
        const items = [...(old.items || [])];
        const existingItemIndex = items.findIndex((item: any) => item.medicineId === medicineId);
        
        let newItems;
        if (existingItemIndex > -1) {
          const item = items[existingItemIndex];
          const newQty = quantity;
          const newSubtotal = (item.price || 0) * newQty;
          items[existingItemIndex] = { ...item, quantity: newQty, subtotal: newSubtotal };
          newItems = items;
        } else {
          items.push({ 
            medicineId, 
            quantity, 
            id: "temp-" + medicineId, // Use medicineId for stability
            subtotal: (medicineMetadata?.price || 0) * quantity, 
            price: medicineMetadata?.price || 0,
            name: medicineMetadata?.name || "Medicine",
            image: medicineMetadata?.image || "",
            category: medicineMetadata?.category?.name || "Medicine"
          });
          newItems = items;
        }

        const newTotalAmount = newItems.reduce((acc: number, item: any) => acc + (item.subtotal || 0), 0);
        return { ...old, items: newItems, totalAmount: newTotalAmount };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["customer-cart"], context.previousCart);
      }
      toast.error("Failed to update cart");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItem(itemId, quantity),
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["customer-cart"] });
      const previousCart = queryClient.getQueryData(["customer-cart"]);

      queryClient.setQueryData(["customer-cart"], (old: any) => {
        if (!old) return old;
        const newItems = old.items?.map((item: any) => {
          if (item.id === itemId) {
            const newSubtotal = (item.price || 0) * quantity;
            return { ...item, quantity, subtotal: newSubtotal };
          }
          return item;
        });
        
        const newTotalAmount = newItems.reduce((acc: number, item: any) => acc + (item.subtotal || 0), 0);
        
        return {
          ...old,
          items: newItems,
          totalAmount: newTotalAmount
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["customer-cart"], context.previousCart);
      }
      // Silently handle 404 for temp items, or show toast
      if ((err as any)?.response?.status === 404) {
        console.warn("Item not found on server, likely a sync issue.");
      } else {
        toast.error("Failed to update quantity");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-cart"] });
    },
  });

  const removeCartMutation = useMutation({
    mutationFn: (itemId: string) => removeFromCart(itemId),
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ["customer-cart"] });
      const previousCart = queryClient.getQueryData(["customer-cart"]);

      queryClient.setQueryData(["customer-cart"], (old: any) => {
        if (!old) return old;
        const newItems = old.items?.filter((item: any) => item.id !== itemId);
        const newTotalAmount = newItems.reduce((acc: number, item: any) => acc + (item.subtotal || 0), 0);
        
        return {
          ...old,
          items: newItems,
          totalAmount: newTotalAmount
        };
      });

      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["customer-cart"], context.previousCart);
      }
      toast.error("Failed to remove item from cart");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-cart"] });
    },
  });

  // --- WISHLIST MUTATIONS ---

  const wishlistMutation = useMutation({
    mutationFn: ({ medicineId }: { medicineId: string, medicineMetadata?: any }) => addToWishlist(medicineId),
    onMutate: async ({ medicineId, medicineMetadata }: any) => {
      await queryClient.cancelQueries({ queryKey: ["customer-wishlist"] });
      const previousWishlist = queryClient.getQueryData(["customer-wishlist"]);

      queryClient.setQueryData(["customer-wishlist"], (old: any) => {
        const newItem = { 
          medicineId, 
          id: "temp-" + medicineId,
          name: medicineMetadata?.name || "Medicine",
          image: medicineMetadata?.image || "",
          price: medicineMetadata?.price || 0,
          category: medicineMetadata?.category?.name || "Medicine"
        };
        if (!old) return [newItem];
        return [...old, newItem];
      });

      return { previousWishlist };
    },
    onError: (err, variables, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["customer-wishlist"], context.previousWishlist);
      }
      toast.error("Failed to add to wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-wishlist"] });
    },
  });

  const removeWishlistMutation = useMutation({
    mutationFn: (wishlistId: string) => removeFromWishlist(wishlistId),
    onMutate: async (wishlistId) => {
      await queryClient.cancelQueries({ queryKey: ["customer-wishlist"] });
      const previousWishlist = queryClient.getQueryData(["customer-wishlist"]);

      queryClient.setQueryData(["customer-wishlist"], (old: any) => {
        if (!old) return old;
        return old.filter((item: any) => item.id !== wishlistId);
      });

      return { previousWishlist };
    },
    onError: (err, variables, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["customer-wishlist"], context.previousWishlist);
      }
      toast.error("Failed to remove from wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-wishlist"] });
    },
  });

  // --- QUERIES ---

  const { data: cartData, isLoading: isCartLoading } = useQuery<any>({
    queryKey: ["customer-cart"],
    queryFn: () => getCustomerCart(),
    enabled: !!user && user.role === "CUSTOMER",
  });

  const { data: wishlistData, isLoading: isWishlistLoading } = useQuery<any>({
    queryKey: ["customer-wishlist"],
    queryFn: () => getCustomerWishlist(),
    enabled: !!user && user.role === "CUSTOMER",
  });

  // --- HELPERS ---

  const isInCart = (medicineId: string) => {
    return cartData?.items?.some((item: any) => item.medicineId === medicineId);
  };

  const isInWishlist = (medicineId: string) => {
    return wishlistData?.some((item: any) => item.medicineId === medicineId);
  };

  const handleAddToCart = (medicine: any, quantity: number = 1) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast.error("Only customers can add items to cart");
      return;
    }
    const medicineId = typeof medicine === "string" 
      ? medicine 
      : (medicine.medicineId || medicine.id);
    const medicineMetadata = typeof medicine === "object" ? medicine : null;
    
    cartMutation.mutate({ medicineId, quantity, medicineMetadata });
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeCartMutation.mutate(itemId);
      return;
    }
    // If it's a temp ID, we can't update it on the server yet.
    // Instead, use addToCart which is usually an upsert.
    if (itemId.startsWith("temp-")) {
      const medicineId = itemId.replace("temp-", "");
      cartMutation.mutate({ medicineId, quantity });
    } else {
      updateQuantityMutation.mutate({ itemId, quantity });
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    if (itemId.startsWith("temp-")) {
      // For temp items, we just update the local cache via invalidation or manual filter
      queryClient.setQueryData(["customer-cart"], (old: any) => {
        if (!old) return old;
        return { ...old, items: old.items?.filter((item: any) => item.id !== itemId) };
      });
    } else {
      removeCartMutation.mutate(itemId);
    }
  };

  const handleAddToWishlist = (medicine: any) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast.error("Only customers can use wishlist");
      return;
    }
    
    const medicineId = typeof medicine === "string" 
      ? medicine 
      : (medicine.medicineId || medicine.id);
    const medicineMetadata = typeof medicine === "object" ? medicine : null;

    const existingItem = wishlistData?.find((i: any) => i.medicineId === medicineId);
    if (existingItem) {
      handleRemoveFromWishlist(existingItem.id);
      return;
    }

    wishlistMutation.mutate({ medicineId, medicineMetadata });
  };

  const handleRemoveFromWishlist = (wishlistId: string) => {
    if (wishlistId.startsWith("temp-")) {
      queryClient.setQueryData(["customer-wishlist"], (old: any) => {
        if (!old) return old;
        return old.filter((item: any) => item.id !== wishlistId);
      });
    } else {
      removeWishlistMutation.mutate(wishlistId);
    }
  };

  const handleMoveToCart = (medicine: any, wishlistId: string) => {
    handleAddToCart(medicine, 1);
    handleRemoveFromWishlist(wishlistId);
  };

  return {
    cartData,
    wishlistData,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleMoveToCart,
    isInCart,
    isInWishlist,
    isCartLoading,
    isWishlistLoading,
    isAddingToCart: cartMutation.isPending,
    isAddingToWishlist: wishlistMutation.isPending,
    isRemovingFromWishlist: removeWishlistMutation.isPending,
    isRemovingFromCart: removeCartMutation.isPending,
    cartCount: cartData?.items?.length || 0,
    wishlistCount: wishlistData?.length || 0,
    totalAmount: cartData?.totalAmount || 0,
  };
};
