import fs from "fs";
import path from 'path'
import { CarTypes } from "../../types/car.types";
import { registerCarValidation } from "../../validations/car.validations";
import AppError from "../../exceptions/generic.exception";

export namespace RegisterUserService {
  export const execute = async (model: CarTypes.RegisterParams) => {
    const { license_plate, color, brand } =
      await registerCarValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const cars = data.cars as {
      license_plate: string, color: string, brand: string
    }[] || []

    const carExist = cars.find((car) => car.license_plate === license_plate)

    if (carExist) {
      throw new AppError('CAR_ALREADY_EXIST', 400)
    }

    const car = {
      license_plate,
      color,
      brand
    };

    cars.push(car)

    const newData = {
      ...data,
      cars
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return car
  };
}
