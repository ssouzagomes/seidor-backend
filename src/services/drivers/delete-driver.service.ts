import fs from "fs";
import path from "path";
import { Driver, DriverTypes } from "../../types/driver.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";
import { CarUsage } from "../../types/car-usage.types";

export namespace DeleteDriverService {
  export const execute = async (model: DriverTypes.DeleteParams) => {
    const { id } = await idValidation.parseAsync(model);

    const filePath = path.resolve("./src/database", "data.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const drivers = (data.drivers as Driver[]) || [];

    const index = drivers.findIndex((driver) => driver.id === id);

    if (index === -1) {
      throw new AppError("DRIVER_NOT_FOUND", 404);
    }

    const carUsage = (data.carUsage as CarUsage[]) || [];

    const driverIsUsingACar = carUsage.find(
      (usage) => usage.driver_id === id && !usage.end_date
    );

    if (driverIsUsingACar) {
      throw new AppError("DRIVER_IS_USING_A_CAR", 400);
    }

    drivers.splice(index, 1);

    const newData = {
      ...data,
      drivers,
    };

    const jsonData = JSON.stringify(newData, null, 2);

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return { message: "DRIVER_DELETED" };
  };
}
