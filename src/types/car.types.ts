import { z } from 'zod'
import { registerCarValidation } from '../validations/car.validations'

export namespace CarTypes {
  export type RegisterParams = z.infer<typeof registerCarValidation>
}