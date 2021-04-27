import { Router } from 'express'
import { validationResult } from 'express-validator'
import { VenueAdminService } from '../services/venueadmin.service'
import { VenueAdminAddModel, VenueAdmin } from '../models/venueAdmins'
import { AdminService } from '../services/admin.service'



export const venueAdminRouter = Router()
const userService = new VenueAdminService()
const adminService = new AdminService()

venueAdminRouter.post('/register', (req, res) => {
    adminService.verifyToken(req.header('token'))
    const errors = validationResult(req)
    console.log("accessed router")
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    const email = req.body.email
    const password = req.body.password
    const role = "VenueAdmin"
    const name = req.body.name
    const mobile_number = req.body.mobile_number
    const venue_name = req.body.venue_name
    const profile_picture = req.body.profile_picture
    const admin_header = req.header('token')
    //const payload = matchedData({email, password, role}) as AdminAddModel
    const user = userService.register({email,password,role, name, mobile_number, venue_name, profile_picture, admin_header})
    return ("successful")
})

venueAdminRouter.post('/login', (req, res) => {
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