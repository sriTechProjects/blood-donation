import { z } from "zod";

export const createDonorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  bloodType: z.string().min(1, "Blood type is required"),
  contact: z.string().min(1, "Contact is required"),
});

export const updateDonorSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  bloodType: z.string().min(1, "Blood type is required").optional(),
  contact: z.string().min(1, "Contact is required").optional(),
});
