import fs from "fs";
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Car, CarTypes } from "../../types/car.types";
import { registerCarValidation } from "../../validations/car.validations";
import AppError from "../../exceptions/generic.exception";

export namespace RegisterCarService {
  export const execute = async (model: CarTypes.RegisterParams) => {
    const { license_plate, color, brand } =
      await registerCarValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const cars = data.cars as Car[] || []

    const carExist = cars.find((car) => car.license_plate === license_plate)

    if (carExist) {
      throw new AppError('CAR_ALREADY_EXIST', 400)
    }

    const car = {
      id: uuidv4(),
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
