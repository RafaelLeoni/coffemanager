export default class User {
    id?: number
    name!: string
    status?: UserStatus

    static map({ id, name, status }: any): User {
        const user = new User()
        user.id = id
        user.name = name
        user.status = status
        return user
    }
}

export interface UserFilters {
    name?: string
    status?: UserStatus[]
}

export enum UserStatus {
    ATIVO, INATIVO
}