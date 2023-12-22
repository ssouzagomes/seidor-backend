import AppError from "../../exceptions/generic.exception";
import { DeleteCarService } from "../../services/cars/delete-car.service";
import { GetCarByIdService } from "../../services/cars/get-car-by-id.service";
import { RegisterCarService } from "../../services/cars/register-car.service";
import { v4 as uuiv4 } from "uuid";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { RegisterCarUsageService } from "../../services/carUsage/register-car-usage.service";

describe("delete car service", () => {
  it("should be able delete a car", async () => {
    const car = {
      license_plate: "ABC2I31",
      color: "Prata",
      brand: "Chevrolet",
    };

    const newCar = await RegisterCarService.execute(car);

    const deleted = await DeleteCarService.execute({
      id: newCar.id,
    });

    expect(deleted).toEqual({ message: "CAR_DELETED" });
    await expect(
      GetCarByIdService.execute({
        id: uuiv4(),
      })
    ).rejects.toEqual(new AppError("CAR_NOT_FOUND", 404));
  });

  it("should not be able to delete a car if not found", async () => {
    await expect(
      DeleteCarService.execute({
        id: uuiv4(),
      })
    ).rejects.toEqual(new AppError("CAR_NOT_FOUND", 404));
  });

  it("should not be able to delete a car if is in use", async () => {
    const newCar = await RegisterCarService.execute({
      license_plate: "ABC2I31",
      color: "Prata",
      brand: "Chevrolet",
    });

    const newDriver = await RegisterDriverService.execute({
      name: "Samuel Souza"
    });

    await RegisterCarUsageService.execute({
      driver_id: newDriver.id,
      car_id: newCar.id,
      reason: 'Aluguel do carro para viagem'
    })

    await expect(
      DeleteCarService.execute({
        id: newCar.id,
      })
    ).rejects.toEqual(new AppError("CAR_IN_USE", 400));
  });
});
