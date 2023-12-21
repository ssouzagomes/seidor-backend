import fs from "fs";
import path from 'path'
import { Driver, DriverTypes } from "../../types/driver.types";
import { updateDriverValidation } from "../../validations/driver.validations";
import AppError from "../../exceptions/generic.exception";

export namespace UpdateDriverService {
  export const execute = async (model: DriverTypes.UpdateParams) => {
    const { id, name } =
      await updateDriverValidation.parseAsync(model);

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    let drivers = data.drivers as Driver[] || []

    const index = drivers.findIndex((driver) => driver.id === id)

    if (index === -1) {
      throw new AppError('DRIVER_NOT_FOUND', 404)
    }
  
    drivers.splice(index, 1, {
      ...drivers[index],
      name
    })

    const newData = {
      ...data,
      drivers
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });

    return drivers[index]
  };
}
