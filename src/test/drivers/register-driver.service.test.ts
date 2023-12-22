import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import AppError from "../../exceptions/generic.exception";

describe("register driver service", () => {
  it("should be able to register a driver", async () => {
    const driver = {
      name: "Samuel Souza"
    };

    const result = await RegisterDriverService.execute(driver);

    expect(result).toHaveProperty("id");
    expect(result).not.toBeUndefined();
    expect(result && typeof result === "object").toBe(true);
  });

  it("should not be able to register a driver if name already exist", async () => {
    const driver = {
      name: "Samuel Gomes"
    };

    await RegisterDriverService.execute(driver);

    await expect(RegisterDriverService.execute(driver)).rejects.toEqual(
      new AppError("DRIVER_ALREADY_EXIST", 400)
    );
  });
});
