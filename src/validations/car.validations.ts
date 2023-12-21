import { z } from "zod";

export const registerCarValidation = z
  .object({
    license_plate: z.string().regex(/^[A-Z]{3}\d{1}[A-Z]\d{2}$/, 'INVALID_FORMAT'),
    color: z.string(),
    brand: z.string()
  })