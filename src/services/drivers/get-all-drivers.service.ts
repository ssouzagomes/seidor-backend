import { Driver, DriverTypes } from "../../types/driver.types";
import { database } from "../../database";

export namespace GetAllDriversService {
  export const execute = async (filter: DriverTypes.Filters) => {
    const { name } = filter;

    const drivers = (database.drivers as Driver[]) || [];

    let filteredDrivers = drivers;

    if (name)
      filteredDrivers = filteredDrivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );

    return filteredDrivers;
  };
}
