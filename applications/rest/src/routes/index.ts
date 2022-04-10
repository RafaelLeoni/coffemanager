import { Router } from 'express'
import usersRouter from './UsersRoutes'

const routes = Router()

routes.use('/users', usersRouter)

export default routes