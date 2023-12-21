import fs from "fs";
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Driver, DriverTypes } from "../../types/driver.types";
import AppError from "../../exceptions/generic.exception";
import { registerDriverValidation } from "../../validations/driver.validations";

export namespace RegisterDriverService {
  export const execute = async (model: DriverTypes.RegisterParams) => {
    const { name } = await registerDriverValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const drivers = data.drivers as Driver[] || []

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
      ...data,
      drivers
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return driver
  };
}
