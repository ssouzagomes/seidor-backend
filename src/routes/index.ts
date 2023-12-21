import { Router } from 'express'
import { carRoutes } from './car.routes'

const router = Router()

router.use('/car', carRoutes)

export { router }