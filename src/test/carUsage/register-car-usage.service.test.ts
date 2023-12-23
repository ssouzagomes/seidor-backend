import AppError from "../../exceptions/generic.exception";
import { RegisterCarUsageService } from "../../services/carUsage/register-car-usage.service";
import { RegisterCarService } from "../../services/cars/register-car.service";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { v4 as uuidv4 } from 'uuid'

describe("register car usage service", () => {
  it("should be able to register car usage", async () => {
    const driver = {
      name: "Samuel Souza"
    };

    const newDriver = await RegisterDriverService.execute(driver);

    const car = {
      license_plate: "ABC2I36",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);

    const result = await RegisterCarUsageService.execute({
      car_id: newCar.id,
      driver_id: newDriver.id,
      reason: 'Aluguel para viagem'
    })

    expect(result).toHaveProperty("id");
    expect(result.start_date).toBeInstanceOf(Date)
    expect(result.end_date).toEqual(null)
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to register a car usage if driver not found", async () => {
    const car = {
      license_plate: "ABC2I37",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);

    await expect(RegisterCarUsageService.execute({
      driver_id: uuidv4(),
      car_id: newCar.id,
      reason: 'Aluguel para viagem'
    })).rejects.toEqual(
      new AppError("DRIVER_NOT_FOUND", 404)
    );
  });

  it("should not be able to register a car usage if car not found", async () => {
    const driver = {
      name: "Samuel"
    };

    const newDriver = await RegisterDriverService.execute(driver);

    await expect(RegisterCarUsageService.execute({
      driver_id: newDriver.id,
      car_id: uuidv4(),
      reason: 'Aluguel para viagem'
    })).rejects.toEqual(
      new AppError("CAR_NOT_FOUND", 404)
    );
  });

  it("should not be able to register a car if driver already using car", async () => {
    const driver = {
      name: "Samuel Gomes"
    };

    const newDriver = await RegisterDriverService.execute(driver);

    const car = {
      license_plate: "ABC2I38",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);

    await RegisterCarUsageService.execute({
      car_id: newCar.id,
      driver_id: newDriver.id,
      reason: 'Aluguel para viagem'
    })

    await expect(RegisterCarUsageService.execute({
      driver_id: newDriver.id,
      car_id: newCar.id,
      reason: 'Aluguel para viagem'
    })).rejects.toEqual(
      new AppError("DRIVER_ALREADY_USING_CAR", 400)
    );
  });

  it("should not be able to register a car if driver already using car", async () => {
    const driver = {
      name: "Samuel Silva"
    };

    const newDriver = await RegisterDriverService.execute(driver);

    const newDriver2 = await RegisterDriverService.execute({
      name: "José Silva"
    });

    const car = {
      license_plate: "ABC2I39",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);

    await RegisterCarUsageService.execute({
      car_id: newCar.id,
      driver_id: newDriver.id,
      reason: 'Aluguel para viagem'
    })

    await expect(RegisterCarUsageService.execute({
      driver_id: newDriver2.id,
      car_id: newCar.id,
      reason: 'Aluguel para viagem'
    })).rejects.toEqual(
      new AppError("CAR_ALREADY_IN_USE", 400)
    );
  });
});
