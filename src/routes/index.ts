import { Router } from 'express'
import { carRoutes } from './car.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/cars', carRoutes)
router.use('/users', userRoutes)

export { router }