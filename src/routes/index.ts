import { Router } from 'express'
import { carRoutes } from './car.routes'
import { driverRoutes } from './driver.routes'

const router = Router()

router.use('/cars', carRoutes)
router.use('/drivers', driverRoutes)

export { router }