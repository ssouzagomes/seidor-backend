import { RegisterCarService } from "../../services/cars/register-car.service";
import { GetAllCarsService } from "../../services/cars/get-all-cars.service";

describe("get all cars service", () => {
  it("should be able to get all cars", async () => {
    const car = {
      license_plate: "ABC2I31",
      color: "Prata",
      brand: "Chevrolet",
    };

    await RegisterCarService.execute(car);

    const result = await GetAllCarsService.execute({
      color: undefined,
      brand: undefined,
    });

    expect(result).toHaveLength(1);
    expect(result).not.toEqual([]);
  });

  it("should be able to get all cars with filters", async () => {
    const car1 = {
      license_plate: "ABC2I33",
      color: "Prata",
      brand: "Chevrolet",
    };

    const car2 = {
      license_plate: "ABC2I32",
      color: "Preto",
      brand: "Fiat",
    };

    await RegisterCarService.execute(car1);
    await RegisterCarService.execute(car2);

    const result = await GetAllCarsService.execute({
      color: "preto",
      brand: "fiat",
    });

    expect(result).toHaveLength(1);
    expect(result).not.toEqual([]);
  });

  it("should not be able to get all cars with no match filters", async () => {
    const car1 = {
      license_plate: "ABC2I35",
      color: "Prata",
      brand: "Chevrolet",
    };

    const car2 = {
      license_plate: "ABC2I37",
      color: "Preto",
      brand: "Fiat",
    };

    await RegisterCarService.execute(car1);
    await RegisterCarService.execute(car2);

    const result = await GetAllCarsService.execute({
      color: "preto",
      brand: "Chevrolet",
    });

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
