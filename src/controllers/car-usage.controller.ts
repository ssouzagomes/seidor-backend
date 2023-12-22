import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import AppError from '../exceptions/generic.exception'
import { CarUsageTypes } from '../types/car-usage.types'
import { RegisterCarUsageService } from '../services/carUsage/register-car-usage.service'
import { EndCarUsageService } from '../services/carUsage/end-car-usage.service'
import { GetAllCarUsageService } from '../services/carUsage/get-all-car-usage.service'

export namespace CarUsageController {
  export const register = async (req: Request<CarUsageTypes.RegisterParams>, res: Response) => {
    try {
      const result = await RegisterCarUsageService.execute({ ...req.body })

      return res.status(201).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const done = async (req: Request<CarUsageTypes.EndParams>, res: Response) => {
    try {
      const result = await EndCarUsageService.execute(req.params)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const getAll = async (req: Request, res: Response) => {
    try {
      const result = await GetAllCarUsageService.execute()

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}