import { Router } from 'express'
import { carRoutes } from './car.routes'
import { driverRoutes } from './user.routes'

const router = Router()

router.use('/cars', carRoutes)
router.use('/drivers', driverRoutes)

export { router }