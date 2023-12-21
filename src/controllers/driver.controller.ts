import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import AppError from '../exceptions/generic.exception'
import { DriverTypes } from '../types/driver.types'
import { RegisterDriverService } from '../services/drivers/register-driver.service'
import { UpdateDriverService } from '../services/drivers/update-driver.service'
import { DeleteDriverService } from '../services/drivers/delete-driver.service'
import { GetDriverByIdService } from '../services/drivers/get-driver-by-id.service'
import { GetAllDriversService } from '../services/drivers/get-all-drivers.service'

export namespace DriverController {
  export const register = async (req: Request<DriverTypes.RegisterParams>, res: Response) => {
    try {
      const result = await RegisterDriverService.execute({ ...req.body })

      return res.status(201).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const update = async (req: Request<DriverTypes.UpdateParams>, res: Response) => {
    try {
      const result = await UpdateDriverService.execute({ ...req.body, id: req.params.id })

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const destroy = async (req: Request<DriverTypes.DeleteParams>, res: Response) => {
    try {
      const result = await DeleteDriverService.execute(req.params)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const getDriverById = async (req: Request<DriverTypes.GetByIdParams>, res: Response) => {
    try {
      const result = await GetDriverByIdService.execute(req.params)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const getAllDrivers = async (req: Request<DriverTypes.Filters>, res: Response) => {
    try {
      const query: DriverTypes.Filters =
				!req.query ? ({} as DriverTypes.Filters) : (req.query as DriverTypes.Filters)

      const result = await GetAllDriversService.execute(query)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}