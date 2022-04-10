import { Router } from 'express'
import UsersController from '../controllers/UsersController'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getAllUsers)

usersRouter.post('/', usersController.createUser)

usersRouter.get('/:id', usersController.getUserById)

usersRouter.patch('/:id', usersController.updateUserById)

export default usersRouter