import { Router } from 'express'
import { validationResult } from 'express-validator'
import { TravelAgencyAdminService } from '../services/travelagencyadmin.service'
import { TravelAgencyAdminAddModel, TravelAgencyAdmin } from '../models/travelAgencyAdmin'



export const TravelAgencyAdminRouter = Router()
const userService = new TravelAgencyAdminService()

TravelAgencyAdminRouter.post('/register', (req, res) => {
    const errors = validationResult(req)
    console.log("accessed router")
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    const email = req.body.email
    const password = req.body.password
    const role = "TravelAgencyAdmin"
    const name = req.body.name
    const travel_agency_name = req.body.agency_name
    const mobile_number = req.body.mobile_number
    const license = req.body.license
    const provisions = req.body.provisions
    const about = req.body.about
    const rating = req.body.rating
    const address = req.body.address
    const location = req.body.location
    const mobile_number1 = req.body.mobile_number1
    const mobile_number2 = req.body.mobile_number2
    const email1 = req.body.email1
    const email2 = req.body.email2
    const website = req.body.website
    const whatsapp = req.body.whatsapp
    const facebook = req.body.facebook
    const instagram = req.body.instagram
    const logo = req.body.logo
    const profile_picture = req.body.profile_picture
    const payment_method = req.body.payment_method
    const admin_header = req.header('token')
    //const payload = matchedData({email, password, role}) as AdminAddModel
    const user = userService.register({email,password,role, name, travel_agency_name,mobile_number,license,provisions,about,
        rating,address,location,mobile_number1,mobile_number2,email1,email2,website,whatsapp,facebook,
        instagram,logo,profile_picture,payment_method, admin_header})
    console.log(user)
    return ("successful")
})

TravelAgencyAdminRouter.post('/login', (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    
    const email = req.body.email
    const password = req.body.password
    const role = ""
    console.log(email)
    //const payload = matchedData({email}) as AdminAddModel
    const token = userService.login({email, password})

    return token.then(t => res.json(t))
})