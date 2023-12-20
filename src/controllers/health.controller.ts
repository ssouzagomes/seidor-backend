import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import AppError from '../exceptions/generic.exception'

export namespace HealthController {
  export const health = async (req: Request, res: Response) => {
    try {
      const result = {
        status: 'Ok',
        date: new Date()
      }

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}