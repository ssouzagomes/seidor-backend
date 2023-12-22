import { Car, CarTypes } from "../../types/car.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";
import { database } from "../../database";

export namespace GetCarByIdService {
  export const execute = async (model: CarTypes.GetByIdParams) => {
    const { id } = await idValidation.parseAsync(model);

    const cars = database.cars as Car[] || []

    const car = cars.find((car) => car.id === id)

    if (!car) {
      throw new AppError('CAR_NOT_FOUND', 404)
    }

    return car
  };
}
