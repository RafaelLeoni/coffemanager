import User, { UserFilters, UserStatus } from "../models/User"
import UsersUseCasePort from "../ports/input/UsersUseCasePort"
import UsersRepositoryPort from "../ports/output/UsersRepositoryPort"

export default class UsersUseCaseAdapter implements UsersUseCasePort {
    
    userRepositoryPort: UsersRepositoryPort

    constructor(userRepositoryPort: UsersRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort
    }
    
    findAll = (filters?: UserFilters): Promise<User[]> => {
        //Regra de negócio
        return this.userRepositoryPort.findAll(filters)
    }
    
    create = (input: User): Promise<User> => {
        //Regra de negócio
        return this.userRepositoryPort.create(input)
    }
    
    findById =  (id: number): Promise<User> => {
        //Regra de negócio
        return this.userRepositoryPort.findById(id)
    }

    updateById = (id: number, status: UserStatus): Promise<boolean> => {
        //Regra de negócio
        return this.userRepositoryPort.updateById(id, status)
    }

}