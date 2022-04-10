import UserEntity from "../entities/UserEntity"

import UsersRepositoryPort from 'domain/ports/output/UsersRepositoryPort'
import User, { UserFilters, UserStatus } from "domain/models/User"

import NoSuchElementError from '../errors/NoSuchElementError'

export default class UsersRepositoryAdapter implements UsersRepositoryPort {
    
    async findAll(filters?: UserFilters): Promise<User[]> {
        return UserEntity.findAll({ where: { ...filters } })
            .then(users => users.map(User.map))
    }

    async create(input: User): Promise<User> {
        return UserEntity.create(UserEntity.map(input)).then(User.map)
    }

    async findById(id: number): Promise<User> {
        const user = await UserEntity.findByPk(id)
        if (!user)
            throw new NoSuchElementError('User not found')
        return User.map(user)
    }

    async updateById(id: number, status: UserStatus): Promise<boolean> {
        const [ affectedCount ] = await UserEntity.update({ 
            status: status.toString() 
        }, { 
            where: { id } 
        })
        if (!affectedCount)
            throw new NoSuchElementError('User not found')
        return true
    }

}