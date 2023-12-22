import fs from "fs";
import path from "path";
import { CarUsage, CarUsageTypes } from "../../types/car-usage.types";
import AppError from "../../exceptions/generic.exception";
import { idValidation } from "../../validations/generic.validation";

export namespace EndCarUsageService {
  export const execute = async (model: CarUsageTypes.EndParams) => {
    const { id } = await idValidation.parseAsync(model);

    const filePath = path.resolve("./src/database", "data.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const carUsage = (data.carUsage as CarUsage[]) || [];

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
      ...data,
      carUsage
    }

    const jsonData = JSON.stringify(newData, null, 2); 

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
    });


    return carUsage[carUsageIndex];
  };
}
