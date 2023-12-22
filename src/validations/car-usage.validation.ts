import { z } from "zod";

export const registerCarUsageValidation = z
  .object({
    driver_id: z.string().uuid(),
    car_id: z.string().uuid(),
    reason: z.string()
  })
