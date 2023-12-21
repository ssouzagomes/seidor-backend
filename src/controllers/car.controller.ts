import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import { RegisterUserService } from '../services/cars/register-car.service'
import AppError from '../exceptions/generic.exception'
import { GetCarByIdService } from '../services/cars/get-car-by-id.service'
import { CarTypes } from '../types/car.types'
import { GetAllCarsService } from '../services/cars/get-all-cars.service'
import { UpdateUserService } from '../services/cars/update-car.service'
import { DeleteCarService } from '../services/cars/delete-car.service'

export namespace CarController {
  export const register = async (req: Request<CarTypes.RegisterParams>, res: Response) => {
    try {
      const result = await RegisterUserService.execute({ ...req.body })

      return res.status(201).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const update = async (req: Request<CarTypes.UpdateParams>, res: Response) => {
    try {
      const result = await UpdateUserService.execute({ ...req.body, id: req.params.id })

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const destroy = async (req: Request<CarTypes.DeleteParams>, res: Response) => {
    try {
      const result = await DeleteCarService.execute(req.params)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const getCarById = async (req: Request<CarTypes.GetByIdParams>, res: Response) => {
    try {
      const result = await GetCarByIdService.execute(req.params)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  export const getAllCars = async (req: Request<CarTypes.Filters>, res: Response) => {
    try {
      const query: CarTypes.Filters =
				!req.query ? ({} as CarTypes.Filters) : (req.query as CarTypes.Filters)

      const result = await GetAllCarsService.execute(query)

      return res.status(200).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}