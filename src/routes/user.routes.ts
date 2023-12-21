import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const userRoutes = Router()

userRoutes.post('/register', UserController.register)
// userRoutes.put('/:id', UserController.update)
// userRoutes.delete('/:id', UserController.destroy)
// userRoutes.get('/:id', UserController.getCarById)
// userRoutes.get('/', UserController.getAllCars)

export { userRoutes }