import fs from "fs";
import { Driver, DriverTypes } from "../../types/driver.types";
import { updateDriverValidation } from "../../validations/driver.validations";
import AppError from "../../exceptions/generic.exception";
import { database, databasePath } from "../../database";

export namespace UpdateDriverService {
  export const execute = async (model: DriverTypes.UpdateParams) => {
    const { id, name } =
      await updateDriverValidation.parseAsync(model);

    let drivers = database.drivers as Driver[] || []

    const index = drivers.findIndex((driver) => driver.id === id)

    if (index === -1) {
      throw new AppError('DRIVER_NOT_FOUND', 404)
    }
  
    drivers.splice(index, 1, {
      ...drivers[index],
      name
    })

    const newData = {
      ...database,
      drivers
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFileSync(databasePath, jsonData);

    return drivers[index]
  };
}
