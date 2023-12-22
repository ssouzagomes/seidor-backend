import { Router } from 'express'
import { carRoutes } from './car.routes'
import { driverRoutes } from './driver.routes'
import { carUsageRoutes } from './car-usage.routes'

const router = Router()

router.use('/cars', carRoutes)
router.use('/drivers', driverRoutes)
router.use('/carUsage', carUsageRoutes)

export { router }