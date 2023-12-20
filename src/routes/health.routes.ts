import { Router } from 'express'
import { HealthController } from '../controllers/health.controller'

const healthRoutes = Router()

healthRoutes.get('/', HealthController.health)

export { healthRoutes }