import { Router } from 'express'
import { DriverController } from '../controllers/driver.controller'

const driverRoutes = Router()

driverRoutes.post('/register', DriverController.register)
// driverRoutes.put('/:id', DriverController.update)
// driverRoutes.delete('/:id', DriverController.destroy)
driverRoutes.get('/:id', DriverController.getDriverById)
// driverRoutes.get('/', DriverController.getAlldrivers)

export { driverRoutes }