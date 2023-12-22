import AppError from "../../exceptions/generic.exception";
import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { UpdateDriverService } from "../../services/drivers/update-driver.service";
import { v4 as uuiv4 } from 'uuid'

describe("update driver service", () => {
  it("should be able to update a driver", async () => {
    const driver = {
      name: "Samuel Souza"
    };

    const newDriver = await RegisterDriverService.execute(driver);
    
    const result = await UpdateDriverService.execute({
      id: newDriver.id,
      name: "Samuel Gomes"
    })

    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(newDriver.id)
    expect(result.name).not.toEqual(newDriver.name)
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to update a driver if driver not found", async () => {
    await expect(UpdateDriverService.execute({
      id: uuiv4(),
      name: "Samuel Gomes"
    })).rejects.toEqual(
      new AppError("DRIVER_NOT_FOUND", 404)
    );
  });
});
