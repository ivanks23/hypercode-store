import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3),

  phone: z
    .string()
    .min(8),

  street: z
    .string()
    .min(5),

  city: z
    .string()
    .min(2),

  state: z
    .string()
    .min(2),

  zipCode: z
    .string()
    .min(4),

  country: z
    .string()
    .min(2),
});

export type CheckoutInput =
  z.infer<typeof checkoutSchema>;
