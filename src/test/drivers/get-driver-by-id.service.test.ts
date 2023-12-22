import AppError from "../../exceptions/generic.exception";
import { GetDriverByIdService } from "../../services/drivers/get-driver-by-id.service";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { v4 as uuiv4 } from 'uuid'

describe("get driver by id service", () => {
  it("should be able to get a driver by id", async () => {
    const newDriver = await RegisterDriverService.execute({
      name: "Samuel Souza"
    });
    
    const result = await GetDriverByIdService.execute({
      id: newDriver.id,
    })

    expect(result).toHaveProperty("id");
    expect(result.name).toEqual(newDriver.name)
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to get a driver if not found", async () => {
    await expect(GetDriverByIdService.execute({
      id: uuiv4(),
    })).rejects.toEqual(
      new AppError("DRIVER_NOT_FOUND", 404)
    );
  });
});
