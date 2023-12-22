import { z } from 'zod'
import { Car } from './car.types';
import { Driver } from './driver.types';
import { idValidation } from '../validations/generic.validation';
import { registerCarUsageValidation } from '../validations/car-usage.validation';

export type CarUsage = {
  id: string;
  start_date: Date | null,
  end_date: Date | null;
  driver_id: string;
  car_id: string;
  reason: string;
  driver: Driver;
  car: Car
}

export namespace CarUsageTypes {
  export type RegisterParams = z.infer<typeof registerCarUsageValidation>
  export type EndParams = z.infer<typeof idValidation>
  export type GetByIdParams = z.infer<typeof idValidation>
}