import { Router } from 'express'
import { CarController } from '../controllers/car.controller'

const carRoutes = Router()

carRoutes.post('/register', CarController.register)
carRoutes.put('/:id', CarController.update)
carRoutes.delete('/:id', CarController.destroy)
carRoutes.get('/:id', CarController.getCarById)
carRoutes.get('/', CarController.getAllCars)

export { carRoutes }