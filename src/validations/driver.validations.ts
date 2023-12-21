import { z } from "zod";

export const registerDriverValidation = z
  .object({
    name: z.string()
  })

export const updateDriverValidation = z
  .object({
    id: z.string().uuid(),
    name: z.string()
  })