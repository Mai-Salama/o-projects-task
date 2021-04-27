import * as Sequelize from 'sequelize'
import {sequelize} from '../sequelize'

export interface VenueAdminAddModel{
    email: string,
    password: string,
    role: string,
    name: string,
    mobile_number: string,
    venue_name: string,
    profile_picture: string,
    admin_header: string
}

export interface VenueAdminModel extends Sequelize.Model<VenueAdminModel,VenueAdminAddModel>{
    id: number,
    email: string,
    password: string,
    role: string,
    name: string,
    mobile_number: string,
    venue_name: string,
    profile_picture: string,
    createdAt: string,
    updatedAt: string
}

export interface VenueAdminViewModel{
    id: number,
    email: string,
    role: string,
    name: string,
    mobile_number: string,
    venue_name: string,
    profile_picture: string
}

export interface VenueAdminLoginModel{
    email: String,
    password: String
}

export const VenueAdmin = sequelize.define('venue_admins',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING,
    name: Sequelize.STRING,
    mobile_number: Sequelize.STRING,
    venue_name: Sequelize.STRING,
    profile_picture: Sequelize.STRING
})