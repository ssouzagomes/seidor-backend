import { z } from 'zod'
import { registerUserValidation, updateUserValidation } from '../validations/user.validations'
import { idValidation } from '../validations/generic.validation';

export type User = {
  id: string;
  name: string
}

export namespace UserTypes {
  export type RegisterParams = z.infer<typeof registerUserValidation>
  export type UpdateParams = z.infer<typeof updateUserValidation>
  export type DeleteParams = z.infer<typeof idValidation>
  export type GetByIdParams = z.infer<typeof idValidation>
	export type Filters = { name: string };
}