import * as Sequelize from 'sequelize'
import {sequelize} from '../sequelize'

export interface AdminAddModel{
    email: string,
    password: string,
    role: string
}

export interface AdminModel extends Sequelize.Model<AdminModel,AdminAddModel>{
    id: number,
    email: string,
    password: string,
    role: string,
    createdAt: string,
    updatedAt: string
}

export interface AdminViewModel{
    id: number,
    email: string,
    role: string
}

export const Admin = sequelize.define('admin',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING
})