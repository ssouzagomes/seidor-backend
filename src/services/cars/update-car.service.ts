import fs from "fs";
import { Car, CarTypes } from "../../types/car.types";
import { updateCarValidation } from "../../validations/car.validations";
import AppError from "../../exceptions/generic.exception";
import { database, databasePath } from "../../database";

export namespace UpdateCarService {
  export const execute = async (model: CarTypes.UpdateParams) => {
    const { id, license_plate, color, brand } =
      await updateCarValidation.parseAsync(model);
    
    let cars = database.cars as Car[] || []

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
      ...database,
      cars
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFileSync(databasePath, jsonData);

    return cars[index]
  };
}
