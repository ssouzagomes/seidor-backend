import { Car, CarTypes } from "../../types/car.types";
import { database } from "../../database";

export namespace GetAllCarsService {
  export const execute = async (filter: CarTypes.Filters) => {
    const { color, brand } = filter;

    const cars = database.cars as Car[] || []

    let filteredCars = cars

    if (color) 
      filteredCars = filteredCars.filter((car) => car.color.toLowerCase() === color.toLowerCase())

    if (brand) 
      filteredCars = filteredCars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase())

    return filteredCars
  };
}
