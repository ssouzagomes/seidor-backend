import { Router } from 'express'
import { CarUsageController } from '../controllers/car-usage.controller'

const carUsageRoutes = Router()

carUsageRoutes.post('/register', CarUsageController.register)

export { carUsageRoutes }