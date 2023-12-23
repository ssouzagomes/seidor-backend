import AppError from "../../exceptions/generic.exception";
import { EndCarUsageService } from "../../services/carUsage/end-car-usage.service";
import { RegisterCarUsageService } from "../../services/carUsage/register-car-usage.service";
import { RegisterCarService } from "../../services/cars/register-car.service";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { v4 as uuidv4 } from 'uuid'

describe("end car usage service", () => {
  it("should be able to end car usage", async () => {
    const newDriver = await RegisterDriverService.execute({
      name: "Samuel"
    });

    const newCar = await RegisterCarService.execute({
      license_plate: "ABC2I36",
      color: "Prata",
      brand: "Chevrolet",
    });

    const newRegistry = await RegisterCarUsageService.execute({
      car_id: newCar.id,
      driver_id: newDriver.id,
      reason: 'Aluguel para viagem'
    })

    const result = await EndCarUsageService.execute({
      id: newRegistry.id
    })

    expect(result).toHaveProperty("id");
    expect(result.end_date).toBeInstanceOf(Date)
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to end a car usage if not found", async () => {
    await expect(EndCarUsageService.execute({
      id: uuidv4()
    })).rejects.toEqual(
      new AppError("REGISTRY_NOT_FOUND_OR_ALREADY_DONE", 400)
    );
  });

  it("should not be able to end a car usage if already done", async () => {
    const newDriver = await RegisterDriverService.execute({
      name: "Samuel Souza"
    });

    const newCar = await RegisterCarService.execute({
      license_plate: "ABC2I37",
      color: "Prata",
      brand: "Chevrolet",
    });

    const newRegistry = await RegisterCarUsageService.execute({
      car_id: newCar.id,
      driver_id: newDriver.id,
      reason: 'Aluguel para viagem'
    })

    const result = await EndCarUsageService.execute({
      id: newRegistry.id
    })

    await expect(EndCarUsageService.execute({
      id: result.id
    })).rejects.toEqual(
      new AppError("REGISTRY_NOT_FOUND_OR_ALREADY_DONE", 400)
    );
  });
});
