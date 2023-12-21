import { z } from 'zod'
import { registerDriverValidation, updateDriverValidation } from '../validations/driver.validations'
import { idValidation } from '../validations/generic.validation';

export type Driver = {
  id: string;
  name: string
}

export namespace DriverTypes {
  export type RegisterParams = z.infer<typeof registerDriverValidation>
  export type UpdateParams = z.infer<typeof updateDriverValidation>
  export type DeleteParams = z.infer<typeof idValidation>
  export type GetByIdParams = z.infer<typeof idValidation>
	export type Filters = { name: string };
}