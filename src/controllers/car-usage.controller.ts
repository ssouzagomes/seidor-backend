import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import AppError from '../exceptions/generic.exception'
import { CarUsageTypes } from '../types/car-usage.types'
import { RegisterCarUsageService } from '../services/carUsage/register-car-usage.service'

export namespace CarUsageController {
  export const register = async (req: Request<CarUsageTypes.RegisterParams>, res: Response) => {
    try {
      const result = await RegisterCarUsageService.execute({ ...req.body })

      return res.status(201).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}