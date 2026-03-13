import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export const messageSchema = z.object({
  text: z.string().max(1000, "Message too long").optional(),
  image: z.any().optional(),  // multer file object, just allow it through
}).refine(data => data.text || data.image, {
  message: "Message must have text or an image",
});