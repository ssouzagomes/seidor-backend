import { GetAllCarUsageService } from "../../services/carUsage/get-all-car-usage.service";
import { RegisterCarUsageService } from "../../services/carUsage/register-car-usage.service";
import { RegisterCarService } from "../../services/cars/register-car.service";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";

describe("get all car usage service", () => {
  it("should be able to get all car usage", async () => {
    const newDriver = await RegisterDriverService.execute({
      name: "Samuel"
    });

    const newCar = await RegisterCarService.execute({
      license_plate: "ABC2I36",
      color: "Prata",
      brand: "Chevrolet",
    });

    await RegisterCarUsageService.execute({
      car_id: newCar.id,
      driver_id: newDriver.id,
      reason: 'Aluguel para viagem'
    })

    const result = await GetAllCarUsageService.execute()

    expect(result).toHaveLength(1);
    expect(result).not.toEqual([]);
    expect(result).not.toBeUndefined();
    expect(typeof result[0].car === 'object').toBe(true);
    expect(typeof result[0].driver === 'object').toBe(true);
  });
});
