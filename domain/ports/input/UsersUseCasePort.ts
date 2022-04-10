import User, { UserFilters, UserStatus } from "../../models/User"

export default interface UsersUseCasePort {

    findAll(filters?: UserFilters): Promise<User[]>

    create(input: User): Promise<User>

    findById(id: number): Promise<User>

    updateById(id: number, status: UserStatus): Promise<boolean>

}