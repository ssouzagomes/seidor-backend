import fs from "fs";
import path from 'path'
import { Car, CarTypes } from "../../types/car.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";

export namespace GetCarByIdService {
  export const execute = async (model: CarTypes.GetByIdParams) => {
    const { id } = await idValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const cars = data.cars as Car[] || []

    const car = cars.find((car) => car.id === id)

    if (!car) {
      throw new AppError('CAR_NOT_FOUND', 404)
    }

    return car
  };
}
