import AppError from "../../exceptions/generic.exception";
import { GetCarByIdService } from "../../services/cars/get-car-by-id.service";
import { RegisterCarService } from "../../services/cars/register-car.service";
import { v4 as uuiv4 } from 'uuid'

describe("get car by id service", () => {
  it("should be able to get a car by id", async () => {
    const car = {
      license_plate: "ABC2I31",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);
    
    const result = await GetCarByIdService.execute({
      id: newCar.id,
    })

    expect(result).toHaveProperty("id");
    expect(result.license_plate).toEqual(newCar.license_plate)
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to get a car if not found", async () => {
    await expect(GetCarByIdService.execute({
      id: uuiv4(),
    })).rejects.toEqual(
      new AppError("CAR_NOT_FOUND", 404)
    );
  });
});
