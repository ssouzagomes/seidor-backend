import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import { RegisterUserService } from '../services/car/register-car.service'
import AppError from '../exceptions/generic.exception'

export namespace CarController {
  export const register = async (req: Request, res: Response) => {
    try {
      const result = await RegisterUserService.execute({ ...req.body })

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}