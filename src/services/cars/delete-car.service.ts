import fs from "fs";
import path from 'path'
import { Car, CarTypes } from "../../types/car.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";
import { CarUsage } from "../../types/car-usage.types";

export namespace DeleteCarService {
  export const execute = async (model: CarTypes.DeleteParams) => {
    const { id } = await idValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const cars = data.cars as Car[] || []

    const index = cars.findIndex((car) => car.id === id)

    if (index === -1) {
      throw new AppError('CAR_NOT_FOUND', 404)
    }

    const carUsage = (data.carUsage as CarUsage[]) || [];

    const carIsInUse = carUsage.find(
      (usage) => usage.car_id === id && !usage.end_date
    );

    if (carIsInUse) {
      throw new AppError("CAR_IN_USE", 400);
    }

    cars.splice(index, 1)

    const newData = {
      ...data,
      cars
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return { message: 'CAR_DELETED' }
  };
}
