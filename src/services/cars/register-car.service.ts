import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Car, CarTypes } from "../../types/car.types";
import { registerCarValidation } from "../../validations/car.validations";
import AppError from "../../exceptions/generic.exception";
import { database, databasePath } from "../../database";

export namespace RegisterCarService {
  export const execute = async (model: CarTypes.RegisterParams) => {
    const { license_plate, color, brand } =
      await registerCarValidation.parseAsync(model);

    const cars = (database.cars as Car[]) || [];

    const carExist = cars.find((car) => car.license_plate === license_plate);

    if (carExist) {
      throw new AppError("LICENSE_PLATE_ALREADY_EXIST", 400);
    }

    const car = {
      id: uuidv4(),
      license_plate,
      color,
      brand,
    };

    cars.push(car);

    const newData = {
      ...database,
      cars,
    };

    const jsonData = JSON.stringify(newData, null, 2);

    fs.writeFileSync(databasePath, jsonData);

    return car;
  };
}
