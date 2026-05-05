import { z } from "zod";

export const categoryZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  image: z.any().optional(),
});

export type ICategoryPayload = z.infer<typeof categoryZodSchema>;
