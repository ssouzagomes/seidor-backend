import fs from "fs";
import path from 'path'
import { Car, CarTypes } from "../../types/car.types";
import { updateCarValidation } from "../../validations/car.validations";
import AppError from "../../exceptions/generic.exception";

export namespace UpdateUserService {
  export const execute = async (model: CarTypes.UpdateParams) => {
    const { id, license_plate, color, brand } =
      await updateCarValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    let cars = data.cars as Car[] || []

    const index = cars.findIndex((car) => car.id === id)

    if (index === -1) {
      throw new AppError('CAR_NOT_FOUND', 404)
    }
  
    cars.splice(index, 1, {
      ...cars[index],
      license_plate,
      color,
      brand
    })

    const newData = {
      ...data,
      cars
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return cars[index]
  };
}
