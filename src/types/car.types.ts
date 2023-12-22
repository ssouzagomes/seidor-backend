import { z } from 'zod'
import { registerCarValidation, updateCarValidation } from '../validations/car.validations'
import { idValidation } from '../validations/generic.validation';

export type Car = {
  id: string;
  license_plate: string;
  color: string;
  brand: string;
}

export namespace CarTypes {
  export type RegisterParams = z.infer<typeof registerCarValidation>
  export type UpdateParams = z.infer<typeof updateCarValidation>
  export type DeleteParams = z.infer<typeof idValidation>
  export type GetByIdParams = z.infer<typeof idValidation>
	export type Filters = { color?: string, brand?: string };
}