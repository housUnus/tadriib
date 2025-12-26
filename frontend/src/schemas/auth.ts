import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(2, "First name is too short"),
  last_name: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  password1: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(2, "Country is required"),
  phone_number: z
    .string()
    .min(7, "Phone number is too short")
    .regex(/^\+?\d+$/, "Invalid phone number"),
});

export type RegisterInput = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;