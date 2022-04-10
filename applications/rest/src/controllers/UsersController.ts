import { Request, Response } from "express"
import { UsersRepositoryAdapter } from "database"
import { UsersUseCasePort } from "domains/ports"
import { UsersUseCaseAdapter } from "domains/usecases"
import User, { UserFilters, UserStatus } from "domains/models/User"
import NoSuchElementError from "database/errors/NoSuchElementError"

const errorObject = { message: 'Oops, something went wrong' }

export default class UsersController {
    
    usersUseCasePort: UsersUseCasePort

    constructor() {
        this.usersUseCasePort = new UsersUseCaseAdapter(new UsersRepositoryAdapter())
    }

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const filters: UserFilters = req.query
            const users: User[] = await this.usersUseCasePort.findAll(filters);
            res.status(200).json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json(errorObject)
        }
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: User = req.body
            const user: User = await this.usersUseCasePort.create(input)
            res.status(201).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json(errorObject)
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id)
            const user = await this.usersUseCasePort.findById(id)
            res.status(200).json(user)
        } catch (error) {
            console.error(error)
            if (error instanceof NoSuchElementError) {
                res.status(404).json({ message: error.message })
                return
            }
            res.status(500).json(errorObject)
        }
    }

    updateUserById = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id)
            const status: UserStatus = req.body.status
            await this.usersUseCasePort.updateById(id, status)
            res.status(204).send()
        } catch (error) {
            console.error(error)
            if (error instanceof NoSuchElementError) {
                res.status(404).json({ message: error.message })
                return
            }
            res.status(500).json(errorObject)
        }
    }

}