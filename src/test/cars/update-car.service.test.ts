import AppError from "../../exceptions/generic.exception";
import { RegisterCarService } from "../../services/cars/register-car.service";
import { UpdateCarService } from "../../services/cars/update-car.service";
import { v4 as uuiv4 } from 'uuid'

describe("update car service", () => {
  it("should be able to update a car", async () => {
    const car = {
      license_plate: "ABC2I31",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);
    
    const result = await UpdateCarService.execute({
      id: newCar.id,
      license_plate: "ABC2I37",
      color: "Azul",
      brand: "Chevrolet",
    })

    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(newCar.id)
    expect(result.color).not.toEqual(newCar.color)
    expect(result.license_plate).not.toEqual(newCar.license_plate)
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to update a car if car not found", async () => {
    await expect(UpdateCarService.execute({
      id: uuiv4(),
      license_plate: "ABC2I37",
      color: "Prata",
      brand: "Chevrolet",
    })).rejects.toEqual(
      new AppError("CAR_NOT_FOUND", 404)
    );
  });
});
