import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { CarUsage, CarUsageTypes } from "../../types/car-usage.types";
import { registerCarUsageValidation } from "../../validations/car-usage.validation";
import { Driver } from "../../types/driver.types";
import AppError from "../../exceptions/generic.exception";
import { Car } from "../../types/car.types";
import { database, databasePath } from "../../database";

export namespace RegisterCarUsageService {
  export const execute = async (model: CarUsageTypes.RegisterParams) => {
    const { driver_id, car_id, reason } =
      await registerCarUsageValidation.parseAsync(model);

    const drivers = (database.drivers as Driver[]) || []

    const driver = drivers.find((driver) => driver.id === driver_id)

    if (!driver) {
      throw new AppError('DRIVER_NOT_FOUND', 404)
    }

    const cars = (database.cars as Car[]) || []

    const car = cars.find((car) => car.id === car_id)

    if (!car) {
      throw new AppError('CAR_NOT_FOUND', 404)
    }

    const carUsage = (database.carUsage as CarUsage[]) || [];

    const driverAlreadyUsingCar = carUsage.find(
      (usage) => usage.driver_id === driver_id && !usage.end_date
    );

    if (driverAlreadyUsingCar) {
      throw new AppError('DRIVER_ALREADY_USING_CAR', 400)
    }

    const carAlreadyInUse = carUsage.find(
      (usage) => usage.car_id === car_id && !usage.end_date
    );

    if (carAlreadyInUse) {
      throw new AppError('CAR_ALREADY_IN_USE', 400)
    }

    const createdCarUsage: CarUsage = {
      id: uuidv4(),
      start_date: new Date(),
      end_date: null,
      driver_id,
      car_id,
      reason,
      driver,
      car
    };

    carUsage.push(createdCarUsage)

    const newData = {
      ...database,
      carUsage
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFileSync(databasePath, jsonData);

    return createdCarUsage;
  };
}
