import { Request, Response } from 'express'
import { PresenterFactory } from '../factory/presenter.factory'
import AppError from '../exceptions/generic.exception'
import { UserTypes } from '../types/user.types'
import { RegisterUserService } from '../services/users/register-user.service'
// import { UpdateUserService } from '../services/users/update-user.service'
// import { DeleteUserService } from '../services/users/delete-user.service'
// import { GetUserByIdService } from '../services/users/get-user-by-id.service'
// import { GetAllUsersService } from '../services/users/get-all-users.service'

export namespace UserController {
  export const register = async (req: Request<UserTypes.RegisterParams>, res: Response) => {
    try {
      const result = await RegisterUserService.execute({ ...req.body })

      return res.status(201).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

  // export const update = async (req: Request<UserTypes.UpdateParams>, res: Response) => {
  //   try {
  //     const result = await UpdateUserService.execute({ ...req.body, id: req.params.id })

  //     return res.status(200).send(new PresenterFactory(result, true))
  //   } catch (error) {
	// 		return AppError.handleException(error, res)
  //   }
  // }

  // export const destroy = async (req: Request<UserTypes.DeleteParams>, res: Response) => {
  //   try {
  //     const result = await DeleteUserService.execute(req.params)

  //     return res.status(200).send(new PresenterFactory(result, true))
  //   } catch (error) {
	// 		return AppError.handleException(error, res)
  //   }
  // }

  // export const getUserById = async (req: Request<UserTypes.GetByIdParams>, res: Response) => {
  //   try {
  //     const result = await GetUserByIdService.execute(req.params)

  //     return res.status(200).send(new PresenterFactory(result, true))
  //   } catch (error) {
	// 		return AppError.handleException(error, res)
  //   }
  // }

  // export const getAllUsers = async (req: Request<UserTypes.Filters>, res: Response) => {
  //   try {
  //     const query: UserTypes.Filters =
	// 			!req.query ? ({} as UserTypes.Filters) : (req.query as UserTypes.Filters)

  //     const result = await GetAllUsersService.execute(query)

  //     return res.status(200).send(new PresenterFactory(result, true))
  //   } catch (error) {
	// 		return AppError.handleException(error, res)
  //   }
  // }
}