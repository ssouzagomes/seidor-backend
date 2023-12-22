import { RegisterDriverService } from "../../services/drivers/register-driver.service";
import { GetAllDriversService } from "../../services/drivers/get-all-drivers.service";

describe("get all drivers service", () => {
  it("should be able to get all drivers", async () => {
    await RegisterDriverService.execute({
      name: "Maria Silva"
    });

    const result = await GetAllDriversService.execute({
      name: undefined
    });

    expect(result).toHaveLength(1);
    expect(result).not.toEqual([]);
  });

  it("should be able to get all drivers with filters", async () => {
    await RegisterDriverService.execute({
      name: "Samuel"
    });
    await RegisterDriverService.execute({
      name: "Samuel Gomes"
    });

    const result = await GetAllDriversService.execute({
      name: "samuel"
    });

    expect(result).toHaveLength(2);
    expect(result).not.toEqual([]);
  });

  it("should not be able to get all drivers with no match filters", async () => {
    await RegisterDriverService.execute({
      name: "Samuel Silva"
    });
    await RegisterDriverService.execute({
      name: "Samuel Souza"
    });

    const result = await GetAllDriversService.execute({
      name: 'José Silva'
    });

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
