import fs from "fs";
import path from 'path'
import { Car, CarTypes } from "../../types/car.types";

export namespace GetAllCarsService {
  export const execute = async (filter: CarTypes.Filters) => {
    const { color, brand } = filter;

    const filePath = path.resolve('./src/database', 'data.json');
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const cars = data.cars as Car[] || []

    let filteredCars = cars

    if (color) 
      filteredCars = filteredCars.filter((car) => car.color.toLowerCase() === color.toLowerCase())

    if (brand) 
      filteredCars = filteredCars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase())

    return filteredCars
  };
}
