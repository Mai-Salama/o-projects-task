import * as Sequelize from 'sequelize'
import {sequelize} from '../sequelize'

export interface TravelAgencyAdminAddModel{
    email: string,
    password: string,
    role: string,
    name: string,
    travel_agency_name: string,
    mobile_number: string,
    license: string,
    provisions: string,
    about: string,
    rating: number,
    address: string,
    location: number,
    mobile_number1: string,
    mobile_number2: string,
    email1: string,
    email2: string,
    website: string,
    whatsapp: string,
    facebook: string,
    instagram: string,
    logo: string,
    profile_picture: string,
    payment_method: string
}

export interface TravelAgencyAdminModel extends Sequelize.Model<TravelAgencyAdminModel,TravelAgencyAdminAddModel>{
    id: number,
    email: string,
    password: string,
    role: string,
    name: string,
    travel_agency_name: string,
    mobile_number: string,
    license: string,
    provisions: string,
    about: string,
    rating: number,
    address: string,
    location: number,
    mobile_number1: string,
    mobile_number2: string,
    email1: string,
    email2: string,
    website: string,
    whatsapp: string,
    facebook: string,
    instagram: string,
    logo: string,
    profile_picture: string,
    payment_method: string
}

export interface TravelAgencyAdminViewModel{
    id: number,
    email: string,
    role: string,
    name: string,
    travel_agency_name: string,
    mobile_number: string,
    license: string,
    provisions: string,
    about: string,
    rating: number,
    address: string,
    location: number,
    mobile_number1: string,
    mobile_number2: string,
    email1: string,
    email2: string,
    website: string,
    whatsapp: string,
    facebook: string,
    instagram: string,
    logo: string,
    profile_picture: string,
    payment_method: string
}

export interface TravelAgencyAdminLoginModel{
    email: String,
    password: String
}

export const TravelAgencyAdmin = sequelize.define('travel_agency_admins',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING,
    name: Sequelize.STRING,
    travel_agency_name: Sequelize.STRING,
    mobile_number: Sequelize.STRING,
    license: Sequelize.STRING,
    provisions: Sequelize.STRING,
    about: Sequelize.STRING,
    rating: Sequelize.NUMBER,
    address: Sequelize.STRING,
    location: Sequelize.NUMBER,
    mobile_number1: Sequelize.STRING,
    mobile_number2: Sequelize.STRING,
    email1: Sequelize.STRING,
    email2: Sequelize.STRING,
    website: Sequelize.STRING,
    whatsapp: Sequelize.STRING,
    facebook: Sequelize.STRING,
    instagram: Sequelize.STRING,
    logo: Sequelize.STRING,
    profile_picture: Sequelize.STRING,
    payment_method: Sequelize.STRING
})