import { CarUsage } from "../../types/car-usage.types";
import { database } from "../../database";

export namespace GetAllCarUsageService {
  export const execute = async () => {
    const carUsage = (database.carUsage as CarUsage[]) || [];

    return carUsage;
  };
}
