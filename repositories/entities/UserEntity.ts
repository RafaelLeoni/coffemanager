import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../infra/connection'

interface UserEntityAttributes {
    id: number
    name: string
    status?: string
    createdAt?: Date
    updatedAt?: Date
}

interface UserEntityInput extends Optional<UserEntityAttributes, 'id'> { }

export default class UserEntity extends Model<UserEntityAttributes, UserEntityInput> implements UserEntityAttributes {
    public id!: number
    public name!: string
    public status!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static map({ name }: any): UserEntity {
        const entity: UserEntity = new UserEntity()
        entity.name = name
        return entity
    }
}

UserEntity.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('ATIVO', 'INATIVO'),
        defaultValue: 'ATIVO',
        values: ['ATIVO', 'INATIVO'],
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'user',
    sequelize
})

UserEntity.sync({ alter: true })
