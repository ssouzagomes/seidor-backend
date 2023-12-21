import fs from "fs";
import path from 'path'
import { Driver, DriverTypes } from "../../types/driver.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";

export namespace GetDriverByIdService {
  export const execute = async (model: DriverTypes.GetByIdParams) => {
    const { id } = await idValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const drivers = data.drivers as Driver[] || []

    const driver = drivers.find((driver) => driver.id === id)

    if (!driver) {
      throw new AppError('DRIVER_NOT_FOUND', 404)
    }

    return driver
  };
}
