import fs from "fs";
import path from "path";
import { CarUsage } from "../../types/car-usage.types";

export namespace GetAllCarUsageService {
  export const execute = async () => {
    const filePath = path.resolve("./src/database", "data.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const carUsage = (data.carUsage as CarUsage[]) || [];

    return carUsage;
  };
}
