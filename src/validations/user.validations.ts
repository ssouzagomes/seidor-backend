import { z } from "zod";

export const registerUserValidation = z
  .object({
    name: z.string()
  })

export const updateUserValidation = z
  .object({
    id: z.string().uuid(),
    name: z.string()
  })