import fs from "fs";
import { v4 as uuidv4 } from 'uuid'
import { Driver, DriverTypes } from "../../types/driver.types";
import AppError from "../../exceptions/generic.exception";
import { registerDriverValidation } from "../../validations/driver.validations";
import { database, databasePath } from "../../database";

export namespace RegisterDriverService {
  export const execute = async (model: DriverTypes.RegisterParams) => {
    const { name } = await registerDriverValidation.parseAsync(model);

    const drivers = database.drivers as Driver[] || []

    const driverExist = drivers.find((driver) => driver.name.toLowerCase() === name.toLowerCase())

    if (driverExist) {
      throw new AppError('DRIVER_ALREADY_EXIST', 400)
    }

    const driver = {
      id: uuidv4(),
      name
    };

    drivers.push(driver)

    const newData = {
      ...database,
      drivers
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFileSync(databasePath, jsonData);

    return driver
  };
}
