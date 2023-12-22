import { RegisterCarService } from "../../services/cars/register-car.service";
import AppError from "../../exceptions/generic.exception";

describe("register car service", () => {
  it("should be able to register a car", async () => {
    const car = {
      license_plate: "ABC2I36",
      color: "Prata",
      brand: "Chevrolet",
    };

    const result = await RegisterCarService.execute(car);

    expect(result).toHaveProperty("id");
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to register a car if license plate already exist", async () => {
    const car = {
      license_plate: "ABC2I37",
      color: "Prata",
      brand: "Chevrolet",
    };

    await RegisterCarService.execute(car);

    await expect(RegisterCarService.execute(car)).rejects.toEqual(
      new AppError("LICENSE_PLATE_ALREADY_EXIST", 400)
    );
  });
});
