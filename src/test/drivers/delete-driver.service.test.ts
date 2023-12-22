import AppError from "../../exceptions/generic.exception";
import { DeleteDriverService } from "../../services/drivers/delete-driver.service";
import { GetDriverByIdService } from "../../services/drivers/get-driver-by-id.service";
import { v4 as uuiv4 } from "uuid";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { RegisterCarUsageService } from "../../services/carUsage/register-car-usage.service";
import { RegisterCarService } from "../../services/cars/register-car.service";

describe("delete driver service", () => {
  it("should be able delete a driver", async () => {
    const newDriver = await RegisterDriverService.execute({
      name: "Samuel"
    });

    const deleted = await DeleteDriverService.execute({
      id: newDriver.id,
    });

    expect(deleted).toEqual({ message: "DRIVER_DELETED" });
    await expect(
      GetDriverByIdService.execute({
        id: uuiv4(),
      })
    ).rejects.toEqual(new AppError("DRIVER_NOT_FOUND", 404));
  });

  it("should not be able to delete a driver if not found", async () => {
    await expect(
      DeleteDriverService.execute({
        id: uuiv4(),
      })
    ).rejects.toEqual(new AppError("DRIVER_NOT_FOUND", 404));
  });

  it("should not be able to delete a Driver if is in use", async () => {
    const newDriver = await RegisterDriverService.execute({
      name: "Souza"
    });

    const newCar = await RegisterCarService.execute({
      license_plate: "ABC2I36",
      color: "Prata",
      brand: "Chevrolet",
    });

    await RegisterCarUsageService.execute({
      driver_id: newDriver.id,
      car_id: newCar.id,
      reason: 'Aluguel do carro para viagem'
    })

    await expect(
      DeleteDriverService.execute({
        id: newDriver.id,
      })
    ).rejects.toEqual(new AppError("DRIVER_IS_USING_A_CAR", 400));
  });
});
