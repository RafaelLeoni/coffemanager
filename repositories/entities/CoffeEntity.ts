import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../infra/connection'

interface CoffeeEntityAttributes {
    id: number
    name: string
    createdAt?: Date
    updatedAt?: Date
}

interface CoffeeEntityInput extends Optional<CoffeeEntityAttributes, 'id'> { }

export default class CoffeeEntity extends Model<CoffeeEntityAttributes, CoffeeEntityInput> implements CoffeeEntityAttributes {
    public id!: number
    public name!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

CoffeeEntity.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'coffee',
    sequelize
})

CoffeeEntity.sync({ alter: true })