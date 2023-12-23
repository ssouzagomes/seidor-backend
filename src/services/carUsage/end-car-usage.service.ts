import fs from "fs";
import { CarUsage, CarUsageTypes } from "../../types/car-usage.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";
import { database, databasePath } from "../../database";

export namespace EndCarUsageService {
  export const execute = async (model: CarUsageTypes.EndParams) => {
    const { id } = await idValidation.parseAsync(model);

    const carUsage = (database.carUsage as CarUsage[]) || [];

    const carUsageIndex = carUsage.findIndex(
      (usage) => usage.id === id && !usage.end_date
    );

    if (carUsageIndex === -1) {
      throw new AppError('REGISTRY_NOT_FOUND_OR_ALREADY_DONE', 400)
    }

    carUsage.splice(carUsageIndex, 1, {
      ...carUsage[carUsageIndex],
      end_date: new Date()
    })

    const newData = {
      ...database,
      carUsage
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFileSync(databasePath, jsonData);

    return carUsage[carUsageIndex];
  };
}
