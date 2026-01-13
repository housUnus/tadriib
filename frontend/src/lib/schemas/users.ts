import { z } from "zod";

/* -------------------------
   Profile schema
-------------------------- */
export const profileSchema = z.object({
   avatar: z.any().optional(),
   details: z.string().optional(),
   // roles: z.array(z.string()).optional(),
   // active_role: z.string().nullable().optional(),
   is_verified_teacher: z.boolean().optional(),
   expertise: z.string().optional(),
   experience_years: z.string().nullable().optional(),
});

/* -------------------------
   User schema
-------------------------- */
export const userSchema = z.object({
   id: z.number(),
   email: z.email(),
   first_name: z.string().optional(),
   last_name: z.string().optional(),
   phone_number: z.string().optional(),
   country: z.string().optional(),
   avatar: z.any().optional(),
   details: z.string().optional(),
   // roles: z.array(z.string()).optional(),
   // active_role: z.string().nullable().optional(),
   is_verified_teacher: z.boolean().optional(),
   expertise: z.any().optional(),
   experience_years: z.number().nullable().optional(),
});

/* -------------------------
   Types
-------------------------- */
export type UserInput = z.infer<typeof userSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
