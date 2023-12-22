import { z } from "zod";

export const registerCarUsageValidation = z
  .object({
    driver_id: z.string().uuid(),
    car_id: z.string().uuid(),
    reason: z.string().min(3, 'REASON_MIN_LENGTH_3').max(200, 'REASON_MAX_LENGTH_200')
  })
