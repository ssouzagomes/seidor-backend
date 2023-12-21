import fs from "fs";
import path from "path";
import { Driver, DriverTypes } from "../../types/driver.types";

export namespace GetAllDriversService {
  export const execute = async (filter: DriverTypes.Filters) => {
    const { name } = filter;

    const filePath = path.resolve("./src/database", "data.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const drivers = (data.drivers as Driver[]) || [];

    let filteredDrivers = drivers;

    if (name)
      filteredDrivers = filteredDrivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );

    return filteredDrivers;
  };
}
