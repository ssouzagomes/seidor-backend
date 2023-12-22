import { Driver, DriverTypes } from "../../types/driver.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";
import { database } from "../../database";

export namespace GetDriverByIdService {
  export const execute = async (model: DriverTypes.GetByIdParams) => {
    const { id } = await idValidation.parseAsync(model);

    const drivers = database.drivers as Driver[] || []

    const driver = drivers.find((driver) => driver.id === id)

    if (!driver) {
      throw new AppError('DRIVER_NOT_FOUND', 404)
    }

    return driver
  };
}
